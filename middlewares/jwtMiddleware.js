const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
    console.log("Inside JWT Middleware");

    // 🔹 Log all headers
    console.log("Request Headers:", req.headers);

    // Extract Authorization header
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ error: "Authorization header is missing" });
    }

    // Extract token safely
    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(401).json({ error: "Invalid Authorization header format" });
    }

    const token = tokenParts[1];

    try {
        // Verify token
        const jwtResponse = jwt.verify(token, process.env.JWT_PASSWORD);
        console.log("Decoded JWT:", jwtResponse);

        req.userId = jwtResponse.userId;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Authorization failed. Please login again." });
    }
};

module.exports = jwtMiddleware;







// const jwt=require('jsonwebtoken')

// const jwtMiddleware=(req,res,next)=>{
//     console.log("inside jwt middleware");

//     const token=req.headers["authorization"].split(" ")[1]
//     console.log(token);
//     if(token){
//         //token verify
//         try{
//             const jwtResponse=jwt.verify(token,process.env.JWT_PASSWORD)
//         console.log(jwtResponse);
//         req.userId=jwtResponse.userId
//         next()
//         }
//         catch(err){
//             res.status(401).json("Authorization failed...please login")
//         }
        
//     }
//     else{
//         res.status(404).json("authorization failed...token is missing")
//     }
    


    
    
// }
// module.exports=jwtMiddleware
