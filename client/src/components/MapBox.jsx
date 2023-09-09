import PropTypes from "prop-types";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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
