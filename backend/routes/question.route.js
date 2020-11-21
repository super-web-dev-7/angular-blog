import { Router } from 'express';
import * as QuestionController from '../controllers/question.controller';
import multer from "multer";
import expressJwt from 'express-jwt';
import config from "../config/config";
import adminMiddleware from "../middleware/adminMiddleware";
import authMiddleware from "../middleware/authMiddleware";

function getExt(filename) {
    var ext = filename.split('.').pop();
    if(ext === filename) return "";
    return ext;
}

const auth = expressJwt({
    secret: config.jwtSecret
});

const router = Router(); // eslint-disable-line new-cap
const uploadQuestionFile = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '.' + getExt(file.originalname));
        }
    }),
    limits: {fileSize: 20000000}
});

router.route('/addQuestion').post(uploadQuestionFile.array('picture', 20), QuestionController.addQuestion);
router.route('/getQuestion/:id').get(QuestionController.getQuestionById);
router.route('/editQuestion/:id').put(QuestionController.editQuestionById);
router.route('/addPicture/:id').put(uploadQuestionFile.array('picture', 20), QuestionController.addPicture);
router.route('/deletePicture/:id').put(QuestionController.deletePicture);
router.route('/getQuestions').get(QuestionController.getQuestions);
router.route('/approveQuestion/:id').put([authMiddleware, adminMiddleware(true)], QuestionController.approveQuestion);
router.route('/addAnswer/:id').put([authMiddleware, adminMiddleware(true)], QuestionController.addAnswer);
router.route('/editAnswer/:id').put([authMiddleware, adminMiddleware(true)], QuestionController.editAnswer);

export default router;
