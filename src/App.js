import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useState } from "react";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";

function App() {
  // 날씨 정보 state
  const [weather, setWeather] = useState(null);
  // 도시
  const cities = ["paris", "new york", "tokyo", "seoul"];
  // 도시 state
  const [city, setCity] = useState("");

  // 스피너
  let [loading, setLoading] = useState(true);

  // 현재 위치 가져오기
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log("현재 위치", lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  // 현재 위치 날씨 API 가져오기
  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      // &units=metric => 섭씨 사용
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=658d847ef1d28e72e047ab0c5a476d54&units=metric`;
      // 로딩 스피너
      setLoading(true);
      // url에 데이터를 가져올 때까지 기다려 주세요
      let response = await fetch(url);
      let data = await response.json();
      // weather에 데이터 담기
      setWeather(data);
      // 로딩스피너 끝
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // 도시 날씨 API 가져오기
  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=658d847ef1d28e72e047ab0c5a476d54&units=metric`;
      // 로딩 스피너
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      // 로딩스피너 끝
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // 함수 실행
  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader color="#ffffff" loading={loading} size={150} />
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities}
            selectedCity={city}
            setCity={setCity}
          />
        </div>
      )}
    </div>
  );
}
export default App;
