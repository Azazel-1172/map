import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { defaultIcon } from "../icons/defaultIcon";

// a point in France to begin directing from
const WAYPOINT_FROM = [48.661274724187905, 16.863361122267104];
// a point in Korea to direct to
const WAYPOINT_TO = [37.29719559542854, 128.0956667878192];

const RoutingMachine = ({}) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const waypoints = [L.latLng(WAYPOINT_FROM), L.latLng(WAYPOINT_TO)];

    const routingControl = L.Routing.control({
      waypoints,
      routeWhileDragging: true,
      createMarker: function (i, waypoint, n) {
        L.marker(waypoint.latLng, {
          icon: defaultIcon,
        });
      },
      // some configurable options, see the routing control documentation for full list
      show: true,
      addWaypoints: false,
      routeWhileDragging: true,
      draggableWaypoints: true,
      fitSelectedRoutes: false,
      showAlternatives: true,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map]);

  return null;
};

export { RoutingMachine };
