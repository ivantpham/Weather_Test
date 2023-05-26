import React, { useState } from 'react';
import Autocomplete from 'react-autocomplete';

import axios from 'axios';
import { ListIcon } from '../api/data';
import { dataItems } from '../api/dataItem';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import '../assets/less/main.css';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [notFound, setNotFound] = useState(false);



    const handleSearch = async () => {
        try {
            const apiKey = '59769e08629b2df3f92c1898cc6b1b1e';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
            const response = await axios.get(url);
            setWeatherData(response.data);
            setNotFound(false);
        } catch (error) {
            console.error(error);
            setWeatherData(null);
            setNotFound(true);
        }
    };

    const getWeather = async (city) => {
        const apiKey = '59769e08629b2df3f92c1898cc6b1b1e';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.log(error);
        }
    };

    const renderWeatherData = () => {
        if (notFound) {
            return (
                <div className="container d-flex justify-content-center align-items-center">
                    <div className="info-2">
                        <img
                            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/6d45bf70095521.5b9e6278a0a02.jpg"
                            alt="notfound icon"
                        />
                    </div>
                </div>
            );
        }

        if (weatherData) {
            const seaLevel = weatherData.main.sea_level || '(Không Ven Biển - Không hỗ trợ)';
            const grndLevel = weatherData.main.grnd_level || '(Không Ven Biển - Không hỗ trợ)';

            return (
                <div className="title-box-1">
                    <div className="container mt-4">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-9 d-flex justify-content-center">
                                <div className="box-contai-1 card p-4 mt-3 d-flex justify-content-between">
                                    <h2> {weatherData.name}</h2>
                                    <div className="info d-flex justify-content-center">

                                        <div className="text">
                                            <div className="temp-box d-flex justify-content-center">
                                                <div className="image-wrapper">
                                                    <img
                                                        src={getListIcon(weatherData.weather[0].main)}
                                                        alt="Weather icon"
                                                    />
                                                </div>
                                                <div className="temp-feel">
                                                    <p className="text-temp">{weatherData.main.temp}°C</p>
                                                    <p className="text-feel">( Cảm giác sẽ như: {weatherData.main.feels_like}°C )</p>
                                                    <div className="rise-set-box d-flex justify-content-between">
                                                        <div className="sunrise">
                                                            <div className="text-sunrise">Sunrise</div>
                                                            <p>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>

                                                        </div>
                                                        <img src='https://cdn-icons-png.flaticon.com/128/9237/9237745.png' alt="" className="rise-set" />
                                                        <div className="sunset">
                                                            <div className="text-sunset">Sunset</div>
                                                            <p>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>


                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="row">
                                                <div className="col d-flex align-items-center flex-column">
                                                    <div className="text-info-box d-flex justify-content-center">
                                                        <img src='https://cdn-icons-png.flaticon.com/128/2267/2267904.png' alt="" className="max-temp" />
                                                        <p>{weatherData.main.temp_max}°C</p>
                                                    </div>
                                                    <div className="text-info-box d-flex justify-content-center">
                                                        <img src='https://cdn-icons-png.flaticon.com/128/6791/6791368.png' alt="" className="max-temp" />
                                                        <p>Trạng thái: {weatherData.weather[0].main}</p>

                                                    </div>
                                                    <div className="text-info-box d-flex justify-content-center">
                                                        <img src='https://cdn-icons-png.flaticon.com/128/1180/1180260.png' alt="" className="max-temp" />
                                                        <p>Mô tả: {weatherData.weather[0].description}</p>
                                                    </div>
                                                    <div className="text-info-box d-flex justify-content-center">
                                                        <img src='https://cdn-icons-png.flaticon.com/128/2903/2903592.png' alt="" className="max-temp" />
                                                        <p>Độ ẩm: {weatherData.main.humidity}%</p>
                                                    </div>
                                                    <div className="text-info-box d-flex justify-content-center">
                                                        <img src='https://cdn-icons-png.flaticon.com/128/704/704845.png' alt="" className="max-temp" />
                                                        <p>Độ nhiều mây: {weatherData.clouds.all}%</p>
                                                    </div>
                                                    <div className="text-info-box d-flex justify-content-center">
                                                        <img src='https://cdn-icons-png.flaticon.com/128/430/430572.png' alt="" className="max-temp" />
                                                        {weatherData.main.sea_level ? (
                                                            <p>Mực nước biển: {weatherData.main.sea_level} m</p>
                                                        ) : (
                                                            <p style={{ color: '#fc0000' }}>Vùng Không Ven Biển - Không hỗ trợ</p>
                                                        )}
                                                    </div>

                                                </div>

                                                <div className="col d-flex align-items-center flex-column">
                                                    <div className="text-info-box d-flex justify-content-center">
                                                        <img src='https://cdn-icons-png.flaticon.com/128/2267/2267918.png' alt="" className="max-temp" />
                                                        <p>{weatherData.main.temp_min}°C</p>
                                                    </div>
                                                    <div className="text-info-box d-flex justify-content-center">
                                                        <img src='https://cdn-icons-png.flaticon.com/128/5532/5532989.png' alt="" className="max-temp" />
                                                        <p>Tốc độ gió: {weatherData.wind.speed} m/s</p>
                                                    </div>
                                                    <div className="text-info-box d-flex justify-content-center">
                                                        <img src='https://cdn-icons-png.flaticon.com/128/10596/10596408.png' alt="" className="max-temp" />
                                                        <p>Hướng gió: {weatherData.wind.deg}°</p>
                                                    </div>
                                                    <div className="text-info-box d-flex justify-content-center">
                                                        <img src='https://cdn-icons-png.flaticon.com/128/3426/3426170.png' alt="" className="max-temp" />

                                                        {weatherData.wind.gust && <p>Gió giật: {weatherData.wind.gust} m/s</p>}
                                                    </div>
                                                    <div className="text-info-box d-flex justify-content-center">
                                                        <img src='https://cdn-icons-png.flaticon.com/128/4115/4115904.png' alt="" className="max-temp" />
                                                        {weatherData.main.pressure && <p>Áp lực: {weatherData.main.pressure} hPa</p>}
                                                    </div>
                                                    <div className="text-info-box d-flex justify-content-center">
                                                        <img src='https://cdn-icons-png.flaticon.com/128/9108/9108514.png' alt="" className="max-temp" />
                                                        {weatherData.main.grnd_level ? (
                                                            <p>Độ cao mặt đất: {weatherData.main.grnd_level} m</p>
                                                        ) : (
                                                            <p style={{ color: '#fc0000' }}>Vùng Không Ven Biển - Không hỗ trợ</p>
                                                        )}
                                                    </div>

                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    };

    const renderMenuItem = (item, isHighlighted) => {
        const itemStyle = {
            background: isHighlighted ? '#27a4f2' : 'white',
            padding: '5px',
            fontWeight: item.label === city ? 'bold' : 'normal',
            color: item.label === city ? 'red' : 'black',
            cursor: 'pointer',
        };

        return (
            <div key={item.value} style={itemStyle}>
                {item.label}
            </div>
        );
    };

    return (
        <div className="title-box-2">
            <div className="container mt-4">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-11">
                        <div className="box-contai-2 card p-4 mt-3 ">
                            <h3 className="heading mt-1 justify-content-center d-flex align-items-center">
                                Xin chào! Bạn muốn tìm thời tiết ở nơi đâu?
                            </h3>
                            <div className="d-flex justify-content-center flex-column align-center align-items-center px-5">
                                <div className="search d-flex justify-content-center px-5 search-container">
                                    <Autocomplete
                                        className="search-input"
                                        value={city}
                                        items={dataItems}
                                        getItemValue={(item) => item.value}
                                        renderItem={renderMenuItem}
                                        onChange={(e) => setCity(e.target.value)}
                                        onSelect={(value) => setCity(value)}
                                        inputProps={{
                                            placeholder: 'Hãy nhập tên thành phố ...',
                                            style: { width: '480px', border: 'none', marginLeft: '10px' },
                                        }}
                                    />

                                    <div onClick={handleSearch} className="search-button">
                                        <i className="bi bi-search"></i>
                                    </div>
                                </div>
                                <div className="box-fast-search d-flex flex-column">
                                    <div className="search-fast-text">Tìm Nhanh</div>

                                    <div className="fast-search d-flex justify-content-around">
                                        <div className="city" onClick={() => getWeather('Hanoi')}>
                                            <p>Hà Nội</p>
                                        </div>
                                        <div className="city" onClick={() => getWeather('Singapore')}>
                                            <p>Singapore</p>
                                        </div>
                                        <div className="city" onClick={() => getWeather('Ho Chi Minh')}>
                                            <p>Hồ Chí Minh</p>
                                        </div>
                                        <div className="city" onClick={() => getWeather('Berlin')}>
                                            <p>Berlin</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {renderWeatherData()}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default WeatherApp;

const getListIcon = (type) => {
    const icon = ListIcon.find((icon) => icon.type === type);
    return icon ? icon.img : '';
};
