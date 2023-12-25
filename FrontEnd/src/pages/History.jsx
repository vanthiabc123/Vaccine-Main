import { useDispatch, useSelector } from "react-redux";
import { getPatient } from "../redux/patientSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.currentUser);
  const patient = useSelector((state) => state.patient.patient);
  const [searchQuery, setSearchQuery] = useState("");
  console.log(patient);
  useEffect(() => {
    dispatch(getPatient());
  }, [dispatch]);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  if (!auth) {
    navigate("/login");
    return null;
  }
  // Filter patients based on the search query
  const filteredPatients = patient.filter((item) =>
    item.phone_number.includes(searchQuery)
  );
  return (
    <div>
      <div className="container pt-28">
        <br />
        <div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Mời nhập số điện thoại để tìm kiếm"
              className="form-control w-[500px] mt-2"
              id="usr"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <table className="ui blue table">
          <thead>
            <tr>
              <th>MÃ SỐ TRẺ</th>
              <th>TÊN TRẺ</th>
              <th>GIỚI TÍNH</th>
              <th>NGÀY SINH</th>
              <th>NGƯỜI DÁM HỘ</th>
              <th>QUAN HỆ </th>
              <th>LIÊN HỆ</th>
              <th>ĐỊA CHỈ</th>
              <th>VẮC XIN ĐĂNG KÍ </th>
              <th>TRẠNG THÁI</th>
              <th>NGÀY ĐĂNG KÍ </th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 &&
              filteredPatients.map((item) => (
                <tr key={item._id}>
                  <td>{item.code_number}</td>
                  <td>{item?.name}</td>
                  <td>{item.gender}</td>
                  <td>{new Date(item.birthday).toLocaleDateString("en-GB")}</td>
                  <td>{item.guardian}</td>
                  <td>{item?.relationship_guardian}</td>
                  <td>{item.phone_number}</td>
                  <td>{item.address}</td>
                  <td>{item.vaccine_id?.name}</td>
                  <td>{item.status}</td>
                  <td>
                    {new Date(item.createdAt).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
