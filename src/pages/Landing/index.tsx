import "./Landing.css";
import { Grid, Slider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { updateLocation } from "../../api/updateLocation.ts";
import { useHooksContext } from "../../hooks/useHooksContext.tsx";
import ControlFloater from "../../components/ControlFloater";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import Settings from "../../components/Settings";

type Coordinates = {
  lat: number;
  lng: number;
};

const Landing = () => {
  const { headersHook } = useHooksContext(),
    [zoom, setZoom] = useState<number>(10),
    [position, setPosition] = useState<Coordinates>({
      lat: 42.642632,
      lng: 23.338406,
    }),
    [updateFrequency, setUpdateFrequency] = useState<number>(5000),
    [openSettings, setOpenSettings] = useState<boolean>(false);

  const handleUpdateFrequency = (
    event: Event,
    value: number | number[],
    activeThumb: number,
  ) => {
    setUpdateFrequency(value as number);
  };

  const handleSettingsButton = () => {
    setOpenSettings(!openSettings);
  };

  const controlContent = (
    <>
      <div>
        Update Frequency
        <Slider
          color="success"
          value={updateFrequency}
          onChange={handleUpdateFrequency}
        />
      </div>
      <Button variant="outlined" color="success" className="button-style">
        Add people
      </Button>
      <div className="control-wrapper">
        <Button variant="contained" color="error" className="exit-button">
          Logout
        </Button>
        <Button
          variant="text"
          color="success"
          className="settings-button"
          onClick={handleSettingsButton}
        >
          <SettingsIcon className="settings" />
        </Button>
      </div>
    </>
  );

  useEffect(() => {
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition((data) => {
        setPosition({ lat: data.coords.latitude, lng: data.coords.longitude });
      });
      updateLocation(
        headersHook.userData.username,
        position.lng.toString(),
        position.lat.toString(),
      );
    }, updateFrequency);

    return () => clearInterval(interval);
  }, []);

  return (
    <Grid container className="map">
      <CssBaseline />

      <Grid
        item
        xs={12}
        sm={6}
        md={3}
        sx={{ mx: 2 }}
        className="responsive-control"
      >
        {!openSettings ? (
          <ControlFloater
            text={"Welcome " + headersHook.userData.username + "!"}
            children={controlContent}
          />
        ) : (
          <Settings handleClose={handleSettingsButton}/>
        )}
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
            <AdvancedMarker position={position} title={"N"} />
          </Map>
        </APIProvider>
      </Grid>
    </Grid>
  );
};

export default Landing;
