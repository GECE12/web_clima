import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

// Definir los componentes estilizados
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  margin: 20px auto;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  width: 100%;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const WeatherInfo = styled.div`
  margin-top: 20px;
  text-align: left;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const WeatherDataItem = styled.p`
  margin: 5px 0;
  font-size: 16px;
`;

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const getWeatherData = () => {
    if (city.trim() === "") {
      setError("Por favor ingresa el nombre de una ciudad");
      return;
    }

    // Llamada al backend PHP con la ciudad ingresada por el usuario
    axios
      .get(`http://localhost/api/api.php?city=${city}`)
      .then((response) => {
        setWeatherData(response.data);
        setError(null); // Limpiar cualquier mensaje de error
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        setError("No se pudo obtener la información del clima");
        setWeatherData(null);
      });
  };

  return (
    <Container>
      <Title>Datos del Clima</Title>

      {/* Input para ingresar la ciudad */}
      <Input
        type="text"
        placeholder="Ingresa el nombre de la ciudad"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <Button onClick={getWeatherData}>Obtener Clima</Button>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {weatherData && (
        <WeatherInfo>
          <h2>
            Clima en {weatherData.location.name}, {weatherData.location.country}
          </h2>
          <WeatherDataItem>
            Temperatura: {weatherData.current.temp_c} °C
          </WeatherDataItem>
          <WeatherDataItem>
            Condición: {weatherData.current.condition.text}
          </WeatherDataItem>
          <WeatherDataItem>
            Humedad: {weatherData.current.humidity} %
          </WeatherDataItem>
          <WeatherDataItem>
            Viento: {weatherData.current.wind_kph} kph
          </WeatherDataItem>
        </WeatherInfo>
      )}
    </Container>
  );
}

export default Weather;
