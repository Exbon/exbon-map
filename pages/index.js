import GoogleMapReact from "google-map-react";
import { apiKey } from "../apiKey.js";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import styles from "./index.module.css";

export default function Index() {
  const ex1 = {
    center: {
      lat: 33.76176289096943,
      lng: -117.92945707982629,
    },
    zoom: 8,
  };

  const AnyReactComponent = ({
    ProjectID,
    ProjectGroup,
    ProjectName,
    ProjectAddress,
  }) => (
    <div
      className={
        state.ProjectID == ProjectID
          ? styles["marker-label-select"]
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
      onClick={() =>
        setstate({
          ProjectID: ProjectID,
          ProjectGroup: ProjectGroup,
          ProjectName: ProjectName,
          ProjectAddress: ProjectAddress,
        })
      }
    >
      {ProjectID}
    </div>
  );
  // const AnyReactComponent2 = ({
  //   ProjectID,
  //   ProjectGroup,
  //   ProjectName,
  //   ProjectAddress,
  // }) => (
  //   <div
  //     style={{
  //       color: "red",
  //       cursor: "pointer",
  //       fontWeight: "800",
  //       fontSize: "1.5em",
  //     }}
  //     onClick={() =>
  //       setstate({
  //         ProjectID: ProjectID,
  //         ProjectGroup: ProjectGroup,
  //         ProjectName: ProjectName,
  //         ProjectAddress: ProjectAddress,
  //       })
  //     }
  //   >
  //     {ProjectID}
  //   </div>
  // );

  const data = {
    project: [
      {
        ProjectID: 6236,
        ProjectGroup: "CSUB J20",
        ProjectName: "SCI II Room 336",
        ProjectAddress: "9001 Stockdale Hwy, Bakersfield, CA 93311",
        lat: 35.34763148279404,
        lng: -119.1008342523971,
      },
      {
        ProjectID: 6078,
        ProjectGroup: "CSUF J20",
        ProjectName: "Campus Exterior Repair",
        ProjectAddress: "800 N State College Blvd, Fullerton, CA 92831",
        lat: 33.88223690824987,
        lng: -117.88930859993005,
      },
      {
        ProjectID: 6300,
        ProjectGroup: "LACCD M20",
        ProjectName: "ELAC Campus Wide Duct Cleaning",
        ProjectAddress: "770 Wilshire Blvd, Los Angeles, CA 90017",
        lat: 33.72466095133255,
        lng: -117.94675948336074,
      },
    ],
  };
  const [state, setstate] = useState({
    ProjectID: "",
    ProjectGroup: "",
    ProjectName: "",
    ProjectAddress: "",
  });

  return (
    <div style={{ display: "flex" }}>
      <div style={{ height: "100vh", width: "80%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey }}
          defaultCenter={ex1.center}
          defaultZoom={ex1.zoom}
        >
          {/* {data.project.map(item => {
            return (
              <AnyReactComponent
                lat={item.lat}
                lng={item.lng}
                key={item.ProjectID}
                ProjectID={item.ProjectID}
                ProjectGroup={item.ProjectGroup}
                ProjectName={item.ProjectName}
                ProjectAddress={item.ProjectAddress}
              />
            );
          })} */}
          <AnyReactComponent
            lat={data.project[0].lat}
            lng={data.project[0].lng}
            key={data.project[0].ProjectID}
            ProjectID={data.project[0].ProjectID}
            ProjectGroup={data.project[0].ProjectGroup}
            ProjectName={data.project[0].ProjectName}
            ProjectAddress={data.project[0].ProjectAddress}
          />
          <AnyReactComponent
            lat={data.project[1].lat}
            lng={data.project[1].lng}
            key={data.project[1].ProjectID}
            ProjectID={data.project[1].ProjectID}
            ProjectGroup={data.project[1].ProjectGroup}
            ProjectName={data.project[1].ProjectName}
            ProjectAddress={data.project[1].ProjectAddress}
          />
          <AnyReactComponent
            lat={data.project[2].lat}
            lng={data.project[2].lng}
            key={data.project[2].ProjectID}
            ProjectID={data.project[2].ProjectID}
            ProjectGroup={data.project[2].ProjectGroup}
            ProjectName={data.project[2].ProjectName}
            ProjectAddress={data.project[2].ProjectAddress}
          />
        </GoogleMapReact>
      </div>
      <div style={{ height: "100vh", width: "20%", marginLeft: "20px" }}>
        <br />
        <TextField
          className={styles["right__project-id"]}
          id="ProjectID"
          label="Project ID"
          defaultValue={0}
          value={state.ProjectID}
        />
        <br />
        <br />
        <TextField
          className={styles["right__project-group"]}
          id="ProjectGroup"
          label="Project Group"
          defaultValue={0}
          value={state.ProjectGroup}
        >
          Project Group: {state.ProjectGroup}
        </TextField>
        <br />
        <br />
        <TextField
          className={styles["right__project-name"]}
          id="ProjectName"
          label="Project Name"
          defaultValue={0}
          value={state.ProjectName}
        >
          Project Name: {state.ProjectName}
        </TextField>
        <br />
        <br />
        <TextField
          className={styles["right__project-address"]}
          id="ProjectAddress"
          label="Project Address"
          defaultValue={0}
          value={state.ProjectAddress}
        >
          Project Address: {state.ProjectAddress}
        </TextField>
      </div>
    </div>
  );
}
