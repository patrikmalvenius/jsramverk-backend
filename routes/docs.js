const express = require('express');
const router = express.Router();

const docs = require("../models/docs.js");


router.get('/', async (request, response) => {
    try {
        let res = await docs.getAllDocs(request, response);
        console.log(res);
        response.json(res);
    } catch (err) {
        console.log(err);
        response.json(err);
    }
});

router.post('/', async (request, response) => {
    //console.log(request.body);
    try {
        let res = await docs.createDoc(request);
        //console.log(res);
        //response.json(res);
        response.json(res);
    } catch (err) {
        //console.log(err);
        response.json(err);
    }
});

router.post('/update', async (request, response) => {
    //console.log(request.body);
    try {
        let res = await docs.saveDoc(request);
        //console.log(res);
        //response.json(res);
        response.json(res);
    } catch (err) {
        //console.log(err);
        response.json(err);
    }
});

router.post('/oneDoc', async (request, response) => {
    //console.log(request.body);
    try {
        let res = await docs.getDoc(request);
        //console.log(res);
        //response.json(res);
        response.json(res);
    } catch (err) {
        //console.log(err);
        response.json(err);
    }
});


module.exports = router;
