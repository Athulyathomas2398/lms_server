const express=require('express')

const router=new express.Router()
const userController=require('../controller/userController')
const courseController=require('../controller/courseController')
const paymentController=require('../controller/paymentController')
const multerMiddleware=require('../middlewares/multerMiddleware')
const purchaseController=require('../controller/purchaseController')
const jwtMiddleware=require('../middlewares/jwtMiddleware')
//create route for user registration

router.post('/register',userController.userRegister)
module.exports=router

//route for user login

router.post('/login',userController.userLogin)

// Route for adding course with thumbnail, video, and previewVideo
router.post('/createcourse',jwtMiddleware, 
    multerMiddleware.fields([
      { name: 'thumbImage', maxCount: 1 }, 
      { name: 'video', maxCount: 1 },
      { name: 'previewVideo', maxCount: 1 }
    ]), 
    courseController.addCourseController);

//route for get all courses
router.get('/getallcourses',jwtMiddleware,courseController.getAllCourses)    

// Route to get a course by ID
router.get('/getcourse/:id', courseController.getCourseById);

// Update course by ID
router.put('/updatecourse/:id',jwtMiddleware,
  multerMiddleware.fields([
    { name: 'thumbImage', maxCount: 1 },
    { name: 'video', maxCount: 1 },
    { name: 'previewVideo', maxCount: 1 }
  ]),
  courseController.updateCourseController
);

// Delete course by ID
router.delete('/deletecourse/:id',jwtMiddleware, courseController.deleteCourseController);
//route for payment 
router.post('/create-order',paymentController.createOrder)
//route for getKey
router.get('/get-key',paymentController.getKey)

// Save purchase after successful payment
router.post('/save-purchase', paymentController.savePurchase);

// Get purchase stats for instructor dashboard
router.get('/purchase-stats', paymentController.getPurchaseStats);

//purchased course
router.get('/purchased-courses/:studentId', purchaseController.getPurchasedCoursesByStudent);





