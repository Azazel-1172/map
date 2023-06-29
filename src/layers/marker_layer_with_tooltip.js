import React from "react";
import {
  LayersControl,
  LayerGroup,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import { mountainIcon } from "../icons/mountain";

export const MarkerLayerWithTooltip = ({ data }) => {
  const leafletMap = useMap();
  const layer = data.features.map((feature) => {
    const { coordinates } = feature.geometry;
    const { name, elevation, continent } = feature.properties;
    return (
      <Marker
        key={String(coordinates)}
        position={[coordinates[1], coordinates[0]]}
        icon={mountainIcon}
        eventHandlers={{
          click: (e) => leafletMap.panTo(e.latlng),
        }}
      >
        <Tooltip>
          <h3>Mt. {name}</h3>
          Continent: <b>{continent}</b> <br />
          Elevation: <b>{elevation} m</b>
        </Tooltip>
      </Marker>
    );
  });
  return (
    <LayersControl.Overlay name="Highest point">
      <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>
  );
};
