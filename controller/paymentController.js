const razorpay=require('../razorpayInstance')
const Purchase = require('../Model/Purchase');
// Create a new order
exports.createOrder = async (req, res) => {
    const { amount } = req.body;
  
    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }
  
    const options = {
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };
  
    try {
      const order = await razorpay.orders.create(options);  // Make sure `razorpay.orders` is used
      res.status(200).json({ order });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: error.message });
    }
  };
  

  exports.getKey=async(req,res)=>{
    res.status(200).json({
        key:process.env.RAZORPAY_KEY_ID
    })
  }


  // Save purchase after successful payment


exports.savePurchase = async (req, res) => {
  const { courseId, studentId, amount, paymentId } = req.body;

  if (!courseId || !studentId || !amount || !paymentId) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const purchase = new Purchase({ courseId, studentId, amount, paymentId });
    await purchase.save();
    res.status(201).json({ message: "Purchase saved successfully", purchase });
  } catch (err) {
    console.error("Error saving purchase:", err); // Detailed log
    res.status(500).json({ error: `Failed to save purchase: ${err.message}` });
  }
};

// Get course-wise purchase stats
exports.getPurchaseStats = async (req, res) => {
  try {
    const stats = await Purchase.aggregate([
      { $match: { courseId: { $exists: true } } },
      {
        $group: {
          _id: "$courseId",
          totalStudents: { $sum: 1 },
          totalRevenue: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "courses", 
          localField: "_id",
          foreignField: "_id",
          as: "courseDetails",
        },
      },
      { $unwind: { path: "$courseDetails", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          courseTitle: "$courseDetails.title",
          totalStudents: 1,
          totalRevenue: 1,
        },
      },
    ]);

    console.log("Stats:", stats); // Check if stats are generated
    res.status(200).json(stats);
  } catch (err) {
    console.error("Error fetching purchase stats:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};


