const User = require("../models/Users");
const sendMail = require("../helper/sendMail");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not found" });

    const { passwordReset } = user.createChangePasswordToken();
    await user.save();


    const resetPasswordURL = `http://localhost:5173/reset-password?token=${passwordReset}`;

    const mailOptions = {
      from: {
        name: "Vaccine",
        address: "Vaccine@gmail.com",
      },
      to: user.email,
      subject: "Khôi phục mật khẩu",
      html: `
        <p>Bạn có thể đặt lại mật khẩu bằng cách nhấp vào nút bên dưới:</p>
        <a href="${resetPasswordURL}">
          <button style="padding: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Đặt lại mật khẩu
          </button>
        </a>
      `,
    };
    sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { forgotPassword };