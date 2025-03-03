const users=require('../Model/userModel')
const jwt=require('jsonwebtoken')




exports.userRegister=async(req,res)=>{
    console.log("dfdvdv",req.body);
    const{username,email,password,role='user'}=req.body
    
    
    // console.log(username,email,password);
    try{
        const existingUser=await users.findOne({email})
        if(existingUser){
            res.status(406).json("User already exist")
        }
        else{
            //instance of  model users to add data
            const newUser=new users({
                username,email,password,role
            })
            //to save changes in database
           await newUser.save()
           res.status(200).json(newUser)
        }
    }
    catch(err){
        res.status(401).json(err)

    }
    
    
}

exports.userLogin=async(req,res)=>{
    const {email,password}=req.body

    try{
        const existingUser=await users.findOne({email,password})
        if(existingUser){

            const token=jwt.sign({userId:existingUser._id,role: existingUser.role},process.env.JWT_PASSWORD)
            //passing as an object because we need to pass another more details with it
            res.status(200).json({user:existingUser,token})
        }
        else{
            res.status(404).json("Invalid username or password")
        }
    }
    catch(err){
        res.status(401).json(err)
        
    }
}