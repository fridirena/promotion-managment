const promotions = require('./../dao/promotion');
const promotionCreator = require("./promotionCreator");
const global = require("./../util/global");
const {promotionStructure} = require("./../util/promotionConstants");

module.exports = {

    createNewPromotions: async function () {
        await promotions.deleteMany();
        await promotions.insertMany(promotionCreator.getPromotions());
    },

    getPromotions: async function (page=global.DEFAULT_PAGE_NUM, limit=global.DEFAULT_PAGE_SIZE) {
        const options = {
            page: page,
            limit: limit,
            customLabels: {docs: global.PROMOTION_NAME},
        };

        return await promotions.paginate({}, options);
    },

    getPagesOfPromotions: async function (page=global.DEFAULT_PAGE_NUM, limit=global.DEFAULT_PAGE_SIZE, numOfPages=1) {

        const promises = [];
        for(i=0; i < numOfPages; i++){
            promises.push(this.getPromotions(+page + +i, limit));
        }

        const results = await Promise.all(promises);
        const promotionsArr = results.map(result => {
            return result.promotions;
        });
        return {promotions: [].concat.apply([], promotionsArr)};
    },

    updatePromotion: async function (promotion) {
        return await promotions.findByIdAndUpdate(promotion._id, promotion, {new: true});
    },

    deletePromotion: async function (id) {
       await promotions.findByIdAndRemove(id);
    },

    getPromotionMetaData: function () {
        const promotionStructureMetaData = JSON.parse(JSON.stringify(promotionStructure));
        for (let key in promotionStructureMetaData) {
            const property =  promotionStructure[key];
            let type = "String";
            if (property.type === String) {
                type =  "String"
            } else if (property.type === Date) {
                type =  "Date"
            } else if (property.type === Number) {
                type =  "Number"
            } else if (property.type === Boolean) {
                type =  "Boolean"
            }

            promotionStructureMetaData[key].type = type;
        }

        return promotionStructureMetaData;
    }
};