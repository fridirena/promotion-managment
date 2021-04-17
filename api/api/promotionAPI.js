const express = require('express');
const router = express.Router();

const promotionService = require('./../service/promotionService');

router.get('/', async (req, res, next) => {
    const page = req.query.page;
    const limit = req.query.limit;
    const promotions = await promotionService.getPromotions(page, limit).catch(e => next(e));
    res.json(promotions);
});

router.post('/create', async (req, res, next) => {
    await promotionService.createNewPromotions().catch(e => next(e));
    res.json({status: "success"});
});

router.delete('/:id', async (req, res, next) => {
    await promotionService.deletePromotion(req.params.id).catch(e => next(e));
    res.json({status: "success"});
});

router.put('/', async (req, res, next) => {
    const promotion = await promotionService.updatePromotion(req.body.promotion).catch(e => next(e));
    res.json({promotion});
});

router.get('/metaData', async (req, res) => {
    const metaData = promotionService.getPromotionMetaData();
    res.json({metaData});
});

module.exports = router;