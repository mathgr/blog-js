require('dotenv').config();
const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');

const app = express();
const axiosDB = axios.create({
    baseURL: process.env.DB_HOST,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.DB_API_KEY,
    },
});
const jsonParser = bodyParser.json();
const secret = process.env.JWT_SECRET;
const jwtOptions = {
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
};

passport.use(new passportJWT.Strategy(jwtOptions, function (payload, next) {
    if (!payload.member_email) {
        next(null, false);

        return;
    }

    const queryString = JSON.stringify({
        email: payload.member_email,
    });

    axiosDB.get(`/members?q=${queryString}`)
        .then(response => {
            const member = response.data[0];
            if (typeof member !== 'undefined') {
                next(null, member);
            } else {
                next(null, false);
            }
        })
        .catch(error => next(null, false));
}));

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
    .post(jsonParser, passport.authenticate('jwt', { session: false }), function(req, res) {
        if (!req.user.email) {
            res.sendStatus(401);

            return;
        }

        if (req.body.title && req.body.content) {
            axiosDB.post('/articles', {
                title: req.body.title,
                content: req.body.content,
                created_at : new Date(),
                author: req.user.email
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
                if (response.data.length !== 0) {
                    res.json(response.data);
                } else {
                    res.sendStatus(404);
                }
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
                res.sendStatus(response.status);
            })
            .catch(error => {
                res.sendStatus(error.response.status);
            });
    });

app.post('/create_account', jsonParser, function(req, res) {
    if (req.body.email && req.body.password) {
        axiosDB.post('/members', {
            email: req.body.email,
            password: req.body.password
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

app.post('/login', jsonParser, function(req, res) {
   if (req.body.email && req.body.password) {
       const queryString = JSON.stringify({
           email: req.body.email,
       });
       axiosDB.get(`/members?q=${queryString}`)
           .then(response => {
               const member = response.data[0];
               if (typeof member !== 'undefined' && member.password === req.body.password) {
                   const userJwt = jwt.sign({
                       member_email: member.email
                   }, secret);
                   res.json({jwt: userJwt});
               } else {
                   res.sendStatus(401);
               }
           })
           .catch(error => {
               res.send(error.response.status);
           });

       return;
   }
   res.sendStatus(400);
});

app.listen(process.env.PORT, () => {
    console.log('App listening on ' + process.env.PORT);
});
