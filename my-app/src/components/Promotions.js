import React, { useState } from 'react';
import { Promotion } from "./Promotion";
import { PromotionHeader } from "./PromotionHeader";
import {EditPromotionModal} from "./EditPromotionModal";
import {editPromotion} from "./../services/PromotionService";

export const Promotions = ({promotions, promotionsMetaData, deletePromotionFromState, editPromotionInState}) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedPromotion, setEditedPromotion] = useState({});

    const onEditPromotion = (promotion) => {
        setShowEditModal(true);
        setEditedPromotion(promotion);
    };

    const onCancelEditModel = () => {
        setShowEditModal(false);
        setEditedPromotion({});
    };

    const onSaveEditModel = async (promotionData) => {
        setShowEditModal(false);
        const {promotion} = await editPromotion(promotionData);
        await editPromotionInState(promotion);
    };

    if (promotions.length === 0) return null;
    const promotionTable = promotions.map((promotion) =>
        <Promotion
            key={promotion._id}
            promotion={promotion}
            promotionsMetaData={promotionsMetaData}
            deletePromotionFromState={deletePromotionFromState}
            onEditPromotion={onEditPromotion}
        />
    );

    return(
        <div className="container">
                <h2>Promotions</h2>
                        <table className="table table-fixed">
                            <thead>
                            <tr>
                                <PromotionHeader promotionHeader={promotions[0]}/>
                            </tr>
                            </thead>
                            <tbody>
                                {promotionTable}
                            </tbody>
                        </table>
                <EditPromotionModal
                    show={showEditModal}
                    onCancel={onCancelEditModel}
                    onSave={onSaveEditModel}
                    promotion={editedPromotion}
                    promotionsMetaData={promotionsMetaData}
                />
        </div>
    )
};