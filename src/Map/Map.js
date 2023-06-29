import { useEffect, useState } from "react";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";

import { cities } from "../data/cities";
import { mountains } from "../data/highest_points";
import { continents } from "../data/continents";
import { irishCities2157 } from "../data/irish_cities_2157";

import { MarkerLayer } from "../layers/marker_layer";
import { MarkerLayerWithTooltip } from "../layers/marker_layer_with_tooltip";
import { MarkerLayerWithTooltipCluster } from "../layers/marker_layer_with_tooltip_cluster";
import { MarkerLayerWithTooltipReproject } from "../layers/marker_layer_with_tooltip_reproject";
import { RadiusFilter } from "../layers/radius_filter";
import { ContinetsPolygonLayer } from "../layers/continents_polygon_layer";

import { FitBoundsToDataControl } from "../controls/fit_data_to_bounds";
import { ShowActiveFiltersControl } from "../controls/show_active_filters";
import { RoutingMachine } from "../controls/routing_machine";

export const Map = () => {
  const [geoFilter, setGeoFilter] = useState(null);
  const getGeoFilter = () => geoFilter;

  const [radiusFilter, setRadiusFilter] = useState(null);
  const getRadiusFilter = () => radiusFilter;

  const [asyncCities, setAsyncCities] = useState({ features: [] });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_populated_places_simple.geojson"
      );
      const cities = await response.json();
      setAsyncCities(cities);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <MapContainer center={[0, 0]} zoom={1} scrollWheelZoom={true}>
      <LayersControl position="topright">
        <LayersControl.BaseLayer name="OSM Streets">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked name="ESRI World Imagery">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          />
        </LayersControl.BaseLayer>
        <MarkerLayer
          data={asyncCities}
          setRadiusFilter={setRadiusFilter}
          getRadiusFilter={getRadiusFilter}
          getGeoFilter={getGeoFilter}
        />
        <MarkerLayerWithTooltip data={mountains} />
        <MarkerLayerWithTooltipCluster data={cities} />
        <MarkerLayerWithTooltipReproject data={irishCities2157} />
        <RadiusFilter
          radiusFilter={radiusFilter}
          setRadiusFilter={setRadiusFilter}
        />
        <ContinetsPolygonLayer
          data={continents}
          setGeoFilter={setGeoFilter}
          getGeoFilter={getGeoFilter}
        />
      </LayersControl>
      <FitBoundsToDataControl />
      <ShowActiveFiltersControl
        getFilters={() => ({ geoFilter, radiusFilter })}
      />
      <RoutingMachine />
    </MapContainer>
  );
};
