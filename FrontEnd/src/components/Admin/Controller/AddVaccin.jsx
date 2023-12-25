import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "./loading.css";
import { addVaccine } from "../../../redux/vaccineSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategory } from "../../../redux/categorySlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Sidebar from "../../Nav/Sidebar";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên"),
  price: yup.string().required("Vui lòng nhập giá"),
  minAge: yup.string().required("Vui lòng nhập tuổi nhỏ nhất"),
  maxAge: yup.string().required("Vui lòng nhập tuổi lớn nhất"),
  dosage: yup.string().required("Vui lòng nhập liều lượng"),
  origin: yup.string().required("Vui lòng nhập Quốc gia sản xuất"),
  address: yup.string().required("Vui lòng nhập địa chỉ"),
});

const Addvaccin = () => {
  const [imageUpload, setImageUpload] = useState("");
  const [description, setDescription] = useState("");
  const isLoading = useSelector((state) => state.vaccine.isLoading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const category = useSelector((state) => state.category.category);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (user.role !== "admin") {
  //     navigate("/login");
  //   }
  // }, [user.role]);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const handleUploadImage = async (e) => {
    setImageUpload(e.target.files[0]);
  };

  const handleAddVaccine = async (data) => {
    const { name, minAge, maxAge, dosage, origin, address, category, price } =
      data;

    await dispatch(
      addVaccine({
        name,
        minAge,
        maxAge,
        dosage,
        origin,
        address,
        category,
        description: description,
        price,
        image: imageUpload,
      })
    );
  };

  return (
    <div className=" flex h-[100vh]">
      <Sidebar />
      <div className="container mx-auto p-4 overflow-y-scroll">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h1 className="font-bold text-2xl text-center mb-6">Thêm Vắc-xin</h1>
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          )}
          <form
            onSubmit={handleSubmit(handleAddVaccine)}
            className="max-w-md mx-auto"
            encType="multipart/form-data"
          >
            <div className="mb-4">
              <label htmlFor="name" className="text-sm text-gray-600">
                Tên sản phẩm:
              </label>
              <input
                name="name"
                type="text"
                id="name"
                placeholder="Hãy nhập tên sản phẩm"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent  focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("name")}
              />
              <p className="text-red-500 mt-1">{errors.name?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="text-sm text-gray-600">
                Giá sản phẩm:
              </label>
              <input
                name="price"
                type="text"
                id="price"
                placeholder="Hãy nhập giá sản phẩm"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent  focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("price")}
              />
              <p className="text-red-500 mt-1">{errors.price?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="minAge" className="text-sm text-gray-600">
                Tuổi nhỏ nhất:
              </label>
              <input
                name="min_age"
                type="text"
                id="minAge"
                placeholder=""
                className="w-full border rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("minAge")}
              />
              <p className="text-red-500 mt-1">{errors.minAge?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="maxAge" className="text-sm text-gray-600">
                Tuổi lớn nhất:
              </label>
              <input
                name="max_age"
                type="text"
                id="maxAge"
                placeholder=""
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent  focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("maxAge")}
              />
              <p className="text-red-500 mt-1">{errors.maxAge?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="dosage" className="text-sm text-gray-600">
                Liều lượng:
              </label>
              <input
                name="dosage"
                type="text"
                id="dosage"
                placeholder=""
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent  focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("dosage")}
              />
              <p className="text-red-500 mt-1">{errors.dosage?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="origin" className="text-sm text-gray-600">
                Nguồn gốc:
              </label>
              <input
                name="origin"
                type="text"
                id="origin"
                placeholder=""
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent  focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("origin")}
              />
              <p className="text-red-500 mt-1">{errors.origin?.message}</p>
            </div>
            <div className="mb-4">
              {/* danh muc */}
              <label htmlFor="category" className="text-sm text-gray-600">
                Danh muc
              </label>
              <select name="category" {...register("category")}>
                {category.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
               <p className="text-red-500 mt-1">{errors.category?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="text-sm text-gray-600">
                Hình ảnh:
              </label>
              <input
                {...register("image")}
                type="file"
                onChange={handleUploadImage}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="text-sm text-gray-600">
                Mô tả:
              </label>
              {/* <textarea
              name="description"
              id="description"
              className="w-full h-32 border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent resize-none  focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter description"
              {...register("description")}
            /> */}
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                modules={Addvaccin.modules}
                formats={Addvaccin.formats}
                placeholder="Write something..."
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="text-sm text-gray-600">
                Địa chỉ:
              </label>
              <input
                name="address"
                type="text"
                id="address"
                placeholder=""
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent  focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("address")}
              />
              <p className="text-red-500 mt-1">{errors.address?.message}</p>
            </div>

            <button className="block w-full h-10 bg-blue-800 text-white rounded-md">
              Thêm
            </button>
            <a href="/VaccineManagement">quay lại</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addvaccin;
