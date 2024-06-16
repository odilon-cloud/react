import React, { useState } from 'react';
import { Box, Container, Grid, Typography, SvgIcon } from '@mui/material';
import Search from './components/Search/Search';
import WeeklyForecast from './components/WeeklyForecast/WeeklyForecast';
import TodayWeather from './components/TodayWeather/TodayWeather';
import { fetchWeatherData } from './api/OpenWeatherService';
import { transformDateFormat } from './utilities/DatetimeUtils';
import UTCDatetime from './components/Reusable/UTCDatetime';
import LoadingBox from './components/Reusable/LoadingBox';
import { ReactComponent as SplashIcon } from './assets/splash-icon.svg';
import Logo from './assets/logo.png';
import ErrorBox from './components/Reusable/ErrorBox';
import { ALL_DESCRIPTIONS } from './utilities/DateConstants';
import { getTodayForecastWeather, getWeekForecastWeather } from './utilities/DataUtils';
import Comparison from './components/Comparison/Comparison';
import './App.css';

function App() {
    const [todayWeather, setTodayWeather] = useState(null);
    const [todayForecast, setTodayForecast] = useState([]);
    const [weekForecast, setWeekForecast] = useState(null);
    const [comparisonWeather, setComparisonWeather] = useState(null);
    const [comparisonTodayForecast, setComparisonTodayForecast] = useState([]);
    const [comparisonWeekForecast, setComparisonWeekForecast] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showRain, setShowRain] = useState(false);

    const searchChangeHandler = async (enteredData) => {
        const [latitude, longitude] = enteredData.value.split(' ');

        setIsLoading(true);
        setShowRain(true);

        const currentDate = transformDateFormat();
        const date = new Date();
        let dt_now = Math.floor(date.getTime() / 1000);

        try {
            const [todayWeatherResponse, weekForecastResponse] = await fetchWeatherData(latitude, longitude);
            const all_today_forecasts_list = getTodayForecastWeather(weekForecastResponse, currentDate, dt_now);

            const all_week_forecasts_list = getWeekForecastWeather(weekForecastResponse, ALL_DESCRIPTIONS);

            setTodayForecast([...all_today_forecasts_list]);
            setTodayWeather({ city: enteredData.label, ...todayWeatherResponse });
            setWeekForecast({
                city: enteredData.label,
                list: all_week_forecasts_list,
            });

            setTimeout(() => setShowRain(false), 1000);
        } catch (error) {
            setError(true);
        }

        setIsLoading(false);
    };

    const comparisonSearchChangeHandler = async (enteredData) => {
        const [latitude, longitude] = enteredData.value.split(' ');

        setIsLoading(true);
        setShowRain(true);

        const currentDate = transformDateFormat();
        const date = new Date();
        let dt_now = Math.floor(date.getTime() / 1000);

        try {
            const [todayWeatherResponse, weekForecastResponse] = await fetchWeatherData(latitude, longitude);
            const all_today_forecasts_list = getTodayForecastWeather(weekForecastResponse, currentDate, dt_now);

            const all_week_forecasts_list = getWeekForecastWeather(weekForecastResponse, ALL_DESCRIPTIONS);

            setComparisonWeather({ city: enteredData.label, ...todayWeatherResponse });
            setComparisonTodayForecast([...all_today_forecasts_list]);
            setComparisonWeekForecast({
                city: enteredData.label,
                list: all_week_forecasts_list,
            });

            setTimeout(() => setShowRain(false), 1000);
        } catch (error) {
            setError(true);
        }

        setIsLoading(false);
    };

    let appContent = (
        <Box
            xs={20}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{
                width: '100%',
                minHeight: '500px',
            }}
        >
            <SvgIcon
                component={SplashIcon}
                inheritViewBox
                className="reveal-icon"
                sx={{ padding: '1rem', fontSize: { xs: '100px', sm: '120px', md: '140px' } }}
            />
            <Typography
                variant="h4"
                component="h4"
                className="reveal-text"
                sx={{
                    fontSize: { xs: '20px', sm: '22px' },
                    color: 'rgba(255,255,255, .85)',
                    fontFamily: 'Poppins',
                    textAlign: 'center',
                    margin: '2rem 0',
                    maxWidth: '80%',
                    lineHeight: '50px',
                }}
            >
                Welcome to the Quirky Weather App!
                <br />
                Search for the weather and forecast the beautiful clouds
                <br />
                😊 🌤️ 🌧️ 🌩️ 🌪️
            </Typography>
        </Box>
    );

    if (todayWeather && comparisonWeather) {
        appContent = (
            <React.Fragment>
                <Grid item xs={12} md={6}>
                    <TodayWeather data={todayWeather} forecastList={todayForecast} />
                    <WeeklyForecast data={weekForecast} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TodayWeather data={comparisonWeather} forecastList={comparisonTodayForecast} />
                    <WeeklyForecast data={comparisonWeekForecast} />
                </Grid>
                <Comparison todayWeather={todayWeather} comparisonWeather={comparisonWeather} />
            </React.Fragment>
        );
    } else if (todayWeather && todayForecast && weekForecast) {
        appContent = (
            <React.Fragment>
                <Grid item xs={12} md={6}>
                    <TodayWeather data={todayWeather} forecastList={todayForecast} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <WeeklyForecast data={weekForecast} />
                </Grid>
            </React.Fragment>
        );
    }

    if (error) {
        appContent = (
            <ErrorBox margin="3rem auto" flex="inherit" errorMessage="Something went wrong" />
        );
    }

    if (isLoading) {
        appContent = (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    minHeight: '500px',
                }}
            >
                <LoadingBox value="1">
                    <Typography
                        variant="h3"
                        component="h3"
                        sx={{
                            fontSize: { xs: '10px', sm: '12px' },
                            color: 'rgba(255, 255, 255, .8)',
                            lineHeight: 1,
                            fontFamily: 'Poppins',
                        }}
                    >
                        Loading...
                    </Typography>
                </LoadingBox>
            </Box>
        );
    }

    return (
        <Container
            sx={{
                marginTop: '2rem',
                backdropFilter: 'blur(10px)',
                maxWidth: { xs: '95%', sm: '80%', md: '1100px' },
                width: '100%',
                height: '100%',
                margin: '0 auto',
                padding: '2rem 0 5rem',
                marginBottom: '1rem',
                borderRadius: {
                    xs: 'none',
                    sm: '0 0 1rem 1rem',
                },
            }}
        >
            <Grid container columnSpacing={2}>
                <Grid item xs={12}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                            width: '100%',
                            marginBottom: '1rem',
                        }}
                    >
                        <Box
                            component="img"
                            sx={{
                                height: { xs: '30px', sm: '40px', md: '48px' },
                                width: 'auto',
                            }}
                            alt="logo"
                            src={Logo}
                        />
                        <UTCDatetime />
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                            width: '100%',
                            marginBottom: '1rem',
                        }}
                    >
                        <Search onSearchChange={searchChangeHandler} sx={{ width: '45%' }} />
                        <Search onSearchChange={comparisonSearchChangeHandler} sx={{ width: '45%' }} />
                    </Box>
                </Grid>
                {appContent}
                {showRain && (
                    <Box className="rain">
                        {[...Array(50)].map((_, i) => (
                            <Box key={i} className="drop" />
                        ))}
                    </Box>
                )}
            </Grid>
        </Container>
    );
}

export default App;
