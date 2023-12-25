const Users = require("../models/Users");
const Post = require("../models/post");
const Comment = require("../models/Comment");
const OtherVaccine = require("../models/otherVaccine");
const PatientVaccination = require("../models/Patient_vaccination");

const statistical = async (req, res) => {
  try {
    const totalUser = await Users.find({});
    const totalPost = await Post.find({});
    const totalComment = await Comment.find({});
    const totalOtherVaccineCompleted = await OtherVaccine.find({
      status: "Đã hoàn thành",
    });
    const totalOtherVaccineNotCompleted = await PatientVaccination.find({
      status_payment: "chưa thanh toán",
    });
    res.json({
      totalUser: totalUser.length,
      totalPost: totalPost.length,
      totalComment: totalComment.length,
      totalOtherVaccineCompleted: totalOtherVaccineCompleted.length,
      totalOtherVaccineNotCompleted: totalOtherVaccineNotCompleted.length,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  statistical,
};
