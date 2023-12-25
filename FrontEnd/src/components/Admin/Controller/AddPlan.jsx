import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getVaccine } from "../../../redux/vaccineSlice";
import { addVaccinePlan } from "../../../redux/vaccinePlanSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./loading.css";
import "./stylee.css";
import Sidebar from "../../Nav/Sidebar";

const schema = yup.object().shape({
  date: yup.string().required("Vui lòng nhập ngày tiêm!"),
  time: yup.string().required("Vui lòng nhập giờ tiêm!"),
});

const AddPlan = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVaccine());
  }, [dispatch]);

  const vaccine = useSelector((state) => state.vaccine.vaccine);
  const isLoading = useSelector((state) => state.vaccinePlan.isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log(data);
    dispatch(addVaccinePlan(data));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="form-addPlan w-[600px] mx-auto h-max  ">
        <h1 className="text-2xl font-semibold mb-4">Thêm Kế Hoạch Tiêm</h1>
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tên Vaccine:
            </label>
            <select
              {...register("vaccine_id")}
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.tenVaccine ? "border-red-500" : "border-gray-300"
              } focus:border-blue-500 focus:outline-none text-gray-700`}
            >
              {vaccine.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ngày Tiêm:
            </label>
            <input
              type="date"
              {...register("date")}
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.ngayTiem ? "border-red-500" : "border-gray-300"
              } focus:border-blue-500 focus:outline-none text-gray-700`}
            />
            <p className="text-red-500 mt-1">{errors.date?.message}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Giờ Tiêm:
            </label>
            <input
              type="time"
              {...register("time")}
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.gioTiem ? "border-red-500" : "border-gray-300"
              } focus:border-blue-500 focus:outline-none text-gray-700`}
            />
            <p className="text-red-500 mt-1">{errors.time?.message}</p>
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Thêm
            </button>
          </div>
        </form>
        <a href="/Plan">Quay Lại</a>
      </div>
    </div>
  );
};

export default AddPlan;
