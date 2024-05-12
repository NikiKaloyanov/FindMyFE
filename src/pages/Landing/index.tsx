import "./Landing.css";
import { Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

type Coordinates = {
  lat: number;
  lng: number;
};

const Landing = () => {
  const [zoom, setZoom] = useState<number>(10),
    [position, setPosition] = useState<Coordinates>({
      lat: 42.642632,
      lng: 23.338406,
    });

  useEffect(() => {
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition((data) => {
        setPosition({ lat: data.coords.latitude, lng: data.coords.longitude });
      });
      console.log("check");
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Grid container className="map">
      <CssBaseline />
      <Grid item xs={2}>
        <div className="sidebar">floater</div>
      </Grid>
      <Grid item xs={12} className="map">
        <APIProvider apiKey={import.meta.env.VITE_API_GOOGLE_MAPS_KEY}>
          <Map
            mapId={import.meta.env.VITE_API_GOOGLE_MAPS_ID}
            zoom={zoom}
            onZoomChanged={(data) => setZoom(data.detail.zoom)}
            fullscreenControl={false}
            disableDefaultUI={true}
            defaultCenter={position}
          >
            <AdvancedMarker position={position} title={"N"}/>
          </Map>
        </APIProvider>
      </Grid>
    </Grid>
  );
};

export default Landing;
