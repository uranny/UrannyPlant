import { useCallback, useEffect, useState } from "react";
import getWeather from "../../api/weather";
import type { WeatherResponse } from "../../types/weather";
import PlantGIF from "../../assets/gif/plant.gif";
import BackgorundImg from "../../assets/images/background.png";
import formatCategory from "../../utils/FormatCategory";
import type { UserData } from "../../types/user";
import { getUserData } from "../../api/user";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Main() {
  const [response, setResponse] = useState<WeatherResponse | null>(null);
  const [user, setUser] = useState(auth.currentUser);
  const [userData, setUserData] = useState<UserData | null>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user?.uid) {
      console.log("사용자가 로그인하지 않았습니다.");
      return;
    }

    const fetchUserData = async () => {
      const data = await getUserData(user.uid);
      if (!data) {
        console.log("사용자 정보 받아오기 실패");
        return;
      }
      setUserData(data);
    };

    fetchUserData();
  }, [user?.uid]);

  useEffect(() => {
    if (!userData?.coordinates) {
      return;
    }
    const initWeather = async () => {
      const data = await getWeather(
        userData?.coordinates.nx,
        userData?.coordinates.ny
      );
      if (!data) {
        console.log("값 받아오기 실패");
        return;
      }
      setResponse(data);
    };
    initWeather();
  }, []);

  const renderWeatherInfoList = useCallback(() => {
    return response?.response.body.items.item.map(
      ({ category, obsrValue }, i) => {
        const { label, value } = formatCategory(category, obsrValue);
        return (
          <div
            className="inline-flex flex-row gap-2 p-2 mr-2 mb-2 bg-white flex-wrap"
            key={i}
          >
            <p>{label}</p>
            <p>{value}</p>
          </div>
        );
      }
    );
  }, [response]);

  return (
    <div className="relative w-screen h-screen bg-blue-200">
      <img
        className="absolute w-screen h-screen object-cover"
        src={BackgorundImg}
      />
      <img
        className="w-60 left-1/2 top-1/2 -translate-x-1/2 absolute object-contain"
        src={PlantGIF}
      />
      <div className="gap-3 absolute">{renderWeatherInfoList()}</div>
    </div>
  );
}
