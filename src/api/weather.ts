import type { WeatherResponse } from "../types/weather";

function getBaseTime() {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();

  let baseHour;

  if (minute < 10) {
    baseHour = hour - 2;
  } else {
    baseHour = hour;
  }
  if (baseHour < 0) {
    baseHour += 24;
  }
  const baseTime = String(baseHour).padStart(2, "0") + "00";
  return baseTime;
}

const getWeather = async (
  userNx: number | undefined,
  userNy: number | undefined
): Promise<WeatherResponse | undefined> => {
  const serviceKey = import.meta.env.VITE_PUBLIC_API_KEY;
  const pageNo = 1;
  const numOfRows = 10;
  const dataType = "JSON";

  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const base_date = `${year}${month}${day}`;
  const base_time = getBaseTime();

  const nx = userNx;
  const ny = userNy;

  const url = `${
    import.meta.env.VITE_PUBLIC_API
  }?serviceKey=${serviceKey}&pageNo=${pageNo}&numOfRows=${numOfRows}&dataType=${dataType}&base_date=${base_date}&base_time=${base_time}&nx=${nx}&ny=${ny}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: WeatherResponse = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return;
  }
};

export default getWeather;
