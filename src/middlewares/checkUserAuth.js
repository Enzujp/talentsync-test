const jwt = require("jsonwebtoken");

const checkUserAuthentication = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const user = decodedToken.user;
        if (req.user === user) {
            next();
        }
        else {
            return res.status(401).json({
                message: "Unauthorized access, could not verify token."
            });
        };

    } catch (error) {
        console.log(error);
        return res.staus(500).json({
            message: "Internal Server Error"
        })
    }
}


module.exports = { checkUserAuthentication };