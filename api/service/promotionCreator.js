const {types} = require("./../util/promotionConstants");
const global = require("./../util/global");

module.exports = {

    getPromotions: function () {
        const promotions = [];
        for (let i = 1; i < global.PROMOTION_NUM+1; i++) {
            promotions.push({
                name: "prom name" + i,
                type: types[Math.floor(Math.random() * types.length)],
                startDate: '2021-01-01',
                endDate: '2021-04-01',
                userGroupName: "customer"
            });
        }
        return promotions;
    }
};