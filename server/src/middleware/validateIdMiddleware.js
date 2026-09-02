const validateId = (req, res, next) => {
    const questionId = Number(req.params.id);

    if(!Number.isInteger(questionId) || questionId < 1){
        return res.status(400).json({
            message: "Invalid quetion ID.",
        });
    }

    next();
};

module.exports = validateId;