/* eslint-disable no-unused-vars */
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getVaccineById, updateVaccine } from "../../../redux/vaccineSlice";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./loading.css";
import Sidebar from "../../Nav/Sidebar";
import ReactQuill from "react-quill";


const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên"),
  minAge: yup.string().required("Vui lòng nhập tuổi nhỏ nhất"),
  maxAge: yup.string().required("Vui lòng nhập tuổi lớn nhất"),
  dosage: yup.string().required("Vui lòng nhập liều lượng"),
  origin: yup.string().required("Vui lòng nhập Quốc gia sản xuất"),
});
const EditVaccin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const headers = {
    "Content-Type": "application/json",
    token: `Bearer ${token}`,
  };
  const vaccine = useSelector((state) => state.vaccine.vaccine);
  const isLoading = useSelector((state) => state.vaccine.isLoading);

  const { id } = useParams();
  const [imageUpload, setImageUpload] = useState("");

  useEffect(() => {
    dispatch(getVaccineById(id));
  }, [dispatch, id]);
  const handleSelectImage = async (e) => {
    setImageUpload(e.target.files[0]);
  };
  const handleEditVaccine = (data) => {
    const { name, minAge, maxAge, dosage, origin, description } = data;
    dispatch(
      updateVaccine({
        id,
        name,
        minAge,
        maxAge,
        dosage,
        origin,
        description,
        image: imageUpload ? imageUpload : vaccine.image,
      })
    );
  };
  return (
    <div className=" flex h-[100vh]">
      <Sidebar />
      <div className="container flex justify-center overflow-y-scroll p-4">
        <div className="h-max w-full max-w-[60rem] p-4 shadow-xl shadow-blue-gray-900/5">
          <h1 className="font-bold text-2xl text-center mb-9">
            Cập nhật bài viết
          </h1>
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          )}
          <form
            onSubmit={handleSubmit(handleEditVaccine)}
            className="w-full max-w-[60rem]  "
            encType="multipart/form-data"
          >
            <div className="mb-4">
              <label htmlFor="name" className="text-lg text-gray-600">
                Tên sản phẩm:
              </label>
              <input
                name="name"
                type="text"
                placeholder="Hãy nhập tên sản phẩm"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent  focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                defaultValue={vaccine?.name}
                {...register("name")}
              />
              <p className="text-red-500 mt-1">{errors.name?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="text-lg text-gray-600">
                Tuổi nhỏ nhất:
              </label>
              <input
                name="min_age"
                type="text"
                placeholder=""
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent  focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                defaultValue={vaccine?.minAge}
                {...register("minAge")}
              />
              <p className="text-red-500 mt-1">{errors.minAge?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="text-lg text-gray-600">
                Tuổi lớn nhất:
              </label>
              <input
                name="max_age"
                type="text"
                placeholder="Enter your content"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent  focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                defaultValue={vaccine?.maxAge}
                {...register("maxAge")}
              />
              <p className="text-red-500 mt-1">{errors.maxAge?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="text-lg text-gray-600">
                Liều lượng:
              </label>
              <input
                name="dosage"
                type="text"
                placeholder="Enter your content"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent  focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                defaultValue={vaccine?.dosage}
                {...register("dosage")}
              />
              <p className="text-red-500 mt-1">{errors.dosage?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="text-lg text-gray-600">
                Nguồn gốc:
              </label>
              <input
                name="origin"
                type="text"
                placeholder="Enter your content"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent  focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                defaultValue={vaccine?.origin}
                {...register("origin")}
              />
              <p className="text-red-500 mt-1">{errors.origin?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="text-lg text-gray-600">
                Hình ảnh:
              </label>
              <img
                src={vaccine?.image}
                alt=""
                className="w-[200px] h-[100px] p-2"
              />
              <input
                type="file"
                {...register("image")}
                onChange={handleSelectImage}
              />
              <p className="text-red-500 mt-1">{errors.file?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="text-lg text-gray-600">
                Chú thích:
              </label>


              <ReactQuill
                className="h-[130px] pb-10"
                theme="snow"
                id="content"
                placeholder=""
                {...register("description")}
                defaultValue={vaccine.description}
              />
              <p className="text-red-500 mt-1">{errors.description?.message}</p> 
            </div>
            <button
              className=" h-10 w-20 rounded-sm bg-slate-200"
              type="submit"
            >
              Cập nhật
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditVaccin;
