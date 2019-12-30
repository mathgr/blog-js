require('dotenv').config();
const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const axiosDB = axios.create({
    baseURL: process.env.DB_HOST,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.DB_API_KEY,
    },
});
const jsonParser = bodyParser.json();

app.get('/', (req, res) => {
    res.json('Hello from server');
});

app.route('/articles')
    .get(function(req, res) {
        axiosDB.get('/articles')
            .then(response => {
                res.json(response.data);
            })
            .catch(error => {
                res.sendStatus(error.response.status);
            });
    })
    .post(jsonParser, function(req, res) {
        if (req.body.title && req.body.content && req.body.createdAt && req.body.author) {
            axiosDB.post('/articles', {
                title: req.body.title,
                content: req.body.content,
                created_at : req.body.createdAt,
                author: req.body.author
            })
                .then(response => {
                    res.sendStatus(response.status);
                })
                .catch(error => {
                    res.sendStatus(error.response.status);
                });

            return;
        }
        res.sendStatus(400);
    });

app.route('/articles/:id')
    .get(function(req, res) {
        axiosDB.get(`/articles/${req.params.id}`)
            .then(response => {
                res.json(response.data);
            })
            .catch(error => {
                res.sendStatus(error.response.status);
            })
    })
    .put(jsonParser, function(req, res) {
        if (req.body.title && req.body.content && req.body.createdAt && req.body.author) {
            axiosDB.put(`/articles/${req.params.id}`, {
                title: req.body.title,
                content: req.body.content,
                created_at: req.body.createdAt,
                author: req.body.author
            })
                .then(response => {
                    res.sendStatus(response.status);
                })
                .catch(error => {
                    res.sendStatus(error.response.status);
                });

            return;
        }
        res.sendStatus(400);
    })
    .delete(function(req, res) {
        axiosDB.delete(`/articles/${req.params.id}`)
            .then(response => {
                res.json(response.data);
            })
            .catch(error => {
                res.sendStatus(error.response.status);
            });
    });

app.post('/create_account', function(req, res) {
   res.json('TO DO : créer un compte');
});

app.post('/login_check', function(req, res) {
   res.json('TO DO : se connecter');
});

app.listen(process.env.PORT, () => {
    console.log('App listening on ' + process.env.PORT);
});
