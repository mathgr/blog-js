const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json('Hello from back');
});

app.route('/articles')
    .get(function(req, res) {
        res.json('TODO : récupérer la liste des articles');
    })
    .post(function(req, res) {
        res.json('TODO : ajouter un article');
    });

app.route('/articles/:id')
    .get(function(req, res) {
        res.json('TODO : récupérer l\'article ' + req.params.id);
    })
    .put(function(req, res) {
        res.json('TODO : mettre à jour l\'article ' + req.params.id);
    })
    .delete(function(req, res) {
        res.json('TO DO : supprimer l\'article ' + req.params.id);
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