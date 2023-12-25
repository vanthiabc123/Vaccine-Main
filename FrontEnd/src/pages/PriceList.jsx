import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVaccine } from "../redux/vaccineSlice";
import { getCategory } from "../redux/categorySlice";

const PriceList = () => {
  const dispatch = useDispatch();
  const vaccine = useSelector((state) => state.vaccine.vaccine);
  console.log(vaccine);
  const category = useSelector((state) => state.category.category);
  console.log(category);

  useEffect(() => {
    dispatch(getVaccine());
    dispatch(getCategory());
  }, [dispatch]);
  const getCategoryName = (categoryId) => {
    const selectedCategory = category.find((item) => item._id === categoryId);
    return selectedCategory ? selectedCategory.name : "Unknown Category";
  };
  return (
    <div className="container pt-32">
      <div
        className="title"
        style={{
          borderBottom: "3px solid #2a388f",
          color: "#2a388f",
          margin: "0 0 -2px 0",
          textTransform: "uppercase",
          paddingBottom: "4px",
          display: "inline-block",
          fontSize: "23px",
          fontWeight: "bold",
          marginBottom: "15px",
        }}
      >
        <h1 className="gt-title">
          Bảng giá tiêm chủng và các dịch vụ tiêm chủng
        </h1>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div>
            <p style={{ textAlign: "justify" }}>
              <em>
                <strong>Bảng giá tiêm chủng</strong> được niêm yết công
                khai, cam kết bình ổn giá trên toàn hệ thống, miễn phí khám và
                nhiều tiện ích.
                <br />
              </em>
            </p>
            <p className="mb-4">
              <a href="https://vnvc.vn/wp-content/uploads/2022/09/bang-gia-vnvc.jpg">
                <img
                  decoding="async"
                  className="aligncenter size-full wp-image-64908"
                  src="https://vnvc.vn/wp-content/uploads/2022/09/bang-gia-vnvc.jpg"
                  alt="bảng giá vnvc"
                  width="100%"
                  height="308"
                />
              </a>
            </p>
            <div
              style={{ width: "100%", overflow: "hidden" }}
              className="gt-info div_detail_post div_idcat_13"
            >
              <h2
                className="ftwp-heading uppercase"
                style={{ textAlign: "justify", marginBottom: "5px" }}
              >
                Bảng giá tiêm chủng
              </h2>
              <table
                className="tb01 canhresponsive h-max mb-2"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr style={{ height: "71px" }}>
                    <td
                      style={{
                        textAlign: "center",
                        height: "71px",
                        width: "3.86364%",
                        border: "solid 1px rgb(150, 150, 255)",
                      }}
                    >
                      <strong>STT</strong>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        height: "71px",
                        width: "28.3877%",
                        border: "solid 1px rgb(150, 150, 255)",
                      }}
                    >
                      <strong>Phòng bệnh</strong>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        color: "#0d66a3",
                        height: "71px",
                        width: "22.0566%",
                        backgroundColor: "#c9e5f7",
                        border: "solid 1px rgb(150, 150, 255)",
                      }}
                    >
                      <strong>Tên vắc xin</strong>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        color: "#0d66a3",
                        height: "71px",
                        width: "10.3164%",
                        backgroundColor: "#c9e5f7",
                        border: "solid 1px rgb(150, 150, 255)",
                      }}
                    >
                      <strong>Nước sản xuất</strong>
                    </td>
                    <td
                      style={{
                        color: "#ffffff",
                        textAlign: "center",
                        height: "71px",
                        width: "13.9498%",
                        backgroundColor: "#6c93bc",
                        border: "solid 1px rgb(150, 150, 255)",
                      }}
                    >
                      <strong>Giá bán</strong>
                    </td>
                    <td
                      style={{
                        color: "#ffffff",
                        textAlign: "center",
                        height: "71px",
                        width: "12.3268%",
                        backgroundColor: "#6c93bc",
                        border: "solid 1px rgb(150, 150, 255)",
                      }}
                    >
                      <strong>Độ tuổi</strong>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {vaccine.length > 0 &&
                    vaccine?.map((item, index) => (
                      <tr key={index} style={{ height: "23px" }}>
                        <td
                          style={{
                            textAlign: "center",
                            height: "23px",
                            width: "3.86364%",
                            border: "solid 1px rgb(150, 150, 255)",
                          }}
                        >
                          {index + 1}
                        </td>

                        <td
                          style={{
                            textAlign: "left",
                            height: "23px",
                            width: "28.3877%",
                            border: "solid 1px rgb(150, 150, 255)",
                            padding: "4px",
                          }}
                        >
                          {item.category && getCategoryName(item.category)}
                        </td>
                        <td
                          style={{
                            color: "#0d66a3",
                            height: "23px",
                            width: "22.0566%",
                            backgroundColor: "#c9e5f7",
                            border: "solid 1px rgb(150, 150, 255)",
                            padding: "4px",
                          }}
                        >
                          {item.name}
                        </td>
                        <td
                          style={{
                            color: "#0d66a3",
                            height: "23px",
                            width: "10.3164%",
                            backgroundColor: "#c9e5f7",
                            border: "solid 1px rgb(150, 150, 255)",
                            padding: "4px",
                          }}
                        >
                          {item.origin}
                        </td>
                        <td
                          style={{
                            color: "#ffffff",
                            textAlign: "center",
                            height: "23px",
                            width: "13.9498%",
                            backgroundColor: "#6c93bc",
                            border: "solid 1px rgb(150, 150, 255)",
                          }}
                          align="right"
                        >
                          {item.price}
                        </td>
                        <td
                          style={{
                            color: "#ffffff",
                            textAlign: "center",
                            height: "23px",
                            width: "12.3268%",
                            backgroundColor: "#6c93bc",
                            border: "solid 1px rgb(150, 150, 255)",
                          }}
                          align="right"
                        >
                          {item.minAge}t - {item.maxAge}t
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <ol>
                <li>
                  1. Bảng giá áp dụng trên toàn hệ thống từ ngày{" "}
                  <span style={{ color: "#ff0000" }}>
                    <strong>01/12/2023 đến ngày 31/12/2023.</strong>
                  </span>
                </li>
                <li>
                  <p>
                    2. Ưu đãi miễn phí đặt giữ theo yêu cầu tất cả các vắc xin
                    bằng <strong>GIÁ BÁN LẺ</strong> (tiêm trong 35 ngày).
                    Trường hợp Khách hàng tiêm sau 35 ngày sẽ mất thêm phí đặt
                    giữ là 20%.
                  </p>
                </li>
                <li>
                  <p>
                    3. Giá đặt giữ vắc xin theo yêu cầu bao gồm{" "}
                    <strong>giá bán lẻ + 20% phí đặt giữ</strong> theo yêu cầu
                    (Phí đặt giữ bao gồm phí vận chuyển, phí luân chuyển, phí
                    bảo quản vắc xin an toàn trong kho lạnh quốc tế GSP, phí
                    chống trượt giá…)
                  </p>
                </li>
                <li>
                  <p>
                    4. Mọi thông tin, thắc mắc vui lòng liên hệ hotline
                    028.7102.6595 hoặc đến trực tiếp các trung tâm tiêm chủng
                    trên cả nước để được tư vấn thêm về bảng giá tiêm ngừa
                    vaccine.
                  </p>
                </li>
              </ol>
              <p>
                <em>
                  (*) Để kiểm tra tình trạng vắc xin, xin vui lòng liên hệ
                  Hotline 028 7102 6595.
                </em>
              </p>
              <h2
                className="ftwp-heading text-lg uppercase mt-2"
                style={{ textAlign: "justify" }}
              >
                Các dịch vụ tiêm chủng
              </h2>
              <p className="text-lg" style={{ textAlign: "justify" }}>
                VNVC mang đến cho Quý khách hàng nhiều dịch vụ tiêm chủng linh
                hoạt:
              </p>
              <ul>
                <li style={{ textAlign: "justify" }}>
                  - Tiêm lẻ tất cả các loại vắc xin.
                </li>
                <li style={{ textAlign: "justify" }}>
                  - Gói vắc xin theo độ tuổi: Gói vắc xin cho trẻ dưới 24 tháng,
                  trẻ tiền học đường, trẻ vị thành niên và thanh niên, phụ nữ
                  chuẩn bị mang thai, người trưởng thành…
                </li>
                <li style={{ textAlign: "justify" }}>
                  - Gói vắc xin cá thể hóa: Khách hàng có thể linh động lựa chọn
                  vắc xin thiết kế thành các gói riêng biệt tùy theo nhu cầu, độ
                  tuổi và khả năng chi trả.
                </li>
                <li style={{ textAlign: "justify" }}>
                  - Đặt giữ vắc xin theo yêu cầu với nhiều ưu đãi.
                </li>
                <li style={{ textAlign: "justify" }}>
                  - Tiêm chủng lưu động, theo yêu cầu đối với các nhóm Khách
                  hàng, cơ quan, doanh nghiệp.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceList;
