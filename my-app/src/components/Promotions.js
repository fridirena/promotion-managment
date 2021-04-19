import React, { useState, useRef, useCallback } from 'react';
import { Promotion } from "./Promotion";
import { PromotionHeader } from "./PromotionHeader";
import {EditPromotionModal} from "./EditPromotionModal";
import {editPromotion} from "./../services/PromotionService";
import Container from 'react-bootstrap/Container';
import {NUM_OF_RENDERING_PAGES} from '../util/util';

export const Promotions = ({   promotions,
                               promotionsMetaData,
                               deletePromotionFromState,
                               editPromotionInState,
                               fetchMorePromotions,
                               pageData,
                               updateLowestCurrentPage}) => {

    // we want to use isFetching and pageData in handle scroll event, but state are not accessible there and ref is.
    const pageDataRef = useRef();
    pageDataRef.current = pageData;
    const [isFetching, _setIsFetching] = useState(false);
    const isFetchingRef = useRef(isFetching);
    const setIsFetching = (isFetching) => {
        isFetchingRef.current = isFetching;
        _setIsFetching(isFetching);
    };

    const [showEditModal, setShowEditModal] = useState(false);
    const [editedPromotion, setEditedPromotion] = useState({});
    const [promotionsListRef] = useScrollCallback();

    const onEditPromotion = (promotion) => {
        setShowEditModal(true);
        setEditedPromotion(promotion);
    };

    const onCancelEditModel = () => {
        setShowEditModal(false);
        setEditedPromotion({});
    };

    const handleScroll = (event) => {
        if(isFetchingRef.current){
           return;
        }

        const scrollElement = event.target;
        const THRESHOLD = 800;

        if (pageDataRef.current.hasNextPage && scrollElement.scrollTop + THRESHOLD >= scrollElement.scrollHeight - scrollElement.clientHeight) {
            doFetch(true);
        } else if (pageDataRef.current.lowestCurrentPage > 1 && scrollElement.scrollTop - THRESHOLD <= 0){
            doFetch(false);
        }
    };

    const doFetch = async (isBottom) => {
        setIsFetching(true);
        await fetchMorePromotions(pageDataRef.current.lowestCurrentPage + (isBottom ? NUM_OF_RENDERING_PAGES : -1), isBottom);
        updateLowestCurrentPage(isBottom);
        setIsFetching(false);
    };

    const onSaveEditModel = async (promotionData) => {
        setShowEditModal(false);
        const {promotion} = await editPromotion(promotionData);
        await editPromotionInState(promotion);
    };

    function useScrollCallback() {
        const promotionsListRef = useRef(null);
        const setRef = useCallback(node => {
            if (promotionsListRef.current) {
                // Make sure to cleanup any events/references added to the last instance
                promotionsListRef.current.removeEventListener('scroll', handleScroll);
            }

            if (node) {
                // Check if a node is actually passed. Otherwise node would be null.
                node.addEventListener('scroll', handleScroll);
            }

            // Save a reference to the node
            promotionsListRef.current = node
        }, []);

        return [setRef]
    }

    if (promotions.length === 0) return null;
    const promotionsElements = promotions.map((promotion) =>
        <Promotion
            key={promotion._id}
            promotion={promotion}
            promotionsMetaData={promotionsMetaData}
            deletePromotionFromState={deletePromotionFromState}
            onEditPromotion={onEditPromotion}
        />
    );

    return(
        <Container style={{height: '100%'}}>
            <PromotionHeader promotionHeader={promotions[0]}/>
            <div className="promotionsList" ref={promotionsListRef}>
                {promotionsElements}
            </div>
            <EditPromotionModal
                show={showEditModal}
                onCancel={onCancelEditModel}
                onSave={onSaveEditModel}
                promotion={editedPromotion}
                promotionsMetaData={promotionsMetaData}
            />
        </Container>
    )
};