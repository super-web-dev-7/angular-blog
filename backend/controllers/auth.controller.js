import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const fs = require('fs');
import User from '../models/user.model';
import config from "../config/config";

const saltRounds = 10;

export const login = async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.getUserByEmail(email.toLowerCase());
    if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                // Passwords match
                const token = jwt.sign({
                    id: user.id,
                    email: user.email.toLowerCase(),
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isAdmin: user.isAdmin
                }, config.jwtSecret);
                res.json({token});
            } else {
                // Passwords don't match
                res.status(400).send({
                    message: 'Incorrect Email or Password!'
                });
            }
        });
    } else {
        res.status(400).send({
            message: 'Incorrect Email or Password'
        });
    }
};

export const loginWithGoogle = (req, res, next) => {
    User.findOne({googleId: req.body.id, email: req.body.email.toLowerCase()}).exec(function (err, data) {
        if (data) {
            const token = jwt.sign({
                id: data._id,
                email: data.email.toLowerCase(),
                firstName: data.firstName,
                lastName: data.lastName,
                isAdmin: data.isAdmin
            }, config.jwtSecret);
            res.json({token})
        } else {
            res.status(400).send({
                message: 'Incorrect Email or Password'
            });
        }
    })
};

export const loginWithFacebook = (req, res, next) => {
    User.findOne({facebookId: req.body.id, email: req.body.email.toLowerCase()}).exec(function (err, data) {
        if (data) {
            const token = jwt.sign({
                id: data._id,
                email: data.email.toLowerCase(),
                firstName: data.firstName,
                lastName: data.lastName,
                isAdmin: data.isAdmin
            }, config.jwtSecret);
            res.json({token})
        } else {
            res.status(400).send({
                message: 'Incorrect Email or Password'
            });
        }
    })
};

export const signup = async (req, res, next) => {
    const user = await User.getUserByEmail(req.body.email.toLowerCase());
    if (!user) {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            const userModel = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email.toLowerCase(),
                password: hash,
            });

            userModel.save()
                .then(savedUser => res.status(201).json({status: 'success', result: savedUser}))
                .catch(e => next(e));
        });
    } else {
        if (user.password === undefined) {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                User.updateOne({_id: user.id}, {password: hash}).exec(function (err, data) {
                    if (err) {
                        res.send({status: 'Server Error'})
                    } else {
                        res.send({status: 'success'})
                    }
                })
            })
        } else {
            res.send({status: 'Email already exists'})
        }
    }

};

export const signUpWithGoogle = (req, res, next) => {
    if (req.body.provider === 'GOOGLE') {
        User.findOne({email: req.body.email.toLowerCase()}).exec(function (err, result) {
            if (result !== null) {
                User.updateOne({_id: result._id}, {
                    googleId: req.body.id,
                    authToken: req.body.authToken
                }).exec(function (err, data) {
                    if (err) {
                        res.send({status: 'Server Error'})
                    } else {
                        res.send({status: 'Your Google Account registered successfully!'})
                    }
                })
            } else {
                const userModel = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email.toLowerCase(),
                    googleId: req.body.id,
                    authToken: req.body.authToken
                });
                userModel.save()
                    .then(savedUser => res.status(201).json({status: 'success', result: savedUser}))
                    .catch(e => {
                        res.status(500).json({status: 'Server Error'});
                        next(e);

                    })
            }
        })
    }
};

export const signUpWithFacebook = (req, res, next) => {
    if (req.body.provider === 'FACEBOOK') {
        User.findOne({email: req.body.email.toLowerCase()}).exec(function (err, result) {
            if (result !== null) {
                User.updateOne({_id: result._id}, {
                    facebookId: req.body.id,
                    authToken: req.body.authToken
                }).exec(function (err, data) {
                    if (err) {
                        res.send({status: 'Server Error'})
                    } else {
                        res.send({status: 'Email already exists'})
                    }
                })
            } else {
                const userModel = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email.toLowerCase(),
                    facebookId: req.body.id,
                    authToken: req.body.authToken
                });
                userModel.save()
                    .then(savedUser => res.status(201).json({status: 'success', result: savedUser}))
                    .catch(e => {
                        if (e.errors.email.properties.type === 'unique') {
                            res.send({status: 'Email already exists'})
                        } else {
                            res.status(500).json({status: 'Server Error'});
                            next(e);
                        }
                    })
            }
        })
    }
};
