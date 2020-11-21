import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
});

CategorySchema.plugin(uniqueValidator);

export default mongoose.model('Category', CategorySchema);
