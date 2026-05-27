import LeadsChart from "../../components/Charts/LeadsChart";
import {
  FiClock,
  FiBell,
  FiBarChart2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const Home = () => {
  const hours = [
    "12am",
    "1am",
    "2am",
    "3am",
    "4am",
    "5am",
    "6am",
    "7am",
    "8am",
    "9am",
    "10am",
    "11am",
    "12pm",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
    "7pm",
    "8pm",
    "9pm",
  ];

  return (
    <div className="page">

      {/* TOP FILTER */}

      <div className="page-top">
        <button className="green-btn">Filter</button>

        <div className="date-picker">
          2021-05-26 to 2026-05-26
        </div>
      </div>

      {/* CHART */}

      <LeadsChart />

      {/* INFO CARDS */}

      <div className="info-cards">

        <div className="info-card green-border">
          <div className="card-icon">
            <FiClock />
          </div>

          <h3>Lead Movement History</h3>

          <p>
            Lead Movement History provides end to end visibility to the
            lifecycle of a Lead from creation until closed.
          </p>
        </div>

        <div className="info-card teal-border">
          <div className="card-icon">
            <FiBell />
          </div>

          <h3>Intelligent Notifications</h3>

          <p>
            Intelligent Notifications push actionable insights and updates
            based on predefined events.
          </p>
        </div>

        <div className="info-card blue-border">
          <div className="card-icon">
            <FiBarChart2 />
          </div>

          <h3>Trends and Charts</h3>

          <p>
            Trends and Charts help teams visualize KPIs and identify patterns
            quickly.
          </p>
        </div>

      </div>

      {/* CALENDAR */}

      <div className="calendar-card">

        <div className="calendar-top">

          <div className="calendar-left">
            <button className="green-btn small-btn">
              Current Date
            </button>

            <button className="icon-btn">
              <FiChevronLeft />
            </button>

            <button className="icon-btn">
              <FiChevronRight />
            </button>
          </div>

          <h2>May 24 - 30, 2026</h2>

          <div className="calendar-view-btns">
            <button>Month</button>
            <button className="active-view">Week</button>
            <button>Day</button>
          </div>

        </div>

        <div className="calendar-wrapper">

          <table className="calendar-table">

            <thead>
              <tr>
                <th></th>
                <th>Sun 5/24</th>
                <th>Mon 5/25</th>
                <th className="today-column">Tue 5/26</th>
                <th>Wed 5/27</th>
                <th>Thu 5/28</th>
                <th>Fri 5/29</th>
                <th>Sat 5/30</th>
              </tr>
            </thead>

            <tbody>
              {hours.map((hour, index) => (
                <tr key={index}>
                  <td className="time-cell">{hour}</td>

                  <td></td>
                  <td></td>
                  <td className="today-column"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Home;