
require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router=require('./Routes/router')
require('./db/connection')


//instance
const lmsServer=express()
lmsServer.use(cors())
// lmsServer.use(cors({
//     origin: "http://localhost:5174",  // Allow frontend requests
//     methods: "GET, POST, PUT, DELETE",
//     allowedHeaders: "Content-Type, Authorization", // Allow sending Authorization header
//     credentials: true // Allow cookies and authentication headers
// }));



//json middlware to convert json data from client to js object for node
lmsServer.use(express.json())
lmsServer.use(router)
lmsServer.use('/uploads/thumbnails',express.static('./uploads/thumbnails'))
lmsServer.use('/uploads/previewVideos',express.static('./uploads/previewVideos'))
lmsServer.use('/uploads/videos',express.static('./uploads/videos'))



//set a port
const PORT=3000 || process.env.PORT

//to run server in this port use
lmsServer.listen(PORT,()=>{
    console.log(`Server started at port ${PORT} `);
    
})

lmsServer.get('/',(req,res)=>{
    res.status(200).send(`request recieved at server 3000`)
})

