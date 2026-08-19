const errorHandler = (error, req, res, next) => {
    console.error(error);

    if(error.code === "23505"){
        return res.status(409).json({
            message: "Email already registered",
        });
    }

    return res.status(500).json({
        message: "Internal server error",
    });
};

module.exports = errorHandler;