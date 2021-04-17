import {PAGE_SIZE} from "../util/util";

export async function getAllPromotions(page = 1, pageSize = PAGE_SIZE) {
    try{
        const response = await fetch(`/promotions?page=${page}&limit=${pageSize}`);
        return await response.json();
    }catch(error) {
        return [];
    }

}

export async function createPromotions() {
    const response = await fetch(`/promotions/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
        //body: JSON.stringify({user: data})
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