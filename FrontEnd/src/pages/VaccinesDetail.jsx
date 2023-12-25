import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVaccineById } from "../redux/vaccineSlice";
import {
  addComment,
  deleteCommentByAuthor,
  getCommentByVaccineId,
} from "../redux/commentSlice";
import { addToCart } from "../redux/cartSlice";
import Footer from "../components/post/Footer";
function VaccinesDetail() {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const vaccine = useSelector((state) => state.vaccine.vaccine);
  const auth = useSelector((state) => state.auth);
  const userId = auth.currentUser?._id;

  const commentList = useSelector((state) => state.comment.comment);
  const navigate = useNavigate();
  const handleAddComment = (comment) => {
    if (!auth.currentUser) {
      navigate("/login");
      return null;
    }else{
    const data = {
      user_id: userId,
      vaccine_id: id,
      content: comment,
    };
    dispatch(addComment(data));
    }
}
  const handleDeleteComment = (id) => {
    dispatch(deleteCommentByAuthor(id));
  };
  useEffect(() => {
    dispatch(getVaccineById(id));
    dispatch(getCommentByVaccineId(id));
  }, [id, dispatch, commentList.length]);


  const handleAddToCart = (id) => {
    if (!auth.currentUser) {

      navigate("/login");
      return;
    }
    const data = {
      user_id: userId,
      vaccine_id: id,
      image: vaccine.image,
      name: vaccine.name,
      price: vaccine.price,
      description: vaccine.description,
    };
    dispatch(addToCart(data));
    navigate("/cart");
  
}
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return (
    <div>
      <div className="pt-28">
        <div
          style={{ margin: "50px" }}
          className="bg-white p-4 shadow-md rounded-lg mb-4"
        >
          <h1 className="text-2xl mb-4 font-bold">
          <h1 className="text-2xl mb-4 font-bold">
  {vaccine.name} - <span className="green-text">{VND.format(vaccine.price)}</span>
</h1>

          </h1>
          <img
            src={vaccine.image}
            alt="Vắc xin VERORAB"
            className="max-w-[500px] h-auto"
          />
          <button
            onClick={() => handleAddToCart(vaccine._id)}
            className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
          >
            ĐẶT MUA GÓI TIÊM
          </button>
        </div>

        <div
          style={{ margin: "50px" }}
          className="bg-blue-100 p-4 shadow-md rounded-lg"
        >
          <div className="mb-6">
            <strong className="text-2xl font-semibold">
              1. Thông tin vắc xin
            </strong>
            <div
              dangerouslySetInnerHTML={{ __html: vaccine.description }}
            ></div>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Nguồn gốc</h2>
            <p className="text-lg mt-2">{vaccine.origin}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-md shadow-md">
        <form>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-600 font-medium"
            >
              Bình Luận:
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Nhập bình luận của bạn..."
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleAddComment(comment);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Gửi 
            </button>
          </div>
        </form>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md space-y-4">
        {commentList.length > 0 &&
          commentList?.map((item, index) => {
            return (
              <div
                key={item._id}
                className="bg-gray-100 p-4 rounded-lg shadow-md space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.user_id?.username}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-800">{item.content}</p>
                {userId === item?.user_id?._id && (
                  <button
                    onClick={() => handleDeleteComment(item._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Xóa
                  </button>
                )}
              </div>
            );
          })}
      </div>
      
    </div>
  );
}

export default VaccinesDetail;
