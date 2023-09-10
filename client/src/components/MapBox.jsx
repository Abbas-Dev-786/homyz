import PropTypes from "prop-types";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapBox = ({ location, address, zoomLevel }) => {
  return (
    <MapContainer
      center={location.coordinates}
      zoom={zoomLevel}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "500px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={location.coordinates}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
};

MapBox.propTypes = {
  location: PropTypes.object,
  address: PropTypes.string,
  zoomLevel: PropTypes.number,
};

export default MapBox;
