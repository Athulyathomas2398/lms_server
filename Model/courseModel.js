const mongoose=require('mongoose')

const courseSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    videoTitle:{
        type:String,
        required:true
    },
    thumbImage:{
        type:String,
        required:true
    },
    video:{
        type:String,
        required:true
    },
    previewVideo:{
        type:String,
        required:false
    },

})
const courses=mongoose.model("courses",courseSchema)
module.exports=courses