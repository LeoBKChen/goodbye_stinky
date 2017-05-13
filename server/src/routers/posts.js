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
    const isRefridge = req.query;
    postModel.list(isRefridge).then(posts => {
        res.json(posts);
    }).catch(next);
});

// Create
router.post('/posts', function(req, res, next) {
    const isRefridge = req.query;
    const FoodDetail = req.body;
    if (!FoodDetail || !isRefridge) {
        const err = new Error('Mood and text are required');
        err.status = 400;
        throw err;
    }
    postModel.create(isRefridge, FoodDetail).then(post => {
        res.json(post);
    }).catch(next);
});

//Delete
router.get('/posts', function(req, res, next) {
    // const {searchText, start} = req.query;
    const {isRefridge, id} = req.query;
    
    postModel.delete(isRefridge, id).then(posts => {
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
