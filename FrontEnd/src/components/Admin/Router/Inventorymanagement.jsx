/* eslint-disable no-unused-vars */
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Input,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { getVaccine } from "../../../redux/vaccineSlice";
import {
  deleteStorage,
  getStorage,
  updateStorageByvaccine_id,
} from "../../../redux/storageSlice";
import "../Controller/loading.css";

const TABLE_HEAD = [
  "Tên Vắc-xin",
  "Tổng Số Lượng",
  "Nhập",
  "Đã Tiêm",
  "Ngày Tạo",
  "Ngày Sửa",
  "",
  "",
];

const Inventorymanagement = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.vaccine.isLoading);
  const storage = useSelector((state) => state.storage.storage);
  console.log(storage)
  const [searchTerm, setSearchTerm] = useState("");
   // Function để cập nhật state khi người dùng nhập từ khóa tìm kiếm
   const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Bước 2: Filter dữ liệu dựa trên từ khóa tìm kiếm
  const filteredStorage = storage?.filter((item) =>
    item.vaccine_id?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    dispatch(getStorage());
  }, [dispatch]);
  const vaccine = useSelector((state) => state.vaccine.vaccine);
  useEffect(() => {
    dispatch(getVaccine());
  }, [dispatch]);

  const handleDelete = async (id) => {
    dispatch(deleteStorage(id));
  };

  return (
    <div className="content-wrapper">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="flex">
 
        <Card className="w-full ml-2">
          <CardHeader floated={false} shadow={false} className="content-header rounded-none">
            <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="font-bold mt-7 text-2xl">
                <h1>Quản Lý Kho Vắc-xin</h1>
              </div>
              <div className="flex w-full shrink-0 gap-2 md:w-max mt-10 mr-3 items-center">
                <div className="flex items-center gap-5 w-[300px] h-[50px] border border-gray-200 rounded-lg py-3 px-5">
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
                  <input
            type="text"
            className="w-full outline-none bg-transparent"
            placeholder="Nhập từ khóa tìm kiếm..."
            value={searchTerm}
            onChange={handleSearch} // Gọi hàm khi người dùng thay đổi input
          />
                </div>
                <div className="mb-2">
                  <div className="mb-2">
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: "Thêm Số Lượng",
                          html: `<select id="vaccine" name="vaccine" class="w-full">
                            ${vaccine.map((vaccine) => {
                              return `<option value="${vaccine._id}">${vaccine.name}</option>`;
                            })}
                          </select>
                          <input type="number" id="quantity" name="quantity" class="w-full" placeholder="Số Lượng" />`,
                          showCancelButton: true,
                          confirmButtonText: "Thêm",
                          cancelButtonText: "Hủy",
                          showLoaderOnConfirm: true,
                          preConfirm: async () => {
                            const vaccine_id =
                              document.getElementById("vaccine");
                            const quantity =
                              document.getElementById("quantity");
                            const data = {
                              vaccine_id: vaccine_id.value,
                              quantity_import: quantity.value,  
                              quantity: quantity.value,
                            };
                            dispatch(updateStorageByvaccine_id(data));
                          },
                          allowOutsideClick: () => !Swal.isLoading(),
                        });
                      }}
                      className="rounded-lg font-medium bg-blue-600 border text-white px-6 py-3 mt-3"
                    >
                      Thêm Số Lượng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardBody className="container-fluid px-0 ">
            <table className="w-full min-w-max table-auto text-left">
              <thead className="bg-blue-800 text-white text-xl">
                <tr>
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
                  filteredStorage.length > 0 &&
                  filteredStorage.map(
                    (
                      {
                        vaccine_id,
                        quantity_import,
                        quantity_sold,
                        createdAt,
                        updatedAt,
                        _id,
                      },
                      index
                    ) => {
                      const isLast = index === storage.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={vaccine_id?.name}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {vaccine_id?.name || "Vaccine Đã Xóa"}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {quantity_import - quantity_sold}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {quantity_import}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {quantity_sold}
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
                              onClick={() => {
                                handleDelete(_id);
                              }}
                              className="inline-flex items-center gap-2 justify-center text-white bg-red-500 rounded-lg outline h-[50px] w-[50px]"
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

export default Inventorymanagement;
