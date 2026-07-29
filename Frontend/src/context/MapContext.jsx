import { createContext, useContext, useState, useRef } from "react";

const MapContext = createContext();

export function MapProvider({ children }) {
  // ALL map state lives here - survives page navigation
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [pickingMode, setPickingMode] = useState(null);
  const [routeResults, setRouteResults] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [remainingDistance, setRemainingDistance] = useState(0);
  const [eta, setEta] = useState(0);
  const [routeDeviation, setRouteDeviation] = useState(false);
  const [voiceSOS, setVoiceSOS] = useState(false);
  const [safetyStatus, setSafetyStatus] = useState("VERY SAFE");

  // refs also survive
  const watchIdRef = useRef(null);
  const recognitionRef = useRef(null);
  const journeyActiveRef = useRef(false);

  const value = {
    source, setSource,
    destination, setDestination,
    pickingMode, setPickingMode,
    routeResults, setRouteResults,
    selectedRoute, setSelectedRoute,
    journeyStarted, setJourneyStarted,
    currentLocation, setCurrentLocation,
    remainingDistance, setRemainingDistance,
    eta, setEta,
    routeDeviation, setRouteDeviation,
    voiceSOS, setVoiceSOS,
    safetyStatus, setSafetyStatus,
    watchIdRef, recognitionRef, journeyActiveRef,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}

export function useMap() {
  return useContext(MapContext);
}