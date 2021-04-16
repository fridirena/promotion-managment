const MongoClient = require('mongodb').MongoClient;
const connectionString = "mongodb+srv://moonactive:moonactive@clustermoonactive.m0osa.mongodb.net/MoonActive?retryWrites=true&w=majority";
const promotionTable = "promotions";
const dbName = "MoonActive";

module.exports = {
    save: function (promotions) {

        MongoClient.connect(connectionString, (err, client) => {
            if (err) throw err;
            const db = client.db(dbName);
            db.collection(promotionTable).insertMany(promotions, (err, res) => {
                if (err) throw err;
                console.log("1 document inserted");
                client.close();
            });
        });
    },
    drop: function () {

        MongoClient.connect(connectionString, (err, client) => {
            if (err) throw err;
            const db = client.db(dbName);
            db.collection(promotionTable);
            db.collection(promotionTable).drop((err, res) => {
                if (err) throw err;
                console.log("promotions table have been deleted");
                client.close();
            });
        });
    },
    findAll: async function () {
        const client = await MongoClient.connect(connectionString);
        const db = client.db(dbName);
        const res = await db.collection(promotionTable).find().toArray();
        client.close();
        return res;

        /*return MongoClient.connect(connectionString).then((client) => {
            const db = client.db(dbName);
            return db.collection(promotionTable).find().toArray().then((res) => {
                console.log("getting all the promotions from db");
                client.close();
                return res;
            });
        });*/
    }
};