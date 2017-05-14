const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const postModel = require('../model/posts.js');
// const voteModel = require('../model/votes.js');

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController); // Allows cross-origin HTTP requests

// List
router.get('/posts', function(req, res, next) {
    // const {searchText, start} = req.query;
    var isRefrige = req.query;
    postModel.list(isRefrige = false).then(posts => {
        res.json(posts);
    }).catch(next);
});

// Create
router.post('/posts', function(req, res, next) {
    var isRefrige = req.query;
    const foodDetail = req.body;

    if (!foodDetail || !isRefrige) {
        const err = new Error('Mood and text are required');
        err.status = 400;
        throw err;
    }
    postModel.create(isRefrige = false, foodDetail).then(post => {
        res.json(post);
    }).catch(next);
});

//Update
router.post('/posts', function(req, res, next) {
    var isRefrige = req.query;
    const foodDetail = req.body;
    if (!foodDetail || !isRefrige) {
        const err = new Error('Mood and text are required');
        err.status = 400;
        throw err;
    }
    postModel.update(isRefrige = false, foodDetail).then(post => {
        res.json(post);
    }).catch(next);
});

//Delete
router.get('/posts', function(req, res, next) {
    var isRefrige = req.query;
    const id = req.query;

    postModel.delete(isRefrige = false, id).then(posts => {
        res.json(posts);
    }).catch(next);
});

// Vote
// router.post('/posts/:id/:mood(clear|clouds|drizzle|rain|thunder|snow|windy)Votes', function(req, res, next) {
//     const {id, mood} = req.params;
//     if (!id || !mood) {
//         const err = new Error('Post ID and mood are required');
//         err.status = 400;
//         throw err;
//     }
//     voteModel.create(id, mood).then(post => {
//         res.json(post);
//     }).catch(next);
// });

module.exports = router;
