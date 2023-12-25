import { useEffect } from "react";
import {
  getPatient,
  updatePatient,
  getPatientById,
} from "../../../redux/patientSlice";
import { getVaccine } from "../../../redux/vaccineSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "./loading.css";
import Sidebar from "../../Nav/Sidebar";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên"),
  gender: yup.string().required("Vui lòng nhập giới tính"),
  guardian: yup.string().required("Vui lòng nhập người giám hộ"),
  phone_number: yup.string().required("Vui lòng nhập số điện thoại"),
  address: yup.string().required("Vui lòng nhập địa chỉ"),
  birthday: yup.string().required("Vui lòng nhập ngày sinh"),
});

const EditListSold = () => {
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const { id } = useParams();
  const vaccine = useSelector((state) => state.vaccine.vaccine);
  const patient = useSelector((state) => state.patient.patient);
  const isLoading = useSelector((state) => state.patient.isLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVaccine());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPatientById(id));
  }, [dispatch, id]);

  const handleUpdate = async (data) => {
    try {
      const res = await dispatch(updatePatient({ id, data })); // Pass parameters as an object
      if (updatePatient.rejected.match(res)) {
        // Check if the action was rejected
        console.log(res.error.message); // Use 'res.error.message' to access the error message
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: res.error.message, // Use 'res.error.message' to access the error message
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Update thành công",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="container flex justify-center h-max my-10">
        <div className="h-auto w-full max-w-[60rem] p-4 shadow-xl shadow-blue-gray-900/5">
          <h1 className="font-bold text-2xl text-center mb-9">
            Update Danh Sách Tiêm
          </h1>
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          )}
          <form
            onSubmit={handleSubmit(handleUpdate)}
            className="w-full max-w-[60rem] ml-5"
          >
            <div className=" mb-4">
              <span className=" mr-[66px]">Tên trẻ: </span>
              <input
                type="text"
                placeholder="Enter your content"
                className="w-[500px] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
                {...register("name")}
                defaultValue={patient.name}
              />
              <p className="text-red-500 mt-1">{errors.name?.message}</p>
            </div>
            <div className=" mb-4">
              <span className="mr-16">Giới tính: </span>
              <input
                {...register("gender")}
                type="text"
                placeholder="Enter your content"
                className="w-[500px] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
                defaultValue={patient.gender}
              />
              <p className="text-red-500 mt-1">{errors.gender?.message}</p>
            </div>
            <div className=" mb-4">
              <span className="mr-14">Ngày sinh: </span>
              <input
                type="date"
                placeholder="Enter your content"
                className="w-[500px] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
                {...register("birthday")}
                defaultValue={patient.birthday}
              />
              <p className="text-red-500 mt-1">{errors.birthday?.message}</p>
            </div>
            <div className=" mb-4">
              <span className="mr-4">Người giám hộ: </span>
              <input
                type="text"
                placeholder="Enter your content"
                className="w-[500px] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
                {...register("guardian")}
                defaultValue={patient.guardian}
              />
              <p className="text-red-500 mt-1">{errors.guardian?.message}</p>
            </div>
            <div className=" mb-4">
              <span className="mr-12">Sđt Liên hệ: </span>
              <input
                type="text"
                placeholder="Enter your content"
                className="w-[500px] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
                {...register("phone_number")}
                defaultValue={patient.phone_number}
              />
              <p className="text-red-500 mt-1">{errors.phone_number?.message}</p>
            </div>
            <div className=" mb-4">
              <span className="mr-20">Địa chỉ: </span>
              <input
                type="text"
                placeholder="Enter your content"
                className="w-[500px] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
                {...register("address")}
                defaultValue={patient.address}
              />
              <p className="text-red-500 mt-1">{errors.address?.message}</p>
            </div>
            <div className=" mb-4">
              <span className=" mr-3">Chọn Vắc-xin:</span>
              <select
                {...register("vaccine_id")}
                defaultValue={patient.vaccine_id}
              >
                {vaccine?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className=" h-10 w-20 rounded-sm bg-slate-200"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditListSold;
