const types = [
    "Basic",
    "Common",
    "Epic"
];

const promotionStructure = {
    name: {type: String, required: true},
    type: {type: String, required: true, enum: types},
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    userGroupName: {type: String, required: true}
};

module.exports = {
    types,
    promotionStructure
};