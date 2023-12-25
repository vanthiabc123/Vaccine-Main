import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Mật khẩu và xác nhận mật khẩu không khớp",
      });
      return;
    }

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/resetpassword",
        { token, password },
        headers
      );
      console.log(res);
      Swal.fire({
        icon: "success",
        title: "Đổi mật khẩu thành công",
        text: "Vui lòng đăng nhập để tiếp tục",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Đổi mật khẩu thất bại",
        footer: "<a href>Bạn đang gặp vấn đề?</a>",
      });
    }
  };

  return (
    <div className="flex items-center justify-center pt-52 pb-28 bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Đặt lại mật khẩu</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu mới</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
            placeholder="Nhập mật khẩu mới..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
            placeholder="Xác nhận mật khẩu..."
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 focus:outline-none"
        >
          Đổi mật khẩu
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
