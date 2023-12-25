/* eslint-disable no-unused-vars */
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  getRegisterVaccine,
} from "../../../redux/registerVaccineSlice";
import { addPatient } from "../../../redux/patientSlice";
import "../Controller/loading.css";

const TABLE_HEAD = [
  "Mã Số Trẻ",
  "Tên Trẻ",
  "Giới Tính",
  "Ngày Sinh",
  "Người Giám Hộ",
  "Mối Quan Hệ",
  "SĐT Liên Hệ",
  "Địa Chỉ",
  "Ngày Mong Muốn",
  "Vắc-xin",
  "Trạng Thái",
  "Ngày Tạo",
  "Ngày Sửa",
  "",
];

const InjectionRegistration = () => {
  // const [registerVaccination, setRegisterVaccination] = useState([]);
  const registerVaccination = useSelector(
    (state) => state.registerVaccine.registerVaccine
  );
  const [loading, setLoading] = useState(false);
  const isLoading = useSelector((state) => state.registerVaccine.isLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRegisterVaccine(getRegisterVaccine.fulfilled));
  }, [dispatch]);

  const handleUpdate = async (id, data) => {
    console.log(data);
    const { value: status } = await Swal.fire({
      title: "Chọn Trạng Thái",
      input: "select",
      inputOptions: {
        "Chưa duyệt": "Chưa duyệt",
        "Đã duyệt": "Đã duyệt",
        "Đã tiêm": "Đã tiêm",
      },
      inputPlaceholder: "Chọn Trạng Thái",
      showCancelButton: true,
    });

    if (status) {
      const res = await axios.put(
        `http://localhost:3000/api/v1/updateVaccination/${id}`,
        {
          status,
        }
      );
      dispatch(addPatient(data));
    }
  };
  return (
    <div className="content-wrapper">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="flex h-[calc(104vh-2rem)]">
    
        <Card className="ml-2">
          <CardHeader floated={false} shadow={false} className="content-header rounded-none">
            <div className="mb-12 flex flex-col h-[10vh] justify-between gap-8 md:flex-row md:items-center">
              <div className="font-bold mt-7 text-2xl">
                <h1>Quản Lý Đăng Ký Tiêm</h1>
              </div>
              <div className="flex items-center gap-5 w-[300px] border border-gray-200 rounded-lg py-3 px-5">
                <input
                  type="text"
                  className="w-full outline-none bg-transparent"
                  placeholder="Enter your content..."
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
            </div>
          </CardHeader>
          <CardBody className="container-fluid pl-0  w-[176vh] ">
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
                {!loading &&
                  registerVaccination.map(
                    (
                      {
                        _id,
                        vaccine_id,
                        user_id,
                        relationship_guardian,
                        status,
                        code_number,
                        phone_number,
                        gender,
                        name,
                        address,
                        birthday,
                        target_date,
                        createdAt,
                        updatedAt,
                        guardian,
                      },
                      index
                    ) => {
                      const isLast = index === registerVaccination.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={index}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {code_number}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {gender}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {new Date(birthday).toLocaleDateString("en-GB")}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {guardian}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {relationship_guardian}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {phone_number}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {address}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {new Date(target_date).toLocaleDateString(
                                "en-GB"
                              )}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {vaccine_id?.name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {status}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {new Date(createdAt).toLocaleDateString("en-GB")}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {new Date(updatedAt).toLocaleDateString("en-GB")}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Button
                              onClick={() =>
                                handleUpdate(_id, {
                                  vaccine_id,
                                  user_id,
                                  relationship_guardian,
                                  status,
                                  code_number,
                                  phone_number,
                                  gender,
                                  name,
                                  address,
                                  birthday,
                                  target_date,
                                  createdAt,
                                  updatedAt,
                                  guardian,
                                })
                              }
                              className="inline-flex items-center gap-2 justify-center px-8 py-4 text-white bg-blue-500 rounded-lg h-[50px] w-[200px] mr-2"
                            >
                              <span>
                                <PencilSquareIcon className="h-4 w-4" />
                              </span>
                              <span>Cập Nhật Trạng Thái</span>
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

export default InjectionRegistration;
