import React from "react";
import { LayersControl, Marker, Tooltip, useMap } from "react-leaflet";
import MarkerClusterGroup from "@christopherpickering/react-leaflet-markercluster";

import { defaultIcon } from "../icons/defaultIcon";

export const MarkerLayerWithTooltipCluster = ({ data }) => {
  const leafletMap = useMap();
  const layer = data.features.map((feature) => {
    const { coordinates } = feature.geometry;
    const { name } = feature.properties;
    return (
      <Marker
        key={String(coordinates)}
        position={[coordinates[1], coordinates[0]]}
        icon={defaultIcon}
        eventHandlers={{
          click: (e) => leafletMap.panTo(e.latlng),
        }}
      >
        <Tooltip>
          <h3>{name}</h3>
        </Tooltip>
      </Marker>
    );
  });
  return (
    <LayersControl.Overlay name="World cities clustered">
      <MarkerClusterGroup zoomToBoundsOnClick={false}>
        {layer}
      </MarkerClusterGroup>
    </LayersControl.Overlay>
  );
};
