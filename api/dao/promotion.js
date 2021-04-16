const {db, paging} = require('./db.js');
const {promotionStructure} = require("./../util/promotionConstants.js");
const promotionTable = "promotions";

const schema = new db.Schema(promotionStructure);

schema.plugin(paging);
const promotions = db.model(promotionTable, schema);

module.exports = promotions;