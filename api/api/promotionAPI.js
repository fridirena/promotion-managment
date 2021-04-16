const express = require('express');
const router = express.Router();

const promotionService = require('./../service/promotionService');

router.get('/', async (req, res) => {
    console.log('api/promotions called!');
    const page = req.query.page;
    const limit = req.query.limit;
    const promotions = await promotionService.getPromotions(page, limit);
    res.json(promotions);
});

router.post('/create', async (req, res) => {
    console.log('api/create called!');
    await promotionService.createNewPromotions();
    res.json("success");
});

router.delete('/:id', async (req, res) => {
    console.log('promotion delete called!');
    await promotionService.deletePromotion(req.params.id);
    res.json("success");
});

router.put('/', async (req, res) => {
    console.log('promotion update called!');
    const promotion = await promotionService.updatePromotion(req.body.promotion);
    res.json({promotion});
});

router.get('/metaData', async (req, res) => {
    console.log('promotion metaData called!');
    const metaData = promotionService.getPromotionMetaData();
    res.json({metaData});
});

module.exports = router;