const adminMiddleware = (role) => {
    return (req, res, next) => {
        if (role === req.user.isAdmin)
            next();
        else
            res.status(400).send('Permission restrict')
    }
};
export default adminMiddleware;
