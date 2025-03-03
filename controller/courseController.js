const courses = require('../Model/courseModel');

exports.addCourseController = async (req, res) => {
    console.log('Inside add course controller');
    
    // Destructuring from body and files
    const { title, description, price, videoTitle } = req.body;
    const { thumbImage, video, previewVideo } = req.files;

    // console.log(title, description, price, videoTitle, thumbImage, video, previewVideo);

    try {
        // Check if the course already exists
        const existingCourse = await courses.findOne({ title });
        if (existingCourse) {
            return res.status(406).json("Course already exists, add another one");
        }

        // Extract filenames from the uploaded files (first file in the array)
        const thumbImageFilename = thumbImage ? thumbImage[0].filename : null;
        const videoFilename = video ? video[0].filename : null;
        const previewVideoFilename = previewVideo ? previewVideo[0].filename : null;

        // Create a new course object with extracted filenames
        const newCourse = new courses({
            title,
            description,
            price,
            videoTitle,
            thumbImage: thumbImageFilename,
            video: videoFilename,
            previewVideo: previewVideoFilename
        });

        // Save the new course to the database
        await newCourse.save();
        res.status(200).json(newCourse);
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: err.message });
    }
};

exports.getAllCourses=async(req,res)=>{
    try{
        const allCourses=await courses.find()
        res.status(200).json(allCourses)

    }
    catch(err){
        res.status(401).json(err)
    }
}


// Get a course by ID
exports.getCourseById = async (req, res) => {
    try {
      const course = await courses.findById(req.params.id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.status(200).json(course);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  };
  

  exports.updateCourseController = async (req, res) => {
    const { id } = req.params;
    const { title, description, price, videoTitle } = req.body;
    
    // destructure req.files (provide default empty object)
    const { thumbImage, video, previewVideo } = req.files || {};
  
    try {
      const existingCourse = await courses.findById(id);
      if (!existingCourse) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      // Update fields only if provided
      existingCourse.title = title || existingCourse.title;
      existingCourse.description = description || existingCourse.description;
      existingCourse.price = price || existingCourse.price;
      existingCourse.videoTitle = videoTitle || existingCourse.videoTitle;
  
      if (thumbImage?.[0]) existingCourse.thumbImage = thumbImage[0].filename;
      if (video?.[0]) existingCourse.video = video[0].filename;
      if (previewVideo?.[0]) existingCourse.previewVideo = previewVideo[0].filename;
  
      await existingCourse.save();
      res.status(200).json(existingCourse);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  
  exports.deleteCourseController = async (req, res) => {
    const { id } = req.params;
  
    try {
      const course = await courses.findByIdAndDelete(id);
  
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      res.status(200).json({ message: "Course deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: "Invalid Course ID" });
    }
  };
  
  
  