const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkUserAuthentication = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "COuld not find authorization header"
            })
        }

        const authToken = req.headers.authorization.split(' ')[1]
        console.log(authToken)
        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
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
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


module.exports = { checkUserAuthentication };