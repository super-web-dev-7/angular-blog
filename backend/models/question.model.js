import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    picture: {
        type: [{type: String}],
        required: true
    },
    title: {
        type: String
    },
    answer: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Answer'
    },
    approved: {
        type: Boolean,
        default: false
    },
    isAnswered: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Question', QuestionSchema);
