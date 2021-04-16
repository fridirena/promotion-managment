import React from 'react'
import {prettifyHeader, getShowableKeys} from "../util/util"

export const PromotionHeader = ({promotionHeader}) => {

    return [
        <th key="checkbox" className="col-1"/>,
        getShowableKeys(promotionHeader)
            .map((key) => <th key={key} className="col-2"><span>{prettifyHeader(key)}</span></th>),
        <th key="actions" className="col-1"/>
    ]

};