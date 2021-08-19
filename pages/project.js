import GoogleMapReact, {
  GoogleMap,
  DirectionsRenderer,
} from "google-map-react";
import { apiKey } from "../apiKey.js";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import styles from "./project.module.css";
import Switch from "@material-ui/core/Switch";
import axios from "axios";

export default function Project() {
  const ex1 = {
    center: {
      lat: 33.76176289096943,
      lng: -117.92945707982629,
    },
    zoom: 8,
  };

  const ProjectComponent = ({ Label, MaxProjectID, lat, lng }) => (
    <div
      className={
        state.MaxProjectID == MaxProjectID
          ? styles["marker-label-select"]
          : Label.toString().length < 2
          ? styles["marker-label-count"]
          : styles["marker-label"]
      }
      style={{
        position: "absolute",
        width: 25,
        height: 25,
        left: -40 / 2,
        top: -40 / 2,

        border: "3px solid #f44336",
        borderRadius: 40,
        backgroundColor: "white",
        textAlign: "center",
        color: "#3f51b5",
        fontSize: 13,
        fontWeight: "500",
        padding: 4,
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={() => {
        if (Label.toString().length > 3) {
          setState({
            Label: Label,
            MaxProjectID: MaxProjectID,
            lat: lat,
            lng: lng,
          });
          setJobNumberSelect(Label);
        } else {
          let tempProjectArray = [];
          let tempLabelArray = [];
          data.projectInfo.forEach(item => {
            if (item.lat == lat && item.lng == lng) {
              tempProjectArray.push(item);
              tempLabelArray.push(item.JobNumber);
            }
          });
          setJobNumberSelect(0);
          setState({
            Label: tempLabelArray,
            MaxProjectID: MaxProjectID,
            lat: lat,
            lng: lng,
          });
        }
      }}
    >
      {Label}
    </div>
  );
  const HQ = () => (
    <div
      style={{
        position: "absolute",
        width: 20,
        height: 20,
        left: -40 / 2,
        top: -40 / 2,

        border: "3px solid #3639f4",
        borderRadius: 0,
        backgroundColor: "white",
        textAlign: "center",
        color: "#754fdf",
        fontSize: 11,
        fontWeight: "500",
        padding: 4,
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      HQ
    </div>
  );

  useEffect(() => {}, []);
  const [state, setState] = useState({
    Label: "",
    MaxProjectID: "",
  });

  const [jobNumberSelect, setJobNumberSelect] = useState(0);
  const [rightPanelState, setRightPanelState] = useState({
    ProjectID: 0,
    JobNumber: 0,
    ProjectGroup: "",
    ProjectName: "",
    ProjectAddress: "",
    AddressLabel: "",
    Distance: "",
  });

  const [satelliteState, setSatelliteState] = useState(false);
  const [data, setData] = useState({ temp: 0 });
  const office = {
    lat: 33.76179647059898,
    lng: -117.92936766691095,
  };

  useEffect(async () => {
    let tempProjectLocation = [];
    let tempProjectInfo = [];
    await axios({
      method: "get",
      url: `/api/project-same-address`,
      timeout: 5000, // 5 seconds timeout
      headers: {},
    }).then(response => {
      tempProjectLocation = response.data;
      // console.log(response);
    });

    await axios({
      method: "get",
      url: `/api/project-info`,
      timeout: 5000, // 5 seconds timeout
      headers: {},
    }).then(response => {
      tempProjectInfo = response.data;
      // console.log(response);
    });

    setData({
      projectLocation: tempProjectLocation,
      projectInfo: tempProjectInfo,
      temp: 1,
    });
  }, []);

  useEffect(() => {
    if (jobNumberSelect != 0) {
      for (let i = 0; i < data.projectInfo.length; i++) {
        if (data.projectInfo[i].JobNumber == jobNumberSelect) {
          setRightPanelState({
            JobNumber: data.projectInfo[i].JobNumber,
            ProjectID: data.projectInfo[i].ProjectID,
            ProjectGroup: data.projectInfo[i].ProjectGroup,
            ProjectName: data.projectInfo[i].ProjectName,
            ProjectAddress: data.projectInfo[i].Address,
            AddressLabel: data.projectInfo[i].AddressLabel,
            Distance: data.projectInfo[i].Distance,
          });
          break;
        }
      }
    } else {
      setRightPanelState({
        JobNumber: 0,
        ProjectID: 0,
        ProjectGroup: "",
        ProjectName: "",
        ProjectAddress: "",
        AddressLabel: "",
        Distance: "",
      });
    }
  }, [jobNumberSelect]);

  const handleApiLoaded = (map, maps) => {};

  return (
    <div style={{ display: "flex" }}>
      <div style={{ height: "98vh", width: "80%" }}>
        {data.temp == 1 && (
          <GoogleMapReact
            bootstrapURLKeys={{ key: apiKey }}
            defaultCenter={ex1.center}
            defaultZoom={ex1.zoom}
            options={
              satelliteState == true
                ? map => ({ mapTypeId: map.MapTypeId.HYBRID })
                : map => ({ mapTypeId: map.MapTypeId.ROADMAP })
            }
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            {data.projectLocation.map(item => {
              return (
                <ProjectComponent
                  lat={item.lat}
                  lng={item.lng}
                  key={item.MaxProjectID}
                  Label={item.Label}
                  MaxProjectID={item.MaxProjectID}
                  lat={item.lat}
                  lng={item.lng}
                  // ProjectGroup={item.ProjectGroup}
                  // ProjectName={item.ProjectName}
                  // ProjectAddress={item.ProjectAddress}
                />
              );
            })}

            {/* <ProjectComponent
              lat={data.project[1].lat}
              lng={data.project[1].lng}
              key={data.project[1].ProjectID}
              ProjectID={data.project[1].ProjectID}
              ProjectGroup={data.project[1].ProjectGroup}
              ProjectName={data.project[1].ProjectName}
              ProjectAddress={data.project[1].ProjectAddress}
            />
            <ProjectComponent
              lat={data.project[2].lat}
              lng={data.project[2].lng}
              key={data.project[2].ProjectID}
              ProjectID={data.project[2].ProjectID}
              ProjectGroup={data.project[2].ProjectGroup}
              ProjectName={data.project[2].ProjectName}
              ProjectAddress={data.project[2].ProjectAddress}
            /> */}
            <HQ lat={office.lat} lng={office.lng} />
          </GoogleMapReact>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "98vh",
          width: "20%",
          marginLeft: "20px",
        }}
      >
        <div>
          <br />
          {/* <TextField
            className={styles["right__project-job-number"]}
            id="JobNumber"
            label="Job Number"
            defaultValue={0}
            value={
              state.Label.toString().length > 3 ? state.Label : state.Label
            }
          /> */}
          {Array.isArray(state.Label) ? (
            <div style={{ display: "flex" }}>
              <p
                style={{
                  margin: "0px",
                  marginRight: "10px",
                  fontFamily: "sans-serif",
                }}
              >
                Job Number
              </p>
              <select
                className={styles["select-job-number"]}
                value={jobNumberSelect}
                onChange={e => setJobNumberSelect(e.target.value)}
              >
                <option value={0}>--------</option>
                {state.Label.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              <p
                style={{
                  margin: "0px",
                  marginRight: "10px",
                  fontFamily: "sans-serif",
                }}
              >
                Job Number
              </p>
              <select className={styles["select-job-number"]}>
                <option value={state.Label}>{state.Label}</option>
              </select>
            </div>
          )}

          <br />
          <TextField
            className={styles["right__project-group"]}
            id="ProjectGroup"
            label="Project Group"
            defaultValue={0}
            value={rightPanelState.ProjectGroup}
          >
            Project Group: {rightPanelState.ProjectGroup}
          </TextField>
          <br />
          <br />
          <TextField
            className={styles["right__project-name"]}
            id="ProjectName"
            label="Project Name"
            defaultValue={0}
            value={rightPanelState.ProjectName}
          >
            Project Name: {rightPanelState.ProjectName}
          </TextField>
          <br />
          <br />
          <TextField
            className={styles["right__project-address-label"]}
            id="AddressLabel"
            label="Address Label"
            defaultValue={0}
            value={rightPanelState.AddressLabel}
          >
            Address Label: {rightPanelState.AddressLabel}
          </TextField>
          <br />
          <br />
          <TextField
            className={styles["right__project-address"]}
            id="ProjectAddress"
            label="Project Address"
            defaultValue={0}
            value={rightPanelState.ProjectAddress}
          >
            Project Address: {rightPanelState.ProjectAddress}
          </TextField>
          <br />
          <br />
          <TextField
            className={styles["right__project-distance"]}
            id="Distance"
            label="Distance"
            defaultValue={0}
            value={
              rightPanelState.Distance == ""
                ? ""
                : rightPanelState.Distance + " miles"
            }
          >
            Distance: {rightPanelState.Distance} mi
          </TextField>
        </div>
        <div>
          <div>
            {/* <TextField
              className={styles["right__project-distance"]}
              id="Distance"
              label="Distance"
              defaultValue={0}
              value={
                rightPanelState.Distance == ""
                  ? ""
                  : rightPanelState.Distance + " miles"
              }
            >
              Distance: {rightPanelState.Distance} mi
            </TextField>
            <br />
            <br />
            <TextField
              className={styles["right__project-distance"]}
              id="Distance"
              label="Distance"
              defaultValue={0}
              value={
                rightPanelState.Distance == ""
                  ? ""
                  : rightPanelState.Distance + " miles"
              }
            >
              Distance: {rightPanelState.Distance} mi
            </TextField> */}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "50px",
            }}
          >
            <p
              style={{
                fontFamily: "sans-serif",
                marginTop: "10px",
                fontWeight: "500",
                color: "#807a7a",
              }}
            >
              Satellite
            </p>
            <Switch
              checked={satelliteState}
              onChange={
                satelliteState == true
                  ? () => setSatelliteState(false)
                  : () => setSatelliteState(true)
              }
              name="check"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
