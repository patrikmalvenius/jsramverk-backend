const mongo = require("mongodb").MongoClient;
const config = require("./config.json");
const collectionName = "docs";
//FRÅN MONGO ATLAS
/*
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://texteditor:<password>@cluster0.icp8h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});*/

//GÅ IGENOM Å KOLLA DET OVAN

const database = {
    getDb: async function getDb () {
        //const config = require("./config.json");

        let dsn = `mongodb+srv://${config.username}:${config.password}@cluster0.icp8h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

        if (process.env.NODE_ENV === 'test') {
            dsn = "mongodb://localhost:27017/test";
        }

        const client  = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = await client.db();
        const collection = await db.collection(collectionName);

        return {
            collection: collection,
            client: client,
        };
    }
};

module.exports = database;