const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');

const DB_HOST = 'https://blogjsgrauwinm-7d7b.restdb.io/rest';
const DB_API_KEY = '9eb332d313209223941edbd710ea7284955d3';
const PORT = process.env.PORT || 3000;

const app = express();
const ax = axios.create({
    baseURL: DB_HOST,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': DB_API_KEY,
    },
});
const jsonParser = bodyParser.json();

app.get('/', (req, res) => {
    res.json('Hello from server');
});

app.route('/articles')
    .get(function(req, res) {
        ax.get('/articles')
            .then(response => {
                res.json(response.data);
            })
            .catch(error => {
                res.sendStatus(error.response.status);
            });
    })
    .post(jsonParser, function(req, res) {
        if (req.body.title && req.body.content && req.body.createdAt && req.body.author) {
            ax.post('/articles', {
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
        ax.get(`/articles/${req.params.id}`)
            .then(response => {
                res.json(response.data);
            })
            .catch(error => {
                res.sendStatus(error.response.status);
            })
    })
    .put(jsonParser, function(req, res) {
        if (req.body.title && req.body.content && req.body.createdAt && req.body.author) {
            ax.put(`/articles/${req.params.id}`, {
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
        ax.delete(`/articles/${req.params.id}`)
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

app.listen(PORT, () => {
    console.log('App listening on ' + PORT);
});
