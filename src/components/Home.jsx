import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import pin_motor from "/public/pin_motor.png";
import pin_thunder from "/public/pin_thunder.png";
import pin_router from "/public/pin_router.png";
import motor from "/public/motor.png";
import router from "/public/router.png";
import energy from "/public/thunder.png";
import productos from "../product.json";

function Home() {
  useEffect(() => {
    // Crea el mapa
    const map = L.map("map").setView([6.2442, -75.5812], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Map data &copy; OpenStreetMap contributors",
    }).addTo(map);

    // Marcadores personalizados
    const iconSize = [50, 50];

    var motorIcon = L.icon({
      iconUrl: pin_motor,
      iconSize: iconSize,
      iconAnchor: [iconSize[0] / 2, iconSize[1]],
      popupAnchor: [0, -iconSize[1] / 2],
    });

    var thunderIcon = L.icon({
      iconUrl: pin_thunder,
      iconSize: iconSize,
      iconAnchor: [iconSize[0] / 2, iconSize[1]],
      popupAnchor: [0, -iconSize[1] / 2],
    });

    var routerIcon = L.icon({
      iconUrl: pin_router,
      iconSize: iconSize,
      iconAnchor: [iconSize[0] / 2, iconSize[1]],
      popupAnchor: [0, -iconSize[1] / 2],
    });

    // Agrega los marcadores al mapa
    // se llama a las imagenes desde aca porque Github no me permite desde el JSON
    productos.products.forEach((producto) => {
      let icon;
      let image;
      if (producto.name === "Motor") {
        icon = motorIcon;
        image = motor;
      } else if (producto.name === "Energia") {
        icon = thunderIcon;
        image = energy;
      } else if (producto.name === "Wifi Router") {
        icon = routerIcon;
        image = router;
      }

      L.marker([producto.lat, producto.lng], { icon: icon })
        .bindPopup(
          `<div class="popup-content">
            <img src="${image}" alt="Product" />
            <div class="popup-content-detail">
              <p>ID: ${producto.id}</p>
              <p>Usuario: ${producto.user}</p>
              <p>Fecha: ${producto.date}</p>
              <p>Puntuación: ${producto.comment}</p>
            </div>
          </div>
          `, {
            className: 'custom-popup',
          })
        .addTo(map);
    });
  }, []);

  return (
    <div className="home-cont">
      <h1>Bienvenido a Geo App!</h1>
      <div className="login-container home-container">
        <h3>
          Puedes seleccionar la ubicación de tu producto para ver más detalles ⚡
        </h3>
        <div id="map"></div>
      </div>
    </div>
  );
}

export default Home;
