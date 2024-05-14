"use strict";

(() => {
  const API_URL = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=10&orderby=time";

  const errorMessageDiv = document.getElementById("error-message");
  const quakesDiv = document.getElementById("quakes");

  const handleError = (error) => {
    errorMessageDiv.textContent = `Error: ${error.message}`;
  };

  const renderQuakes = (quakes) => {
    quakesDiv.innerHTML = "";
    quakes.forEach((quake) => {
      const quakeDiv = document.createElement("div");
      quakeDiv.classList.add("quake");
      quakeDiv.innerHTML = `
        <h2>${quake.properties.place}</h2>
        <p>Magnitude: ${quake.properties.mag}</p>
        <p>Time: ${new Date(quake.properties.time).toLocaleString()}</p>
      `;
      quakesDiv.appendChild(quakeDiv);
    });
  };

  const fetchQuakeData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const quakes = data.features;
      renderQuakes(quakes);
    } catch (error) {
      handleError(error);
    }
  };

  window.addEventListener("load", fetchQuakeData);
})();