import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { getVaccine } from "../redux/vaccineSlice";
import { addPatient } from "../redux/patientSlice";
import Footer from "../components/post/Footer";
import { useNavigate } from "react-router-dom";
import { getCategory } from "../redux/categorySlice";
import axios from "axios";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên."),
  birthday: yup.string().required("Vui lòng nhập ngày sinh."),
  gender: yup.string().required("Vui lòng chọn giới tính."),
  address: yup.string().required("Vui lòng nhập địa chỉ."),
  guardian: yup.string().required("Vui lòng nhập tên người thân."),
  relationship_guardian: yup.string().required("Vui lòng chọn mối quan hệ."),
  phone_number: yup.string().required("Vui lòng nhập số điện thoại."),
  target_date: yup.string().required("Vui lòng chọn mong muốn."),
});

const RegisterVaccination = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [currentCity, setCurrentCity] = useState(null);
  const [currentDistrict, setCurrentDistrict] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [currentWard, setCurrentWard] = useState(null);
  const [wards, setWards] = useState([]);

  const handleRegisterVaccination = async (data) => {
    dispatch(addPatient(data));
  };
  const category = useSelector((state) => state.category.category);
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          "https://provinces.open-api.vn/api/?depth=3"
        );
        const data = await response.json();
        console.log(data);
        setLocations(data);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchLocations();
  }, []);
  const [vaccines, setVaccines] = useState([]);

  const handleOnChangeCategory = async (e) => {
    const res = await axios.get(
      `http://localhost:3000/api/v1/getVaccine?category=${e.target.value}`
    );
    setVaccines(res.data.vaccine);
  };

  const onCityChange = (cityCode) => {
    console.log("cityCode", cityCode);
    const newDistricts = locations.find(
      (city) => city.codename === cityCode
    ).districts;
    setDistricts(newDistricts);
  };
  const onCitiwaChange = (districtCode) => {
    console.log("districtCode", districtCode);
    const selectedDistrict = districts.find(
      (district) => district.codename === districtCode
    );

    if (selectedDistrict) {
      setWards(selectedDistrict.wards || []);
    } else {
      // Handle the case when selectedDistrict is undefined.
      console.error(`District with code ${districtCode} not found.`);
    }
  };

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  if (!auth) {
    navigate("/login");
    return null;
  }
  return (
    <div>
      <div className="container pt-32">
        <div className="row">
          <div className="col-8">
            <form
              className="ui form"
              onSubmit={handleSubmit(handleRegisterVaccination)}
            >
              <h5 className="">THÔNG TIN NGƯỜI TIÊM</h5>
              <div className="two fields">
                <div className="field">
                  <label>Mã số thuế(Nếu có)</label>
                  <input
                    type="text"
                    placeholder="Mã số thuế"
                    {...register("code_number")}
                  />
                </div>
                <div className="field">
                  <label>Họ và tên</label>
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    {...register("name")}
                  />
                  <p className="text-red-500 mt-1">{errors.name?.message}</p>
                </div>
              </div>
              <div className="two fields">
                <div className="field">
                  <label>Giới tính</label>
                  <select className="ui fluid dropdown" {...register("gender")}>
                    <option value="">Chọn giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                  <p className="text-red-500 mt-1">{errors.gender?.message}</p>
                </div>
                <div className="field">
                  <label>Ngày Sinh</label>
                  <input
                    type="date"
                    placeholder="Date"
                    {...register("birthday")}
                  />
                  <p className="text-red-500 mt-1">
                    {errors.birthday?.message}
                  </p>
                </div>
              </div>
              <div className="three fields">
                <div className="field">
                  <label>Tỉnh - Thành phố</label>
                  <select
                    className="ui fluid dropdown"
                    {...register("province")}
                    onChange={(e) => onCityChange(e.target.value)}
                  >
                    <option value="">Chọn tỉnh - thành phố</option>
                    {locations?.length > 0 &&
                      locations.map((province) => (
                        <option key={province.code} value={province.codename}>
                          {province.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="field">
                  <label>Quận - Huyện</label>
                  <select
                    onChange={(e) => onCitiwaChange(e.target.value)}
                    className="ui fluid dropdown"
                  >
                    <option value="">Chọn quận huyện</option>
                    {districts?.length > 0 &&
                      districts.map((district) => (
                        <option key={district.code} value={district.codename}>
                          {district.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="field">
                  <label>Phường - Xã</label>
                  <select className="ui fluid dropdown" {...register("ward")}>
                    <option value="">Chọn phường xã</option>
                    {wards?.length > 0 &&
                      wards.map((ward) => (
                        <option key={ward.code} value={ward.codename}>
                          {ward.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="field">
                <label>Địa chỉ cụ thể</label>
                <input
                  type="text"
                  placeholder="Địa chỉ cụ thể"
                  {...register("address")}
                  defaultValue={auth.address}
                />
                <p className="text-red-500 mt-1">{errors.address?.message}</p>
              </div>

              <h5 className="">THÔNG TIN LIÊN HỆ</h5>
              <div className="field">
                <label>Họ và tên người người thân</label>
                <input
                  type="text"
                  placeholder="Họ và tên"
                  {...register("guardian")}
                  defaultValue={auth.username}
                />
                <p className="text-red-500 mt-1">{errors.guardian?.message}</p>
              </div>
              <div className="two fields">
                <div className="field">
                  <label>Mối quan hệ với người tiêm</label>
                  <select
                    className="ui fluid dropdown"
                    {...register("relationship_guardian")}
                  >
                    <option value="">Chọn mối quan hệ</option>
                    <option value="Cha">Cha</option>
                    <option value="Mẹ">Mẹ</option>
                  </select>
                  <p className="text-red-500 mt-1">
                    {errors.relationship_guardian?.message}
                  </p>
                </div>
                <div className="field">
                  <label>Số điện thoại</label>
                  <input
                    type="text"
                    placeholder="Số điện thoại"
                    {...register("phone_number")}
                    defaultValue={auth.phone}
                  />
                  <p className="text-red-500 mt-1">
                    {errors.phone_number?.message}
                  </p>
                </div>
              </div>
              <h5 className="">THÔNG TIN DỊCH VỤ</h5>
              <div className="two fields">
                <div className="field">
                  <label>Category</label>
                  <select
                    className="ui fluid dropdown"
                    onChange={handleOnChangeCategory}
                  >
                    {category.map((category) => {
                      return (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                  <p className="text-red-500 mt-1">
                    {errors.vaccine_id?.message}
                  </p>
                </div>
                <div className="field">
                  <label>Tên Vắc Xin</label>
                  <select
                    className="ui fluid dropdown"
                    {...register("vaccine_id")}
                  >
                    {vaccines.map((vaccine) => {
                      return (
                        <option key={vaccine.id} value={vaccine._id}>
                          {vaccine.name}
                        </option>
                      );
                    })}
                  </select>
                  <p className="text-red-500 mt-1">
                    {errors.vaccine_id?.message}
                  </p>
                </div>
                <div className="field">
                  <label>Ngày tiêm</label>
                  <input
                    type="date"
                    placeholder="date"
                    {...register("target_date")}
                  />
                  <p className="text-red-500 mt-1">
                    {errors.target_date?.message}
                  </p>
                </div>
                <input
                  {...register("registrationForm")}
                  type="hidden"
                  value="online"
                />
              </div>
              <div className="ui buttons">
                <button className="ui button">Nhập lại</button>
                <div className="or"></div>
                <button type="submit" className="ui primary button">
                  Đăng ký
                </button>
              </div>
            </form>
            <br />
          </div>
          <div className="col-4">
            <h5 className="">CÂU HỎI THƯỜNG GẶP</h5>
            <div className="ui items">
              <div className="item">
                <a className="ui tiny image">
                  <img src="https://vnvc.vn/wp-content/uploads/2020/04/5-1.jpg" />
                </a>
                <div className="content">
                  <a className="header">
                    Đăng ký tiêm phòng cho trẻ ở đâu uy tín?
                  </a>
                  <div className="description">
                    <p>
                      Tôi có kế hoạch mang tiêm vài loại vắc-xin cho con của tôi
                      vừa tròn 3 tuổi vào năm 2024 vậy tôi nên bắt đầu tiêm
                      phòng các loại vắc xin từ lúc nào là hợp lý?
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                <a className="ui tiny image">
                  <img src="https://vnvc.vn/wp-content/uploads/2020/04/3-1.jpg" />
                </a>
                <div className="content">
                  <a className="header">
                    Sau khi tiêm vắc xin bao lâu thì được tiêm lại?
                  </a>
                  <div className="description">
                    <p>
                      Thưa bác sĩ, sau khi tiêm vắc xin bao lâu thì có thể tiêm
                      lại? Sau khi tiêm vắc xin chưa được 1 tháng (tính từ thời
                      điểm tiêm phòng) con em lỡ mắc bệnh khác thì phải làm…
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                <a className="ui tiny image">
                  <img src="https://vnvc.vn/wp-content/uploads/2022/11/sau-khi-tiem-vac-xin-bao-lau-thi-duoc-mang-thai-150x150.jpg" />
                </a>
                <div className="content">
                  <a className="header">Dại nguy hiểm thế nào?</a>
                  <div className="description">
                    <p>
                      Thưa bác sĩ, dại gây ra hậu quả gì? Con em bị chó cắn, mắc
                      dại thì có ảnh hưởng như thế nào đến sức khỏe? Mong bác sĩ
                      giải…
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterVaccination;
