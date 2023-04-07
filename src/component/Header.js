import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { getWeather, getWeatherIcon } from "../helper/getWeatherIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const DateContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  height: 100px;
  background: #ffffff;
  border-bottom: 0.5px solid #c1c7ff;
  .date-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 290px;
  }
`;
const DateChangeButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  svg {
    font-size: 30px;
    color: #6b7dff;
  }
`;
const DayWeek = styled.span`
  margin-right: 10px;
  font-weight: 900;
  font-size: 36px;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;
  color: #6b7dff;
`;

const MonthDate = styled.span`
  font-weight: 600;
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-top: 12px;
  color: #c1c7ff;
`;

const WeatherIcon = styled.div`
  position: absolute;
  right: 20px;
  font-size: 40px;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const TodayButton = styled.button`
  position: absolute;
  left: 20px;
`;

function formatWeekday(date) {
  const options = { weekday: "long" };
  return date.toLocaleString("en-US", options);
}
function formatMonthDay(date) {
  const options = { month: "long", day: "numeric" };
  const formattedDate = date.toLocaleString("en-US", options);

  const dayOfMonth = date.getDate();
  let suffix;
  if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) {
    suffix = "st";
  } else if (dayOfMonth === 2 || dayOfMonth === 22) {
    suffix = "nd";
  } else if (dayOfMonth === 3 || dayOfMonth === 23) {
    suffix = "rd";
  } else {
    suffix = "th";
  }

  return formattedDate + suffix;
}

export default function Header({ selectedDate, setSelectedDate }) {
  const [weather, setWeather] = useState("");

  const date = new Date(selectedDate);

  useEffect(() => {
    getWeather().then((response) => {
      setWeather(response);
    });
  }, []);

  const handlePrevDay = () => {
    setSelectedDate((prevDate) => {
      const prevDay = new Date(prevDate);
      prevDay.setDate(prevDay.getDate() - 1);
      return prevDay.toLocaleDateString();
    });
  };

  const handleNextDay = () => {
    setSelectedDate((prevDate) => {
      const nextDay = new Date(prevDate);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay.toLocaleDateString();
    });
  };

  const handleToDay = () => {
    setSelectedDate(new Date().toLocaleDateString());
  };

  return (
    <DateContainer>
      <TodayButton onClick={handleToDay}>오늘</TodayButton>
      <DateChangeButton onClick={handlePrevDay}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </DateChangeButton>
      <div className="date-wrapper">
        <DayWeek>{formatWeekday(date)}, </DayWeek>
        <MonthDate>{formatMonthDay(date)}</MonthDate>
      </div>
      {selectedDate === new Date().toLocaleDateString() && (
        <WeatherIcon>
          <span>{getWeatherIcon(weather)}</span>
        </WeatherIcon>
      )}
      <DateChangeButton onClick={handleNextDay}>
        <FontAwesomeIcon icon={faAngleRight} />
      </DateChangeButton>
    </DateContainer>
  );
}
