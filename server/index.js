require('dotenv').config();
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');

const app = express();
app.use(cors());
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

passport.use(new passportJWT.Strategy(jwtOptions, async function (payload, next) {
    if (!payload.member_email) {
        next(null, false);

        return;
    }

    const member = await getMemberByEmail(payload.member_email);

    if (!member) {
        next(null, false);

        return;
    }

    next(null, member);
}));

app.get('/', (req, res) => {
    res.json('Hello from server');
});

app.route('/articles')
    .get(async function(req, res) {
        try {
            const responseArticles = await axiosDB.get('/articles');

            res.json(responseArticles.data);
        } catch (error) {
            res.sendStatus(error.response.status);
        }
    })
    .post(jsonParser, passport.authenticate('jwt', { session: false }), async function(req, res) {
        if (req.body.title && req.body.content) {
            try {
                const responseArticle = await axiosDB.post('/articles', {
                    title: req.body.title,
                    content: req.body.content,
                    created_at : new Date(),
                    author: req.user.email,
                });

                res.sendStatus(responseArticle.status);
            } catch (error) {
                res.sendStatus(error.response.status);
            }

            return;
        }
        res.sendStatus(400);
    });

app.route('/articles/:id')
    .get(async function(req, res) {
        try {
            const article = await getArticleById(req.params.id);

            if (!article) {
                res.sendStatus(404);

                return;
            }

            res.json(article);
        } catch (error) {
            res.sendStatus(error.response.status);
        }
    })
    .put(jsonParser, passport.authenticate('jwt', { session: false }), async function(req, res) {
        if (req.body.title && req.body.content) {
            try {
                const article = await getArticleById(req.params.id);

                if (!article) {
                    res.sendStatus(404);

                    return;
                }

                if (article.author !== req.user.email) {
                    res.sendStatus(401);

                    return;
                }

                const responseArticle = await axiosDB.put(`/articles/${article._id}`, {
                    title: req.body.title,
                    content: req.body.content,
                    created_at: article.created_at,
                    author: article.author,
                });

                res.sendStatus(responseArticle.status);
            } catch (error) {
                res.sendStatus(error.response.status);
            }

            return;
        }
        res.sendStatus(400);
    })
    .delete(passport.authenticate('jwt', { session: false }), async function(req, res) {
        try {
            const article = await getArticleById(req.params.id);

            if (!article) {
                res.sendStatus(404);

                return;
            }

            if (article.author !== req.user.email) {
                res.sendStatus(401);

                return;
            }

            const responseArticle = await axiosDB.delete(`/articles/${article._id}`);

            res.sendStatus(responseArticle.status);
        } catch (error) {
            res.sendStatus(error.response.status);
        }
    });

app.get('/articles/members/:id', async function(req, res) {
    try {
        const responseMember = await axiosDB.get(`/members/${req.params.id}`);

        if(responseMember.data.length === 0) {
            res.sendStatus(404);

            return;
        }

        const queryString = JSON.stringify({
            author: responseMember.data.email,
        });

        const responseArticle = await axiosDB.get(`/articles?q=${queryString}`);

        if (responseArticle.data.length === 0) {
            res.sendStatus(404);

            return;
        }

        res.json(responseArticle.data);
    } catch (error) {
        res.sendStatus(error.response.status);
    }
});

app.post('/create_account', jsonParser, async function(req, res) {
    if (req.body.email && req.body.password) {
        try {
            const responseMember = await axiosDB.post('/members', {
                email: req.body.email,
                password: req.body.password,
            });

            res.sendStatus(responseMember.status);
        } catch (error) {
            res.sendStatus(error.response.status);
        }

        return;
    }
    res.sendStatus(400);
});

app.post('/login', jsonParser, async function(req, res) {
   if (req.body.email && req.body.password) {
       try {
           const member = await getMemberByEmail(req.body.email);

           if (!member || member.password !== req.body.password) {
               res.sendStatus(401);

               return;
           }

           const jwtUser = jwt.sign({
               member_id: member._id,
               member_email: member.email,
           }, secret);

           res.json({jwt: jwtUser});
       } catch (error) {
           res.sendStatus(error.response.status);
       }

       return;
   }
   res.sendStatus(400);
});

app.listen(process.env.PORT, () => {
    console.log('App listening on ' + process.env.PORT);
});

async function getArticleById(id) {
    const responseArticle = await axiosDB.get(`/articles/${id}`);

    if (responseArticle.data.length === 0) {
        return null;
    }

    return responseArticle.data;
}

async function getMemberByEmail(email) {
    const queryString = JSON.stringify({
        email: email,
    });

    const responseMember = await axiosDB.get(`/members?q=${queryString}`);

    if (responseMember.data.length === 0) {
        return null;
    }

    return responseMember.data[0];
}