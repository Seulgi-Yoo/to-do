import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { getWeather, getWeatherIcon } from "../helper/getWeatherIcon";

const DateContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  height: 100px;
  background: #ffffff;
  border-bottom: 0.5px solid #c1c7ff;
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
  @media screen and (max-width:500px) {
    display: none;
  }
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

const today = new Date();

export default function Header() {
  const [weather, setWeather] = useState("");

  useEffect(() => {
    getWeather().then((response) => {
      setWeather(response);
    });
  }, []);

  return (
    <DateContainer>
      <DayWeek>{formatWeekday(today)}, </DayWeek>
      <MonthDate>{formatMonthDay(today)}</MonthDate>
      <WeatherIcon>
        <span>{getWeatherIcon(weather)}</span>
      </WeatherIcon>
    </DateContainer>
  );
}
