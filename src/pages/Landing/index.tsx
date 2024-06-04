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
import Settings from "../../components/Settings";
import MarkerImage from "../../components/MarkerImage";
import FormDialog from "../../components/FormDialog";
import { locationRequest } from "../../api/locationRequest.ts";
import { getPendingLocations } from "../../api/getPendingLocations.ts";
import { useNavigate } from "react-router-dom";
import { getKnownLocations } from "../../api/getKnownLocations.ts";
import LogoutIcon from "@mui/icons-material/Logout";

type Coordinates = {
  lat: number;
  lng: number;
};

const Landing = () => {
  const { headersHook, userDataHook } = useHooksContext(),
    navigate = useNavigate(),
    [zoom, setZoom] = useState<number>(10),
    [position, setPosition] = useState<Coordinates>({
      lat: 42.697732,
      lng: 23.321906,
    }),
    [updateFrequency, setUpdateFrequency] = useState<number>(5000),
    [openSettings, setOpenSettings] = useState<boolean>(false),
    [openAdd, setOpenAdd] = useState<boolean>(false);

  const handleLogout = () => {
    headersHook.cleanData();
    navigate("/");
  };

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

  const handleAddDialog = (email?: string) => {
    const username = localStorage.getItem("username");
    if (email && username) {
      locationRequest(username, email);
    }

    setOpenAdd(false);
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
      <Button
        variant="outlined"
        color="success"
        className="button-style"
        onClick={() => setOpenAdd(true)}
      >
        Add people
      </Button>
      <div className="control-wrapper">
        <Button
          variant="contained"
          color="error"
          className="exit-button"
          onClick={handleLogout}
        >
          <LogoutIcon />
        </Button>
        <Button
          variant="outlined"
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
    }, updateFrequency);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getPendingLocations(headersHook.userData.username).then((data) =>
      userDataHook.setPendingLocations(data.map((it) => it.username)),
    );
    getKnownLocations(headersHook.userData.username).then((data) => {
      userDataHook.setKnownLocations(data);
    });
    updateLocation(
      headersHook.userData.username,
      position.lng.toString(),
      position.lat.toString(),
    );
  }, [position]);

  return (
    <>
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
            <Settings handleClose={handleSettingsButton} />
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
              <AdvancedMarker
                position={position}
                children={
                  <MarkerImage
                    initials={userDataHook.getInitials(
                      headersHook.userData.username,
                    )}
                  />
                }
              />
              {userDataHook.knownLocations.map((it) => (
                <AdvancedMarker
                  key={it.username}
                  position={{ lat: it.latitude, lng: it.longitude }}
                  children={
                    <MarkerImage
                      initials={userDataHook.getInitials(it.username)}
                    />
                  }
                />
              ))}
            </Map>
          </APIProvider>
        </Grid>
      </Grid>
      <FormDialog open={openAdd} handleCloseDialog={handleAddDialog} />
    </>
  );
};

export default Landing;
