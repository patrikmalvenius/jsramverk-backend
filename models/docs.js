const database = require("../db/database.js");
//const ObjectId = require('mongodb').ObjectId;

const docs = {
    getAllDocs: async function (res, req) {
        // försökt bara hämta _id och name men fick inte project att funka, skumt
        //får palla felsöka längre fram
        let db;
        console.log("KOMMER TILLL MODEL");
        try {
            db = await database.getDb();

            let data = await db.collection.find().toArray();

            return data;
        } catch (e) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    path: "/data",
                    title: "Database error",
                    message: e.message
                }
            });
        } finally {
            await db.client.close();
        }
    },

    createDoc: async function(req) {
        // se om jag kan fatta varför emil satte res, req här. för mig just nu funkar fint med bara req när jag
        //pajpar bara requesten hit från routen

        let doc = req.body.document;
        let name = req.body.name;
        console.log(req.body.name);
        let db;
        let res;

        try {
            db = await database.getDb();

            let docData = { name: name, doc: doc};
            let insert = await db.collection.insertOne(docData);
            //den här verkar inte returnera 201...
            if (insert) {
                return res.status(201).json({
                    data: insert.value
                });
            }
        } catch (e) {
            return res.status(500).json({
                error: {
                    status: 500,
                    path: "POST /data INSERT",
                    title: "Database error",
                    message: e.message
                }
            });
        } finally {
            await db.client.close();
        }
    },

    saveDoc: async function(req) {
        // se om jag kan fatta varför emil satte res, req här. för mig just nu funkar fint med bara req när jag
        //pajpar bara requesten hit från routen

        let doc = req.body.document;
        let name = req.body.name;
        let _id = req.body._id;
        console.log(req.body.name);
        let db;
        let res;

        try {
            db = await database.getDb();
            const filter = { _id: _id };
            // replace the matched document with the replacement document
            const replacementDocument = {
                name: name,
                doc: doc
            };

            let insert = await collection.replaceOne(filter, replacementDocument);
            //den här verkar inte returnera 201...
            if (insert) {
                return res.status(201).json({
                    data: insert.value
                });
            }
        } catch (e) {
            return res.status(500).json({
                error: {
                    status: 500,
                    path: "POST /data INSERT",
                    title: "Database error",
                    message: e.message
                }
            });
        } finally {
            await db.client.close();
        }
    },
    getDoc: async function(req) {
        // se om jag kan fatta varför emil satte res, req här. för mig just nu funkar fint med bara req när jag
        //pajpar bara requesten hit från routen

        let name = req.body.name;
        let db;
        let res;

        try {
            db = await database.getDb();

            let docData = { name: name};
            let retrieve = await db.collection.findOne(docData);
            return retrieve;
            //den här verkar inte returnera 201...
            /*if (retrieve) {
                return res.status(201).json({
                    data: retrieve.value
                });
            }*/
        } catch (e) {
            return res.status(500).json({
                error: {
                    status: 500,
                    path: "POST /data RETRIEVE",
                    title: "Database error",
                    message: e.message
                }
            });
        } finally {
            await db.client.close();
        }
    },

};

module.exports = docs;
