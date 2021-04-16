
export async function getAllPromotions() {
    try{
        const page =1;
        const limit = 10;
        const response = await fetch(`/promotions?page=${page}&limit=${limit}`);
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