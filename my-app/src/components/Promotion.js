import React from 'react'
import {Delete, Edit} from "./Icon";
import {deletePromotion} from "./../services/PromotionService"
import {getShowableKeys, getValueByType} from "../util/util"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const Promotion = ({promotion, promotionsMetaData, deletePromotionFromState, onEditPromotion}) => {

    const onDeletePromotion = async (id) => {
        await deletePromotion(id);
        await deletePromotionFromState(id);
    };

    return(
        <Row className="align-items-center">
            <Col>
                <input type="checkbox"/>
            </Col>
            {
                getShowableKeys(promotion)
                    .map((key) =>
                        <Col key={key}>
                            {
                                getValueByType(promotion[key], promotionsMetaData[key])
                            }
                        </Col>
                    )
            }
            <Col>
                <div className="d-flex">
                    <Edit onClick={onEditPromotion.bind(this, promotion)}/>
                    <Delete onClick={onDeletePromotion.bind(this, promotion._id)}/>
                </div>
            </Col>
        </Row>

    )
};