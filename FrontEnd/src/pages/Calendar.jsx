import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVaccinePlan } from "../redux/vaccinePlanSlice";

const Calendar = () => {
  const dispatch = useDispatch();
  const vaccinePlan = useSelector((state) => state.vaccinePlan.vaccinePlan);
  console.log(vaccinePlan);
  useEffect(() => {
    dispatch(getVaccinePlan());
  }, [dispatch]);

  return (
    <div>
      <div className="container pt-28">
        <br />
        <div className="card">
          <img
            src="https://img.lovepik.com/background/20211021/large/lovepik-blue-banner-background-image_500452484.jpg"
            height="200px"
            className="card-img"
            alt="..."
          />
          <div className="card-img-overlay">
            <h3>LỊCH TIÊM VẮC XIN</h3>
          </div>
        </div>
        <br />
        {/* <div className="ui form">
          <div className="field">
            <select multiple="" className="ui dropdown">
              <option value="">Select Country</option>
              <option value="AF">Afghanistan</option>
              <option value="AX">Åland Islands</option>
            </select>
          </div>
        </div> */}
        
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">TÊN VẮC XIN</th>
              <th scope="col">NGÀY TIÊM</th>
              <th scope="col">GIỜ TIÊM</th>
            </tr>
          </thead>
          <tbody>
            {vaccinePlan.length > 0 &&
              vaccinePlan.map((item) => (
                <tr key={item._id}>
                  <th scope="row">{item._id}</th>
                  <td>{item.vaccine_id?.name}</td>
                  <td>{new Date(item.date).toLocaleDateString("en-GB")}</td>
                  <td>{item.time}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Calendar;
