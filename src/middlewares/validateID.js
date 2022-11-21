export async function validateID(req, res, next) {
    if(!req.body._id) {
        return res.sendStatus(400);
    }
    next();
}