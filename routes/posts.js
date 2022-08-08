const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const {
    body,
    validationResult
} = require('express-validator');

//GET ALL POSTS with limit, offset and advanced sorting on date
router.get('/', async (req, res) => {
    const lim = req.query.limit;
    const offset = req.query.offset;
    const sort = {};

    if(req.query.sortBy){
        const str = req.query.sortBy.split(':');
        sort[str[0]] = str[1] === 'desc' ? -1:1
    }

    try {
        const posts = await Post.find().limit(lim).skip(offset).sort(sort);
        res.json(posts);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

//SUBMIT POST
router.post('/',
    body('title')
    .notEmpty().withMessage('May not be empty')
    .isString().withMessage('Must be string'), 
    body('description')
    .notEmpty().withMessage('May not be empty')
    .isString().withMessage('Must be string'), 
    async (req, res) => {

        console.log(req.body); //weg

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        } else {
            const post = new Post({
                title: req.body.title,
                description: req.body.description
            });

            try {
                const savePost = await post.save();
                res.json(savePost);
            } catch (err) {
                res.json({
                    message: err
                });
            }

        } 
    });

//SPECIFIC POSTS 
// router.get('/:postId', async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.postId);
//         res.json(post);
//     } catch (err) {
//         res.json({
//             message: err
//         });
//     }
// });

//SPECIFIC POSTS 
router.get('/:key', async (req, res) => {
    try {
        const post = await Post.find({
            "$or"
        });
        res.json(post);
    } catch (err) {
        res.json({
            message: err
        });
    }
});


//DELETE POST
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.deleteOne({
            _id: req.params.postId
        });
        res.json(removedPost);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

//UPDATE POST (FIX)
router.put('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne({
            _id: req.params.postId
        }, {
            $set: {
                title: req.params.title,
                description: req.params.description
            }
        });
        res.json(updatedPost);
    } catch (err) {
        res.json({
            message: err
        });
    }
});


module.exports = router;