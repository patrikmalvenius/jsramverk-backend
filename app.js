const express = require("express");
//const morgan = require("morgan");
const cors = require('cors');
const app = express();
//const bodyParser = require("body-parser");
const docs = require('./routes/docs');

/*
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
*/
const port = process.env.PORT || 1337;

app.use(express.json());
app.use(cors());
/*
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
}*/

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next()
});

app.use('/', docs);
/*

app.get("/", (req, res) => {
    const data = {
        data: {
            msg: "Hello World"
        }
    };

    res.json(data);
});
*/
/*
app.get("/hello/:msg", (req, res) => {
    const data = {
        data: {
            msg: req.params.msg
        }
    };

    res.json(data);
})

app.post("/user", (req, res) => {
    res.status(201).json({
        data: {
            msg: "Got a POST request, sending back 201 Created"
        }
    });
});

app.put("/user", (req, res) => {
    res.status(204).send();
});

app.delete("/user", (req, res) => {
    res.status(204).send();
});

app.get("/user", (req, res) => {
    res.json({
        data: {
            msg: "Got a GET request"
        }
    });
});

app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title": err.message,
                "detail": err.message
            }
        ]
                
    });
});
*/

app.listen(port, () => console.log(`Example API listening on port ${port}!`));