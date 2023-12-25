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
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientStatus, deletePatient } from "../../../redux/patientSlice";
import Swal from "sweetalert2";
import "../Controller/loading.css";


const TABLE_HEAD = [
  "",
  "Tên Trẻ",
  "Giới Tính",
  "Ngày Sinh",
  "Người Giám Hộ",
  "SĐT Liên Hệ",
  "Vắc-xin",
  "Ho",
  "Sốt",
  "Nôn Mửa",
  "Khó Thở",
  "Co Giật",
  "Ngày Tạo",
  "Ngày Sửa",
  "",
];

const InformationSelled = () => {
  const dispatch = useDispatch();

  const patient = useSelector((state) => state.patient.patient);
  const isLoading = useSelector((state) => state.patient.isLoading);
  const [searchTerm, setSearchTerm] = useState("");

  // Hàm để cập nhật từ khóa tìm kiếm khi người dùng nhập vào input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  useEffect(() => {
    dispatch(getPatientStatus());
  }, [dispatch]);

  const handleDelete = (id) => {
    try {
      dispatch(deletePatient(id));
      Swal.fire({
        icon: "success",
        title: "Xóa thành công",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      dispatch(deletePatient.rejected(error));
    }
  };
  return (
    <div className="content-wrapper">
      {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        )}
      <div>
        
        <Card className="ml-2 w-full">
          <CardHeader floated={false} shadow={false} className="content-header rounded-none">
            <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="font-bold mt-7 text-2xl ml-6">
                <h1>Quản Lý Thông Tin Sau Tiêm</h1>
              </div>
              <div className="flex w-full shrink-0 gap-2 md:w-max mt-10 mr-3">
                <div className=" mb-2 h-14">
                  <Link>
                    <Button
                      className="flex items-center gap-1 rounded-md h-10 bg-blue-500 w-[130px] hover:bg-blue-600"
                      size="sm"
                    >
                      <PlusIcon className="h-7 w-7" />
                      Thêm Mới
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex shrink-0 gap-2 mb-4">
              <span className="w-[145px] mt-3">Chọn loại vắc-xin:</span>
              <div className="flex items-center gap-5 w-[400px] h-[40px] border border-gray-200 rounded-lg py-3 px-5">
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
            </div>
          </CardHeader>
          <CardBody className="container-fluid px-0 overflow-x-scroll ">
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
                { patient.length > 0 &&
          patient
            .filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            ).map(
                    (
                      {
                        _id,
                        name,
                        gender,
                        birthday,
                        guardian,
                        phone_number,
                        vaccine_id,
                        cough,
                        fever,
                        spew,
                        breath_heavily,
                        convulsions,
                        createdAt,
                        updatedAt,
                      },
                      index
                    ) => {
                      const isLast = index === patient.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={name}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {_id}
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
                              {phone_number}
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
                              {cough === 0 ? "Không" : "Có"}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {fever === 0 ? "Không" : "Có"}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {spew === 0 ? "Không" : "Có"}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {breath_heavily === 0 ? "Không" : "Có"}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {convulsions === 0 ? "Không" : "Có"}
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
                            <Link to={`/updateinfo/${_id}`}>
                              <Button className="inline-flex items-center gap-2 justify-center px-8 py-4 text-white bg-blue-500 rounded-lg h-[50px] w-[50px] mr-2">
                                <span>
                                  <PencilSquareIcon className="h-4 w-4" />
                                </span>
                              </Button>
                            </Link>
                            <Button
                              onClick={() => handleDelete(_id)}
                              className="inline-flex items-center gap-2 justify-center px-8 py-4 text-white bg-red-500 outline rounded-lg h-[50px] w-[50px]"
                            >
                              <span>
                                <TrashIcon className="h-4 w-4" />
                              </span>
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

export default InformationSelled;
