import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Button,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteVaccinePlan,
  getVaccinePlan,
  updateVaccinePlan,
} from "../../../redux/vaccinePlanSlice";
import { getVaccine } from "../../../redux/vaccineSlice";
import "../Controller/loading.css";
import { Link } from "react-router-dom";


const TABLE_HEAD = [
  "Tên Vắc-xin",
  "Ngày Tiêm",
  "Giờ Tiêm",
  "Ngày Tạo",
  "Ngày Sửa",
  "",
];

const Plan = () => {
  const vaccinePlan = useSelector((state) => state.vaccinePlan.vaccinePlan);
  const vaccine = useSelector((state) => state.vaccine.vaccine);
  const isLoading = useSelector((state) => state.vaccine.isLoading);
  const dispatch = useDispatch();


  
 // Tạo state để lưu từ khóa tìm kiếm
 const [searchTerm, setSearchTerm] = useState("");

 // Hàm để cập nhật từ khóa tìm kiếm khi người dùng nhập vào input
 const handleSearch = (e) => {
   setSearchTerm(e.target.value);
 };

  useEffect(() => {
    dispatch(getVaccinePlan());
    dispatch(getVaccine());
  }, [dispatch]);
  const handleDelete = (id) => {
    dispatch(deleteVaccinePlan(id));
  };
  
  return (
    <div className="content-wrapper">
      {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        )}
      <div className="flex h-[calc(104vh-2rem)]">

        <Card className="ml-2 w-full">
          <CardHeader floated={false} shadow={false} className="content-header rounded-none">
            <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="font-bold mt-7 text-2xl ml-6">
                <h1>Quản Lý Kế Hoạch Tiêm Chủng</h1>
              </div>
              <div className="flex w-full shrink-0 gap-2 md:w-max mt-10 mr-3">
                <div className="flex items-center gap-5 w-[350px] h-[40px] border border-gray-200 rounded-lg py-3 px-5">
                <input
            type="text"
            className="w-full outline-none bg-transparent"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={handleSearch}
          />
                  <span className="flex-shrink-0 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </span>
                </div>
                <div className=" mb-2 h-14">
                  <Link to="/addplan">
                    <Button className="flex items-center gap-1 rounded-md h-11 bg-blue-500 w-29 hover:bg-blue-600 text-md">
                      <PlusIcon className="h-7 w-7 " />
                      Thêm
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardBody className="container-fluid px-0  ">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr className=" bg-blue-800 text-white">
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                { vaccinePlan.length > 0 &&
          vaccinePlan
            .filter((item) =>
              item.vaccine_id?.name.toLowerCase().includes(searchTerm.toLowerCase())
            ).map(
                    (
                      { _id, vaccine_id, date, time, createdAt, updatedAt },
                      index
                    ) => {
                      const isLast = index === vaccinePlan.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={_id}>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold"
                              >
                                {vaccine_id?.name}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {new Date(date).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {time}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {new Date(createdAt).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {new Date(updatedAt).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Button
                              onClick={() => {
                                Swal.fire({
                                  title: "Sửa Đổi Vaccin",
                                  html: `
                                <select id="vaccine" name="vaccine" class="swal2-input">
                                ${vaccine.map((vaccine) => {
                                  return `<option key=${vaccine._id} value="${vaccine._id}">${vaccine.name}</option>`;
                                })}
          
                                </select>
                                  <br />
                                  Ngày Tiêm:<input
                                    id="date"
                                    class="swal2-input"
                                    placeholder="Ngày sinh"
                                    type="date"
                                  >
                                  <br />
                                  Giờ Tiêm:<input
                                    id="time"
                                    class="swal2-input"
                                    placeholder="Ngày sinh"
                                    type="time"
                                  >
                                `,
                                  showCancelButton: true,
                                  confirmButtonText: "Thay đổi",
                                  cancelButtonText: "Hủy",
                                  preConfirm: () => {
                                    const vaccine =
                                      document.getElementById("vaccine").value;
                                    const date =
                                      document.getElementById("date").value;
                                    const time =
                                      document.getElementById("time").value;

                                    const data = {
                                      id: _id,
                                      vaccine_id: vaccine,
                                      date: date,
                                      time: time,
                                    };
                                    dispatch(updateVaccinePlan(data));
                                  },
                                });
                              }}
                              className="inline-flex items-center gap-2 justify-center px-8 py-4 text-white bg-blue-500 rounded-lg h-[50px] w-[50px] mr-2"
                            >
                              <span>
                                <PencilSquareIcon className="h-4 w-4" />
                              </span>
                              <span>Sửa</span>
                            </Button>
                            <Button
                              onClick={() => handleDelete(_id)}
                              className="inline-flex items-center gap-2 justify-center px-8 py-4 text-white bg-red-500 rounded-lg h-[50px] w-[50px]"
                            >
                              <span>
                                <TrashIcon className="h-4 w-4" />
                              </span>
                              <span>Xóa</span>
                            </Button>
                          </td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Plan;
