// controllers/purchaseController.js
const Purchase = require('../Model/Purchase');
const courses = require('../Model/courseModel');

// Get purchased courses for a student
exports.getPurchasedCoursesByStudent = async (req, res) => {
  const { studentId } = req.params;

  if (!studentId) {
    return res.status(400).json({ error: "Student ID is required" });
  }

  try {
    const purchases = await Purchase.find({ studentId }).populate("courseId");
    const purchasedCourses = purchases.map(purchase => purchase.courseId);

    res.status(200).json(purchasedCourses);
  } catch (err) {
    console.error("Error fetching purchased courses:", err);
    res.status(500).json({ error: "Failed to fetch purchased courses" });
  }
};
