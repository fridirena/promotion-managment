import React from 'react'
import {prettifyHeader, getShowableKeys} from "../util/util"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const PromotionHeader = ({promotionHeader}) => {

    return (
        <Row className="promotionsHeader">
            <Col>

            </Col>
            {
                getShowableKeys(promotionHeader)
                    .map((key) => <Col key={key}>{prettifyHeader(key)}</Col>)
            }
            <Col>

            </Col>
        </Row>
    );

};