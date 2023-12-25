import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Button,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVaccine } from "../../../redux/vaccineSlice";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import {
  addPatient,
  getPatient,
  deletePatient,
  updatePatientStatus,
} from "../../../redux/patientSlice";
import "../Controller/loading.css";
import * as xlsx from "xlsx";
import axios from "axios";
import { getCategory } from "../../../redux/categorySlice";
const TABLE_HEAD = [
  "",
  "Tên Trẻ",
  "Giới Tính",
  "Ngày Sinh",
  "Người Giám Hộ",
  "SĐT Liên Hệ",
  "Địa Chỉ",
  "Vắc-xin",
  "Trạng Thái",
  "Ngày Tạo",
  "Ngày Sửa",
  "Hinh Thức Đăng Ký",
  "Trạng Thái Thành Toán",
  "",
  "",
];

const ListSold = () => {
  const dispatch = useDispatch();
  const vaccine = useSelector((state) => state.vaccine.vaccine);
  const { patient, isLoading } = useSelector((state) => state.patient || []);
  const tableRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState(""); // State lưu trữ từ khóa tìm kiếm
  const token = Cookies.get("token");

  // Function để cập nhật state khi người dùng nhập từ khóa tìm kiếm
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Bước 2: Filter dữ liệu dựa trên từ khóa tìm kiếm
  const filteredPatients = patient.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const exportToExcel = () => {
    // Get the table data
    const ws = xlsx.utils.table_to_sheet(tableRef.current);

    // Create a new workbook
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Sheet 1");

    // Save the file
    xlsx.writeFile(wb, "patient_data.xlsx");
  };

  useEffect(() => {
    dispatch(getPatient(getPatient.fulfilled));
    dispatch(getVaccine());
    dispatch(getCategory());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa?",
      text: "Bạn sẽ không thể hoàn tác lại điều này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePatient(id));
        Swal.fire("Đã Xóa!", "Xóa thành công.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Đã Hủy", "Xóa không thành công", "error");
      }
    });
  };

  const handleUpdataStatus = (id, vaccine_id) => (e) => {
    const data = {
      status: e.target.value,
      vaccine_id: vaccine_id._id,
    };
    dispatch(updatePatientStatus({ id, data }));
  };

  const handleUpdateStatusPayment = (id) => async (e) => {
    const data = {
      id,
      status_payment: e.target.value,
    };
    try {
      await axios.put(`http://localhost:3000/api/v1/statusPayment`, data, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      dispatch(getPatient(getPatient.fulfilled));
    } catch (error) {
      console.log(error);
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
          <CardHeader
            floated={false}
            shadow={false}
            className="content-header rounded-none"
          >
            <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="font-bold mt-7 text-2xl ml-6">
                <h1>Quản Lý Danh Sách Tiêm</h1>
              </div>
              <div className="flex w-full shrink-0 gap-2 md:w-max mt-10 mr-3">
                <div className="mb-2">
                  <Button
                    onClick={() => {
                      Swal.fire({
                        title: "Thêm Mới Danh Sách",
                        html: `
                        
                        <select id="vaccine_id" class="swal2-input">
                          ${vaccine?.map((vaccine) => {
                            return `<option value="${vaccine._id}">${vaccine.name}</option>`;
                          })}
                        </select>

                       
                          <input
                            class="swal2-input"
                            placeholder="Mã số trẻ"
                            id = "code_number"
                            name = "code_number"
                          >
                          <input
                            class="swal2-input"
                            placeholder="Họ tên trẻ"
                            id = "name"
                            name = "name"

                          >
                          <input
                            id="gender"
                            class="swal2-input"
                            placeholder="Giới tính"
                            
                          >
                          <input
                            id="birthday"
                            class="swal2-input"
                            placeholder="Ngày sinh"
                            type="date"
                          >
                          <input
                            id="address"
                            class="swal2-input"
                            placeholder="Địa chỉ"
                          >
                          <input
                            id="guardian"
                            class="swal2-input"
                            placeholder="Người đám hộ"
                          >
                          <input
                            id="phone_number"
                            class="swal2-input"
                            placeholder="Số điện thoại người đám hộ"
                          >
                          <input
                            id="registrationForm"
                            class="swal2-input"
                           type="hidden"
                           value="offline"
                          >

                        `,
                        showCancelButton: true,
                        confirmButtonText: "Thêm",
                        cancelButtonText: "Hủy",
                        preConfirm: async () => {
                          const registrationForm =
                            document.getElementById("registrationForm").value;

                          const vaccine_id =
                            document.getElementById("vaccine_id").value;
                          const code_number =
                            document.getElementById("code_number").value;
                          const name = document.getElementById("name").value;
                          const gender =
                            document.getElementById("gender").value;
                          const birthday =
                            document.getElementById("birthday").value;
                          const address =
                            document.getElementById("address").value;
                          const guardian =
                            document.getElementById("guardian").value;
                          const phone_number =
                            document.getElementById("phone_number").value;
                          const data = {
                            vaccine_id,
                            code_number,
                            name,
                            gender,
                            guardian,
                            birthday,
                            address,
                            phone_number,
                            registrationForm,
                          };
                          dispatch(addPatient(data));
                        },
                      });
                    }}
                    className="flex items-center gap-1 w-[130px] h-[50px] rounded-md bg-blue-500 hover:bg-blue-600"
                  >
                    <PlusIcon className="h-6 w-6 ml-1" />
                    Thêm Mới
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex shrink-0 gap-2 mb-3">
              <span className="w-[170px] mt-3">Mời nhập tên trẻ </span>
              <div className="flex items-center w-[300px] h-[50px] border border-gray-200 rounded-lg py-3 px-5">
                <input
                  type="text"
                  className="w-full outline-none bg-transparent"
                  placeholder="Nhập tên trẻ cần tìm..."
                  value={searchTerm}
                  onChange={handleSearch} // Gọi hàm khi người dùng thay đổi input
                />
              </div>

              <button
                onClick={exportToExcel}
                className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[50px]"
              >
                Xuất File Excel
              </button>
            </div>
          </CardHeader>
          <CardBody className="container-fluid px-0 overflow-x-scroll">
            <table
              ref={tableRef}
              className="w-full min-w-max table-auto text-left"
            >
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
                {!isLoading &&
                  filteredPatients.length > 0 &&
                  filteredPatients?.map(
                    (
                      {
                        _id,
                        name,
                        vaccine_id,
                        gender,
                        birthday,
                        guardian,
                        phone_number,
                        address,
                        registrationForm,
                        status,
                        createdAt,
                        updatedAt,
                        status_payment,
                      },
                      index
                    ) => {
                      const isLast = index === patient.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={_id}>
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
                              {name || "N/A"}
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
                              {birthday}
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
                              {address}
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
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {registrationForm}
                            </Typography>
                          </td>
                          <td>{status_payment}</td>
                          <td className={classes}>
                            <select
                              onChange={handleUpdataStatus(_id, vaccine_id)}
                            >
                              <option selected="selected">{status}</option>
                              <option value="chưa tiêm">Chưa tiêm</option>
                              <option value="Đã tiêm">Đã tiêm</option>
                              <option value="Hủy">Hủy</option>
                            </select>
                            <Link to={`/editlistsold/${_id}`}>
                              <Button className="inline-flex items-center gap-2 justify-center px-8 py-4 text-white bg-blue-500 rounded-lg h-[50px] w-[50px] mr-2">
                                <span>
                                  <PencilIcon className="h-4 w-4" />
                                </span>
                                <span>Sửa</span>
                              </Button>
                            </Link>
                            <Button
                              onClick={() => {
                                handleDelete(_id);
                              }}
                              className="inline-flex items-center gap-2 justify-center px-8 py-4 text-white bg-red-500 rounded-lg h-[50px] w-[50px]"
                            >
                              <span>
                                <TrashIcon className="h-4 w-4" />
                              </span>
                              <span>Xóa</span>
                            </Button>
                          </td>
                          <td>
                            <select onChange={handleUpdateStatusPayment(_id)}>
                              <option selected="selected">
                                {status_payment}
                              </option>
                              <option value="chưa thanh toán">
                                Chưa thanh toán
                              </option>
                              <option value="đã thanh toán">
                                Đã thanh toán
                              </option>
                            </select>
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

export default ListSold;
