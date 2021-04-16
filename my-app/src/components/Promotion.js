import React from 'react'
import {Delete, Edit} from "./Icon";
import {deletePromotion} from "./../services/PromotionService"
import {getShowableKeys, getValueByType} from "../util/util"

export const Promotion = ({promotion, promotionsMetaData, deletePromotionFromState, onEditPromotion}) => {

    const onDeletePromotion = async (id) => {
        await deletePromotion(id);
        await deletePromotionFromState(id); // check if change
    };

    return(
          <tr>
              <td className="col-1">
                  <input className="form-check-input position-static" type="checkbox" id="blankCheckbox"/>
              </td>
              {
                  getShowableKeys(promotion)
                      .map((key) =>
                          <td key={key} className="col-2">
                              {
                                  getValueByType(promotion[key], promotionsMetaData[key])
                              }
                          </td>
                      )
              }
              <td className="col-1">
                  <div className="d-flex">
                      <Edit onClick={onEditPromotion.bind(this, promotion)}/>
                      <Delete onClick={onDeletePromotion.bind(this, promotion._id)}/>
                  </div>
              </td>
          </tr>
    )
};