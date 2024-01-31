

const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({})
    }

    //to separate the token from bearer
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token,"SECRET");
        req.userId = decoded.userId;
        next();
    }catch(e){
        return res.status(403).json({})
    }
};

module.exports={authMiddleware}



// const  JWT_SECRET  = "SECRET"
// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(403).json({});
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);

//         req.userId = decoded.userId;

//         next();
//     } catch (err) {
//         return res.status(403).json({});
//     }
// };

// module.exports = {
//     authMiddleware
// }