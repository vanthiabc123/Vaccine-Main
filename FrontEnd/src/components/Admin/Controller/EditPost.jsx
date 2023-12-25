import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "./loading.css";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import {getPostById, updatePost } from "../../../redux/postSlice";
import axios from "axios";
import ImageUploader from "quill-image-uploader";
import { imgbbAPI } from "../../../config/apiConfig";
import Sidebar from "../../Nav/Sidebar";
import { getCategoryPost } from "../../../redux/categoryPostSlice";


Quill.register("modules/imageUploader", ImageUploader);

const schema = yup.object().shape({
  author: yup.string().required("Vui lòng nhập tên tác giả."),
  title: yup.string().required("Vui lòng nhập tên tiêu đề."),
    
});

const EditPost = () => {
  const [imageUpload, setImageUpload] = useState("");
  const [description, setDescription] = useState("");
  const isLoading = useSelector((state) => state.post.isLoading);
  const categoryPost = useSelector((state) => state.categoryPost.categoryPost);
  // console.log(categoryPost)
  const posts = useSelector((state) => state.post.posts.post);
  console.log(posts)

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategoryPost());
  }, [dispatch]);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getPostById(id));
  }, [dispatch,id]);


  const handleUploadImage = async (e) => {
    setImageUpload(e.target.files[0]);
  };

  const handleUpdatePost = async (data) => {
    const { author, title, categoryPostId } = data;
    dispatch(
        updatePost({
          id,
        author,
        title,
        categoryPostId,
        image: imageUpload,
        content: description,
      })
    );
  };
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
          { align: [] },
        ],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image", "video"],
      ],
      imageUploader: {
        // imgbbAPI
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "post",
            url: imgbbAPI,
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );

  return (
    <div>
      <Sidebar />
      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h1 className="font-bold text-2xl text-center mb-6">Sửa Bài Viết</h1>
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          )}
          <form
            onSubmit={handleSubmit(handleUpdatePost)}
            className="max-w-md mx-auto"
            encType="multipart/form-data"
          >
            <div className="mb-4">
              <label htmlFor="name" className="text-sm text-gray-600">
                Tên tác giả:
              </label>
              <input
                id="name"
                type="text"
                placeholder="Hãy nhập tên tác giả"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent  focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                defaultValue={posts?.author}
                {...register("author")}
              />
              <p className="text-red-500 mt-1">{errors.author?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="text-sm text-gray-600">
                Tiêu đề:
              </label>
              <input
                type="text"
                placeholder="Hãy nhập tiêu đề"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent  focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                defaultValue={posts?.title}
                {...register("title")}
              />
              <p className="text-red-500 mt-1">{errors.title?.message}</p>
            </div>
            <div className="mb-4">
              {/* danh muc */}
              <label htmlFor="origin" className="text-sm text-gray-600">
                Danh muc
              </label>
              <select name="category" {...register("categoryPostId")}>
                {categoryPost.length > 0 &&
                  categoryPost.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="text-sm text-gray-600">
                Hình ảnh:
              </label>
              <img
                src={posts?.image}
                alt=""
                className="w-[200px] h-[100px] p-2"
              />
              <input
                {...register("image")}
                type="file"
                onChange={handleUploadImage}
              />
              <p className="text-red-500 mt-1">{errors.file?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="text-sm text-gray-600">
                Nội Dung:
              </label>

              <ReactQuill
                modules={modules}
                theme="snow"
                value={description}
                onChange={setDescription}
                defaultValue={posts?.content}
              />
              <p className="text-red-500 mt-1">{errors.description?.message}</p>
            </div>

            <button className="block w-full h-10 bg-blue-800 text-white rounded-md">
              Thêm
            </button>
            <a href="/postManagement">quay lại</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;