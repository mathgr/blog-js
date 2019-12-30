const axios = require('axios');
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

app.get('/', (req, res) => {
    res.json('Hello from server');
});

app.route('/articles')
    .get(function(req, res) {
        ax.get('/articles')
            .then(response => {
                res.json(response.data);
            });
    })
    .post(function(req, res) {
        res.json('TODO : ajouter un article');
    });

app.route('/articles/:id')
    .get(function(req, res) {
        const query = `q={ "id": ${req.params.id} }`;
        ax.get(`/articles?${query}`)
            .then(response => {
                res.json(response.data);
            });
    })
    .put(function(req, res) {
        res.json('TODO : mettre à jour l\'article ' + req.params.id);
    })
    .delete(function(req, res) {
        const query = `q={ "id": ${req.params.id} }`;
        ax.delete(`/articles/*?${query}`)
            .then(response => {
                res.json(response.data);
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
