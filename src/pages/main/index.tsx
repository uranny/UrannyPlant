import { useEffect, useState } from "react";
import getWeather from "../../api/weather";
import type { WeatherResponse } from "../../types/weather";

export default function Main() {
  const [response, setResponse] = useState<WeatherResponse | null>(null);

  useEffect(() => {
    const initWeather = async () => {
      const data = await getWeather();
      if (!data) {
        console.log("값 받아오기 실패");
        return;
      }
      setResponse(data);
    };
    initWeather();
  }, []);

  return <div>main</div>;
}
