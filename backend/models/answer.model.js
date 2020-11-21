import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    content: {
        type: String,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Answer', AnswerSchema);
