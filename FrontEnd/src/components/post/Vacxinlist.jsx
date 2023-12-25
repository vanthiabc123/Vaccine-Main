import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVaccine } from "../../redux/vaccineSlice";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import axios from "axios";

function Vacxinlist() {
  const vaccineListRef = useRef(null);
  const dispatch = useDispatch();
  const vaccine = useSelector((state) => state.vaccine.vaccine);

 
  useEffect(() => {
    dispatch(getVaccine());
  }, [dispatch]);
  
  return (
    <div
      ref={vaccineListRef}
      className="container-fluid py-5 wow fadeInUp"
      data-wow-delay="0.1s"
    >
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-5">
            <div className="section-title mb-4">
              <h5 className="position-relative d-inline-block text-primary text-uppercase">
                Danh Mục Vắc Xin 
              </h5>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto">
          <Swiper
            slidesPerView={4}
            pagination={true}
            spaceBetween={8}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            {vaccine.length > 0 &&
              vaccine?.map((item) => {
                return (
                  <SwiperSlide key={item._id}>
                    <Link to={`/vacxindetail/${item._id}`}>
                      <div
                        className="max-w-sm mb-5 mx-auto wow zoomIn bg-white dark:bg-gray-800 dark:border-gray-700"
                        data-wow-delay="0.9s"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="rounded-sm shadow-md border border-gray-200 w-[390px] h-[200px]"
                        />

                        <div className="p-4 text-lg font-normal text-center">
                          {item.name}
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Vacxinlist;
