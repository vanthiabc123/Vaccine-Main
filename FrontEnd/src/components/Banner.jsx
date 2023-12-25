const Banner = () => {
  return (
    <div className="container-fluid p-0">
      <div
        id="header-carousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="w-100"
              src="https://nld.mediacdn.vn/thumb_w/684/291774122806476800/2021/9/12/tiem-vaccine-moderna-tai-ttyt-q11-t-thanh-4700-16314232578211099482574.jpg"
              alt="Image"
            />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={{ maxwidth: "900px" }}>
                <h5 className="text-white text-uppercase mb-3 animated slideInDown">
                  Hãy trân trọng sức khỏe của bạn
                </h5>
                <h1 className="display-1 text-white mb-md-4 animated zoomIn">
                  HÃY TIÊM PHÒNG VẮC-XIN NGAY HÔM NAY
                </h1>
                <a
                  href="/RegisterVaccination"
                  className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                >
                  Đăng Ký Ngay
                </a>
                <a
                  href=""
                  className="btn btn-secondary py-md-3 px-md-5 animated slideInRight"
                >
                  Liên Hệ
                </a>
              </div>
            </div>
          </div>
          <div className="carousel-item active">
            <img
              className="w-100"
              src="https://file3.qdnd.vn/data/images/0/2021/12/01/tranhoai/kham%20sang%20loc.jpg?dpi=150&quality=100&w=870"
              alt="Image"
            />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={{ maxwidth: "900px" }}>
                <h5 className="text-white text-uppercase mb-3 animated slideInDown">
                  Hãy trân trọng sức khỏe của bạn
                </h5>
                <h1 className="display-1 text-white mb-md-4 animated zoomIn">
                  CHÚNG TÔI LUÔN SẴN SÀNG PHỤC VỤ BẠN 
                </h1>
                <a
                  href="/RegisterVaccination"
                  className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                >
                  Đăng Ký Ngay
                </a>
                <a
                  href=""
                  className="btn btn-secondary py-md-3 px-md-5 animated slideInRight"
                >
                  Liên Hệ
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#header-carousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#header-carousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Banner;
