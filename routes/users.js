const express = require('express');
const router = express.Router();
const {
    body,
    validationResult
} = require('express-validator');
const  validateUserPhoneNumber  = require('../validations/user_phoneNumber');
const User = require('../models/User');

//GET ALL USERS
router.get('/', async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

//SUBMIT USER
router.post('/', 
body('name')
.notEmpty().withMessage('May not be empty')
.isAlpha().withMessage('Name cannot contain numbers or any other type of characters then letters'), 
body('email')
.notEmpty().withMessage('May not be empty')
.isEmail().withMessage('Must be valid email'),
body('password')
.notEmpty().withMessage('May not be empty')
.isLength({ min: 5 }),
validateUserPhoneNumber,
body('phone')
.isMobilePhone().withMessage('Not valid phone number'),
body('age')
.isInt().withMessage('Must be numeric')
.isLength({ max: 2 }),
    async (req, res) => {

        console.log(req.body); //weg

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        } else {
            const user = new User({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                phone: req.body.phone
            });

            try {
                const saveUser = await user.save();
                res.json(saveUser);
            } catch (err) {
                res.json({
                    message: err
                });
            }

        } 
       
    });

//SPECIFIC USER
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId); 
        res.json(user);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

//DELETE USER
router.delete('/:userId', async (req, res) => {
    try {
        const removedUser = await User.deleteOne({
            _id: req.params.userId
        });
        res.json(removedUser);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

//UPDATE USER (FIX)
router.put('/:UserId', async (req, res) => {
    try {
        const updatedUser = await User.updateOne({
            _id: req.params.userId
        }, {
            $set: {
                name: req.params.name,
                password: req.params.password,
                email: req.body.email,
                phone: req.body.phone
            }
        });
        res.json(updatedUser);
    } catch (err) {
        res.json({
            message: err
        });
    }
});


module.exports = router;