import {PAGE_SIZE, FIRST_PAGE} from "../util/util";

export async function getPromotions(page = FIRST_PAGE, pageSize = PAGE_SIZE) {
    const response = await fetch(`/promotions?page=${page}&limit=${pageSize}`);
    return await response.json();
}

export async function getPagesOfPromotions(page = FIRST_PAGE, pageSize = PAGE_SIZE, numOfPages = 1) {
    const response = await fetch(`/promotions/pages?page=${page}&limit=${pageSize}&numOfPages=${numOfPages}`);
    return await response.json();
}

export async function createPromotions() {
    const response = await fetch(`/promotions/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      });
    return await response.json();
}

export async function editPromotion(promotion) {
    const response = await fetch(`/promotions`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({promotion})
    });
    return await response.json();
}

export async function deletePromotion(promotionId) {
    const response = await fetch(`/promotions/${promotionId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    });
    return await response.json();
}

export async function getPromotionsMetaData() {
    const response = await fetch("/promotions/metaData");
    return await response.json();
}