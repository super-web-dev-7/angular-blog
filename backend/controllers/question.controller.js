import fs from 'fs';
import QuestionSchema from '../models/question.model';
import AnswerSchema from '../models/answer.model';
import jwt from "jsonwebtoken";
import config from "../config/config";

function getUserfromToken(req) {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) return undefined;
    else {
        return jwt.verify(token.slice(7), config.jwtSecret);
    }
}

export const addQuestion = (req, res, next) => {
    let picture = [];
    for (let file of req.files) {
        picture.push(file.filename)
    }
    const newQuestion = new QuestionSchema({
        picture: picture,
        title: req.body.title,
        createdAt: Date.now(),
        createdBy: req.body.createdBy
    });

    newQuestion.save().then(result => res.status(201).json(result)).catch(e => next(e));
};

export const getQuestionById = (req, res, next) => {
    QuestionSchema.findOne({_id: req.params.id}).populate('createdBy', 'email firstName lastName _id isAdmin').populate('answer').exec(function (err, result) {
        if (err) res.status(500).json(err);
        else res.status(200).json(result)
    })
};

export const editQuestionById = (req, res, next) => {
    QuestionSchema.updateOne({_id: req.params.id}, req.body).exec(function (err, result) {
        if (err) res.status(500).json(err);
        else res.status(200).json(result);
    })
};

export const addPicture = (req, res, next) => {
    QuestionSchema.findOne({_id: req.params.id}).exec(function (err, result) {
        if (err) res.status(500).json(err);
        else {
            for (let file of req.files) {
                result.picture.push(file.filename)
            }
            QuestionSchema.updateOne({_id: req.params.id}, {picture: result.picture}).exec(function (error, data) {
                if (error) res.status(500).json(error);
                else res.status(200).json(result);
            })
        }
    })
};

export const deletePicture = (req, res, next) => {
    QuestionSchema.findOne({_id: req.params.id}).exec(function (err, result) {
        if (err) res.status(500).json(err);
        else {
            for (let i = 0; i < result.picture.length; i++) {
                if (result.picture[i] === req.body.picture) {
                    result.picture.splice(i, 1);
                }
            }
            QuestionSchema.updateOne({_id: req.params.id}, {picture: result.picture}).exec(function (error, data) {
                if (error) res.status(500).json(error);
                else {
                    try {
                        fs.unlinkSync('./public/' + req.body.picture);
                        //file removed
                    } catch (err) {
                        console.error(err)
                    }
                    res.status(200).json(result);
                }
            })
        }
    })
};

export const getQuestions = (req, res, next) => {
    const user = getUserfromToken(req);
    const pageCount = 20;
    const pageStart = parseInt(req.query.start);
    let questionQuery = {};
    let answerQuery = {};
    if (req.query.isApproved === 'true') {
        if (user !== undefined) {
            if (user.isAdmin) {
                questionQuery.approved = true;
            } else {
                questionQuery.$or = [];
                questionQuery.$or.push({approved: true});
                questionQuery.$or.push({createdBy: user.id});
            }
        } else {
            questionQuery.approved = true;
        }
        console.log(questionQuery)
    }

    if (req.query.isAnswered === 'true') {
        questionQuery.isAnswered = true;
    }
    if (req.query.category !== 'null') {
        questionQuery.isAnswered = true;
        answerQuery.category = req.query.category;
    }
    if (req.query.keyword !== '') {
        questionQuery.isAnswered = true;
        answerQuery.content = { "$regex": req.query.keyword, "$options": "i" };
    }

    QuestionSchema
        .find(questionQuery)
        .populate({
            path: 'answer',
            match: answerQuery
        })
        .sort('-updatedAt')
        .exec(function (err, result) {
            if (err) res.status(500).json(err);
            if (err) next(err)
            else {
                if (req.query.category !== 'null' || req.query.keyword !== '') {
                    result = result.filter(function (item) {
                        return item.answer;
                    })
                }
                result = result.splice(pageStart, pageStart + pageCount)
                res.status(200).json(result);
            }
        })
};

export const approveQuestion = (req, res, next) => {
    QuestionSchema.update({_id: req.params.id}, {approved: req.body.approved}).exec(function (err, result) {
        if (err) res.status(500).json(err);
        else res.status(200).json(result);
    })
};

export const addAnswer = (req, res, next) => {
    const newAnswer = new AnswerSchema(req.body);
    newAnswer.save()
        .then(savedAnswer => {
            QuestionSchema.updateOne({_id: req.params.id}, {
                answer: savedAnswer._id,
                isAnswered: true
            }).exec(function (err, result) {
                if (err) res.status(500).json(err);
                else res.status(200).json({status: 'success', result: result});
            })
        })
        .catch(e => next(e))
};

export const editAnswer = (req, res, next) => {
    AnswerSchema.updateOne({_id: req.params.id}, req.body, function (err, result) {
        if (err) res.status(500).json(err);
        else res.status(200).json(result);
    })
};

