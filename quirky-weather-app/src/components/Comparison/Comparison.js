import React from 'react';
import { Box, Typography } from '@mui/material';

const Comparison = ({ todayWeather, comparisonWeather }) => {
    if (!todayWeather || !comparisonWeather) return null;

    return (
        <Box className="weather-box" sx={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#f0f0f0' }}>
            <Typography variant="h5" component="div" sx={{ color: 'rgba(0, 0, 0, 0.87)' }}>
                Comparison Summary
            </Typography>
            <Typography variant="body1" component="p" sx={{ color: 'rgba(0, 0, 0, 0.87)' }}>
                Today Weather in {todayWeather.city}, {todayWeather.sys.country}: {todayWeather.main.temp}°C compared to {comparisonWeather.city}, {comparisonWeather.sys.country}, where the weather is {comparisonWeather.main.temp}°C.
            </Typography>
        </Box>
    );
};

export default Comparison;
