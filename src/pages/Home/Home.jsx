import { useState } from "react";
import LeadsChart from "../../components/Charts/LeadsChart";
import "./Home.css";
import {
  FiClock,
  FiBell,
  FiBarChart2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("Week");

  const hours = Array.from({ length: 22 }, (_, index) => {
    const hour = index;
    if (hour === 0) return "12am";
    if (hour < 12) return `${hour}am`;
    if (hour === 12) return "12pm";
    return `${hour - 12}pm`;
  });

  const formatDateInput = (date) => {
    return date.toISOString().split("T")[0];
  };

  const formatMonthDay = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatDayHeader = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "numeric",
      day: "numeric",
    });
  };

  const getWeekDates = (date) => {
    const current = new Date(date);
    const day = current.getDay();
    const sunday = new Date(current);
    sunday.setDate(current.getDate() - day);

    return Array.from({ length: 7 }, (_, index) => {
      const newDate = new Date(sunday);
      newDate.setDate(sunday.getDate() + index);
      return newDate;
    });
  };

  const weekDates = getWeekDates(selectedDate);
  const startDate = weekDates[0];
  const endDate = weekDates[6];

  const today = new Date();

  const isToday = (date) => {
    return date.toDateString() === today.toDateString();
  };

  const handlePrev = () => {
    const newDate = new Date(selectedDate);

    if (view === "Month") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (view === "Week") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }

    setSelectedDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(selectedDate);

    if (view === "Month") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (view === "Week") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }

    setSelectedDate(newDate);
  };

  const handleCurrentDate = () => {
    setSelectedDate(new Date());
  };

  const calendarTitle = () => {
    if (view === "Month") {
      return selectedDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    }

    if (view === "Day") {
      return selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }

    return `${formatMonthDay(startDate)} - ${formatMonthDay(endDate)}, ${endDate.getFullYear()}`;
  };

  return (
    <div className="page">
      <div className="page-top">
        <button className="green-btn">Filter</button>

        <input
          type="date"
          className="date-picker"
          value={formatDateInput(selectedDate)}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
        />
      </div>

      <LeadsChart />

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

      <div className="calendar-card">
        <div className="calendar-top">
          <div className="calendar-left">
            <button className="green-btn small-btn" onClick={handleCurrentDate}>
              Current Date
            </button>

            <button className="icon-btn" onClick={handlePrev}>
              <FiChevronLeft />
            </button>

            <button className="icon-btn" onClick={handleNext}>
              <FiChevronRight />
            </button>
          </div>

          <h2>{calendarTitle()}</h2>

          <div className="calendar-view-btns">
            {["Month", "Week", "Day"].map((item) => (
              <button
                key={item}
                className={view === item ? "active-view" : ""}
                onClick={() => setView(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="calendar-wrapper">
          <table className="calendar-table">
            <thead>
              <tr>
                <th></th>

                {view === "Day" ? (
                  <th className={isToday(selectedDate) ? "today-column" : ""}>
                    {formatDayHeader(selectedDate)}
                  </th>
                ) : (
                  weekDates.map((date) => (
                    <th
                      key={date.toISOString()}
                      className={isToday(date) ? "today-column" : ""}
                    >
                      {formatDayHeader(date)}
                    </th>
                  ))
                )}
              </tr>
            </thead>

            <tbody>
              {hours.map((hour, index) => (
                <tr key={index}>
                  <td className="time-cell">{hour}</td>

                  {view === "Day" ? (
                    <td className={isToday(selectedDate) ? "today-column" : ""}></td>
                  ) : (
                    weekDates.map((date) => (
                      <td
                        key={date.toISOString()}
                        className={isToday(date) ? "today-column" : ""}
                      ></td>
                    ))
                  )}
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