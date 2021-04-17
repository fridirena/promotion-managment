import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {prettifyHeader, getShowableKeys} from "../util/util";

export const EditPromotionModal = ({show, onCancel, onSave, promotion, promotionsMetaData}) => {
    const [editedPromotion, setEditedPromotion] = useState({});

    useEffect(() => {
        //only when promotion props is changed, set state for current promotion
        setEditedPromotion(Object.assign({}, promotion));
    }, [promotion]);

    const handleChangeControl = (key, event) => {
        updateEditedPromotion(key, event.target.value);
    };

    const handleDateControlChanged = (key, date) => {
        updateEditedPromotion(key, date.toDateString());
    };

    const updateEditedPromotion = (key, value) => {
        setEditedPromotion((editedPromotion) => {
            return Object.assign({}, editedPromotion, {[key]: value});
        })
    };

    const getControl = (key) => {
        const metaData = promotionsMetaData[key];
        const value = editedPromotion[key];

        if (metaData.type === "Date") {
            return <div>
                <DatePicker selected={new Date(value)} onChange={handleDateControlChanged.bind(this, key)} />
            </div>
        } else if (metaData.enum) {
            return (
                <Form.Control as="select" value={value} onChange={handleChangeControl.bind(this, key)}>
                    {
                        metaData.enum.map((item) => <option key={item}>{item}</option>)
                    }
                </Form.Control>
            )
        } else {
            return <Form.Control type="text" value={value} onChange={handleChangeControl.bind(this, key)}/>
        }
    };

    return(
        <Modal show={show} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Edit promotion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                {
                    getShowableKeys(editedPromotion)
                        .map((key) =>
                            <Form.Group controlId="formBasicEmail" key={key}>
                                <Form.Label>{prettifyHeader(key)}</Form.Label>
                                {getControl(key)}
                            </Form.Group>
                        )
                }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Close
                </Button>
                <Button variant="primary" onClick={onSave.bind(this, editedPromotion)} className="custom-btn">
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
};
