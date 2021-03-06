import GoogleMapReact, {
  GoogleMap,
  DirectionsRenderer,
} from "google-map-react";
import { apiKey } from "../apiKey.js";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import styles from "./index.module.css";
import Switch from "@material-ui/core/Switch";
import axios from "axios";

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
    Distance,
    Duration,
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
      onClick={() => {
        let index = 0;
        let newDistance = "";
        let newDuration = "";
        if (Distance == "") {
          for (let i = 0; i < data.project.length; i++) {
            if (data.project[i].ProjectID == ProjectID) {
              index = i;
              break;
            }
          }
          newDistance = loadAPI.rows[0].elements[index].distance.text;
          newDuration = loadAPI.rows[0].elements[index].duration.text;
        }

        setState({
          ProjectID: ProjectID,
          ProjectGroup: ProjectGroup,
          ProjectName: ProjectName,
          ProjectAddress: ProjectAddress,
          Distance: Distance == "" ? newDistance : Distance,
          Duration: Duration == "" ? newDuration : Duration,
        });
      }}
    >
      {ProjectID}
    </div>
  );
  const AnyReactComponent2 = () => (
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
    ProjectID: "",
    ProjectGroup: "",
    ProjectName: "",
    ProjectAddress: "",
    Distance: "",
    Duration: "",
  });

  const [satelliteState, setSatelliteState] = useState(false);
  const [data, setData] = useState({ temp: 0 });
  const [loadAPI, setLoadAPI] = useState(false);

  useEffect(() => {
    let tempData = {
      project: [
        {
          ProjectID: 6236,
          ProjectGroup: "CSUB J20",
          ProjectName: "SCI II Room 336",
          ProjectAddress: "9001 Stockdale Hwy, Bakersfield, CA 93311",
          lat: 35.34763148279404,
          lng: -119.1008342523971,
          Distance: "",
          Duration: "",
        },
        {
          ProjectID: 6078,
          ProjectGroup: "CSUF J20",
          ProjectName: "Campus Exterior Repair",
          ProjectAddress: "800 N State College Blvd, Fullerton, CA 92831",
          lat: 33.88223690824987,
          lng: -117.88930859993005,
          Distance: "",
          Duration: "",
        },
        {
          ProjectID: 6300,
          ProjectGroup: "LACCD M20",
          ProjectName: "ELAC Campus Wide Duct Cleaning",
          ProjectAddress: "770 Wilshire Blvd, Los Angeles, CA 90017",
          lat: 34.048918222592384,
          lng: -118.25801648828637,
          Distance: "",
          Duration: "",
        },
      ],
      office: {
        lat: 33.76179647059898,
        lng: -117.92936766691095,
      },
      temp: 1,
    };

    setData(tempData);
  }, []);

  useEffect(() => {
    if (loadAPI != false) {
      let tempData = data;
      for (let i = 0; i < tempData.project.length; i++) {
        tempData.project[i].Distance =
          loadAPI.rows[0].elements[i].distance.text;
        tempData.project[i].Duration =
          loadAPI.rows[0].elements[i].duration.text;
      }

      setData(tempData);
    }
  }, [loadAPI]);

  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
    var origin1 = new google.maps.LatLng(
      33.76179647059898,
      -117.92936766691095
    );

    const tempArrayDestination = [
      { lat: 34.721659, lng: -120.532379 },
      { lat: 36.2383794, lng: -115.055188 },
      { lat: 33.7657707, lng: -118.2109489 },
      { lat: 36.8108284, lng: -119.7462226 },
      { lat: 33.8822013, lng: -117.8893837 },
      { lat: 33.8822013, lng: -117.8893837 },
      { lat: 34.0410891, lng: -118.1509726 },
      { lat: 33.8822013, lng: -117.8893837 },
      { lat: 35.3475588, lng: -119.1026197 },
      { lat: 33.8822013, lng: -117.8893837 },
    ];
    let arrayDestination = [];
    for (let i = 0; i < tempArrayDestination.length; i++) {
      arrayDestination.push(
        new google.maps.LatLng(
          tempArrayDestination[i].lat,
          tempArrayDestination[i].lng
        )
      );
    }

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin1],
        destinations: arrayDestination,
        travelMode: "DRIVING",
        unitSystem: google.maps.UnitSystem.IMPERIAL,
      },
      callback
    );

    const directionsService = new google.maps.DirectionsService();
    // const directionsRenderer = new google.maps.DirectionsRenderer({
    //   suppressMarkers: true,
    // });
    const directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
    });
    directionsRenderer.setMap(map);

    const timeData = [
      { date: "2021-07-25 14:14:36", lat: 33.7379089, lng: -117.9548602 },
      { date: "2021-07-25 14:15:53", lat: 33.731713, lng: -117.954614 },
      { date: "2021-07-25 14:16:45", lat: 33.7264542, lng: -117.95469 },
      { date: "2021-07-25 14:17:10", lat: 33.7215794, lng: -117.9546431 },
      { date: "2021-07-25 14:17:37", lat: 33.716913, lng: -117.9546024 },
      { date: "2021-07-25 14:32:20", lat: 33.7341136, lng: -117.9546168 },
      { date: "2021-07-25 14:33:22", lat: 33.73922288, lng: -117.9547119 },
    ];

    let wayPoints = [];
    for (let i = 0; i < timeData.length; i++) {
      if (i != 0 && i != timeData.length - 1) {
        wayPoints.push({
          location: new google.maps.LatLng(timeData[i].lat, timeData[i].lng),
        });
      }
    }
    const origin = {
      lat: timeData[0].lat,
      lng: timeData[0].lng,
    };
    const destination = {
      lat: timeData[timeData.length - 1].lat,
      lng: timeData[timeData.length - 1].lng,
    };

    for (let i = 0; i < timeData.length; i++) {
      const contentString = `<div><p>${timeData[i].date}</p></div>`;
      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
      const location = { lat: timeData[i].lat, lng: timeData[i].lng };
      const marker = new google.maps.Marker({
        //marker ??????
        position: location,
        map,
        label: String.fromCharCode(65 + i),
      });
      marker.addListener("click", () => {
        // marker click event
        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });
      });
    }

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: wayPoints,
      },

      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );

    function callback(response, status) {
      // See Parsing the Results for
      // the basics of a callback function.
      setLoadAPI(response);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {loadAPI.rows != undefined &&
        loadAPI.rows[0].elements.map((item, index) => {
          console.log(index + 51 + ": " + item.distance.text);
        })}

      {console.log()}
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
              Distance={data.project[0].Distance}
              Duration={data.project[0].Duration}
            />
            <AnyReactComponent
              lat={data.project[1].lat}
              lng={data.project[1].lng}
              key={data.project[1].ProjectID}
              ProjectID={data.project[1].ProjectID}
              ProjectGroup={data.project[1].ProjectGroup}
              ProjectName={data.project[1].ProjectName}
              ProjectAddress={data.project[1].ProjectAddress}
              Distance={data.project[1].Distance}
              Duration={data.project[1].Duration}
            />
            <AnyReactComponent
              lat={data.project[2].lat}
              lng={data.project[2].lng}
              key={data.project[2].ProjectID}
              ProjectID={data.project[2].ProjectID}
              ProjectGroup={data.project[2].ProjectGroup}
              ProjectName={data.project[2].ProjectName}
              ProjectAddress={data.project[2].ProjectAddress}
              Distance={data.project[2].Distance}
              Duration={data.project[2].Duration}
            />
            <AnyReactComponent2 lat={data.office.lat} lng={data.office.lng} />
          </GoogleMapReact>
        )}
      </div>
      <div style={{ height: "98vh", width: "20%", marginLeft: "20px" }}>
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

        <br />
        <br />
        <TextField
          className={styles["right__project-distance"]}
          id="ProjectDistance"
          label="Distance From HQ"
          defaultValue={0}
          value={state.Distance}
        >
          Distance: {state.Distance}
        </TextField>
        <br />
        <br />
        <TextField
          className={styles["right__project-duration"]}
          id="ProjectDuration"
          label="Duration From HQ"
          defaultValue={0}
          value={state.Duration}
        >
          Duration : {state.Duration}
        </TextField>

        <div style={{ display: "flex", marginTop: "100px" }}>
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
  );
}
