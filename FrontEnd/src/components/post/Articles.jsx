import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { getPost } from "../../redux/postSlice";
import "../../index.css";

function Articles() {
  const posts = useSelector((state) => state.post.posts);
  //   console.log(posts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);
  return (
    <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-5">
            <div className="section-title mb-4">
              <h5 className="position-relative d-inline-block text-primary text-uppercase">
                Bài Viết Liên Quan
              </h5>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto">
          <Swiper
            slidesPerView={4}
            spaceBetween={10}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            {posts.length > 0 &&
              posts?.map((item) => (
                <div key={item._id}>
                  <SwiperSlide>
                    <div
                      className="max-w-sm mb-5 mx-auto wow zoomIn bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                      data-wow-delay="0.9s"
                    >
                      <Link to={`/postDetails/${item._id}`}>
                      <img
                            src={posts.image}
                            className="rounded-t-lg"
                            alt=""
                          />

                          <div className="p-3">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                              {posts.title}
                            </h5>
                            <hr className="text-primary mx-auto mt-0"></hr>
                            <p
                              className="mb-3 h-10 font-normal text-gray-700 dark:text-gray-400 overflow-hidden"
                              dangerouslySetInnerHTML={{ __html: posts.content }}
                            ></p>
                            <a
                              href="/postDetails/${post._id}"
                              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Xem thêm
                              <svg
                                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                              </svg>
                            </a>
                          </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                </div>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Articles;
