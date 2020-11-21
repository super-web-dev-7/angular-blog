import CategorySchema from '../models/category.model';

export const addCategory = (req, res, next) => {
    const newCategory = new CategorySchema(
        req.body
   );
    newCategory.save()
        .then(savedCategory => res.status(201).json({status: 'success', result: savedCategory}))
        .catch(e => {
            if (e.errors.name.properties.type === 'unique') {
                res.send({status: 'Category Name already exists'})
            } else {
                res.status(500).json({status: 'Server Error'});
                next(e);
            }
        })
};

export const getAllCategory = (req, res, next) => {
    CategorySchema.find().exec(function (err, result) {
        if (err) res.status(500).json(err);
        else res.status(200).json(result);
    })
};
