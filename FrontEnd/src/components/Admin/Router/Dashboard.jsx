import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatistical } from "../../../redux/statisticalSlice";
import Chart from "chart.js/auto"; // Import Chart.js library

const Dashboard = () => {
  const dispatch = useDispatch();
  const chartContainer = useRef(null); // Reference to the chart container
  const {
    totalUser,
    totalPost,
    totalComment,
    totalOtherVaccineCompleted,
    totalOtherVaccineNotCompleted,
  } = useSelector((state) => state.statistical.statistical);

  useEffect(() => {
    dispatch(fetchStatistical());
  }, [dispatch]);

  useEffect(() => {
    const chartData = {
      labels: [
        "Người dùng",
        "Bài viết",
        "Bình luận",
        "Đơn hoàn thành",
        "Đơn chưa thanh toán",
      ],
      datasets: [
        {
          label: "Số lượng",
          data: [
            totalUser,
            totalPost,
            totalComment,
            totalOtherVaccineCompleted,
            totalOtherVaccineNotCompleted,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    // Destroy the previous chart if it exists
    if (chartContainer.current) {
      if (chartContainer.current.chartInstance) {
        chartContainer.current.chartInstance.destroy();
      }

      // Render the new chart
      const newChartInstance = new Chart(chartContainer.current, {
        type: "bar",
        data: chartData,
        options: {
          // Add your chart options here if needed
        },
      });

      // Save the chart instance in the ref for future destruction
      chartContainer.current.chartInstance = newChartInstance;
    }
  }, [
    totalUser,
    totalPost,
    totalComment,
    totalOtherVaccineCompleted,
    totalOtherVaccineNotCompleted,
  ]);
  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Thống Kê</h1>
            </div>
           
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      <section className="content">
        <div className="container-fluid">
          {/* Small boxes (Stat box) */}
          <div className="row">
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{totalUser}</h3>
                  <p>Tổng số lượng người dùng</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag"></i>
                </div>
                <a href="#" className="small-box-footer">
                  Xem chi tiết <i className="fas fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{totalPost}</h3>
                  <p>Tổng số lượng bài viết</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars"></i>
                </div>
                <a href="#" className="small-box-footer">
                  Xem chi tiết <i className="fas fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{totalComment}</h3>
                  <p>Tổng số lượng bình luận</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add"></i>
                </div>
                <a href="#" className="small-box-footer">
                  Xem chi tiết <i className="fas fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>{totalOtherVaccineCompleted}</h3>
                  <p>Đơn hoàn thành</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph"></i>
                </div>
                <a href="#" className="small-box-footer">
                  Xem chi tiết <i className="fas fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>{totalOtherVaccineNotCompleted}</h3>
                  <p>Đơn chưa thanh toán</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph"></i>
                </div>
                <a href="#" className="small-box-footer">
                  Xem chi tiết <i className="fas fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>
            {/* ./col */}
          </div>
          {/* /.row */}
          {/* Main row */}
          
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Biểu đồ dạng cột</h3>
            </div>
            <div className="card-body">
              <canvas ref={chartContainer}></canvas>
            </div>
          </div>
        </div>
      </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;