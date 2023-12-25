
const Activities = () => {
  return (
    <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="row g-5 mb-5">
          <div
            className="col-lg-5 wow zoomIn"
            data-wow-delay="0.3s"
            style={{ minHeight: "400px" }}
          >
            <div className="twentytwenty-container service-item position-relative h-100 rounded overflow-hidden">
              <img
                className="position-absolute w-100 h-100"
                src="http://t5g.org.vn/uploads/images/vxcovid19.jpg"
                style={{ objectFit: "cover" }}
                alt="vccv19"
              />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="section-title mb-5">
              <h5 className="position-relative d-inline-block text-primary text-uppercase">
                Hoạt Động
              </h5>
              <h1 className="display-5 mb-0">
                Chúng tôi luôn đảm bảo những dịch vụ tốt nhất cho bệnh nhân
              </h1>
            </div>
            <div className="row g-5">
              <div
                className="col-md-6 service-item wow zoomIn"
                data-wow-delay="0.6s"
              >
                <div className="rounded-top overflow-hidden">
                  <img
                    className="img-fluid"
                    src="https://file3.qdnd.vn/data/images/0/2021/10/27/dangtrungkien/5555.jpg?dpi=150&quality=100&w=870"
                    alt="school"
                  />
                </div>
                <div className="position-relative bg-light rounded-bottom text-center p-4">
                  <h5 className="m-0">Tiêm phòng tại trường học</h5>
                </div>
              </div>
              <div
                className="col-md-6 service-item wow zoomIn"
                data-wow-delay="0.9s"
              >
                <div className="rounded-top overflow-hidden">
                  <img
                    className="img-fluid"
                    src="https://file.medinet.gov.vn/UploadImages/tytxatannhut/TI%C3%8AM%20CH%E1%BB%A6NG/17.03.23/1_24202316.jpg"
                    alt="Kid"
                  />
                </div>
                <div className="position-relative bg-light rounded-bottom text-center p-4">
                  <h5 className="m-0">Tiêm chủng cho trẻ sơ sinh</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-5 wow fadeInUp" data-wow-delay="0.1s">
          <div className="col-lg-7">
            <div className="row g-5">
              <div
                className="col-md-6 service-item wow zoomIn"
                data-wow-delay="0.3s"
              >
                <div className="rounded-top overflow-hidden">
                  <img
                    className="img-fluid"
                    src="http://www.benhvienbaichay.vn/uploads/news/611cc8fd785e9/dsc01577.jpg"
                    alt="Demo"
                  />
                </div>
                <div className="position-relative bg-light rounded-bottom text-center p-4">
                  <h5 className="m-0">Khám sàng lọc</h5>
                </div>
              </div>
              <div
                className="col-md-6 service-item wow zoomIn"
                data-wow-delay="0.6s"
              >
                <div className="rounded-top overflow-hidden">
                  <img
                    className="img-fluid"
                    src="https://medlatec.vn/ImagePath/images/20210331/20210331_tiem-vac-xin-cum-khi-mang-thai-giup-me-khoe-con-khoe-2.jpg"
                    alt="m"
                  />
                </div>
                <div className="position-relative bg-light rounded-bottom text-center p-4">
                  <h5 className="m-0">Phụ nữ mang thai</h5>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-lg-5 service-item wow zoomIn"
            data-wow-delay="0.9s"
          >
            <div className="position-relative bg-primary rounded h-100 d-flex flex-column align-items-center justify-content-center text-center p-4">
              <h3 className="text-white mb-3">Đặt Lịch Tiêm</h3>
              <p className="text-white mb-3">
                Mọi thắc mắc hay cần tư vấn hãy nhắn tin trực tiếp cho chúng tôi hoặc vui lòng liên hệ:
              </p>
              <h2 className="text-white mb-0">+012 345 6789</h2>
            </div>
          </div>
        </div>
      </div>


      <div className="container-fluid bg-offer my-5 py-5 wow fadeInUp" data-wow-delay="0.1s" >
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-7 wow zoomIn" data-wow-delay="0.6s">
                    <div className="offer-text text-center rounded p-5">
                        <h1 className="display-5 text-white">Tiết kiệm 30% cho lần đầu tiên</h1>
                        <p className="text-white mb-4">
                          Đừng bao giờ xem thường sức khỏe của bạn, hãy chuẩn bi ngay từ lúc đầu
                        </p>
                        <a href="/RegisterVaccination" className="btn btn-dark py-3 px-5 me-3">Đăng Ký Ngay</a>
                        <a href="" className="btn btn-light py-3 px-5">Xem Thêm</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  );
};

export default Activities;
