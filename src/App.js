import React from "react";

import MonocopterComponent from "./components/MonocopterComponent";
import ControlBoxComponent from "./components/ControlBoxComponent";
import Plot from "react-plotly.js";
import MonoCopter from "./physics/BaseMonocopter";
import Controller from "./physics/BaseController";

import "./App.css";

const MS_DELAY = 10;
const MILLI_DT = 0.01;

const INIT = {
  copter: {
    thrust: 0,
    k_f: 0.1,
    mass: 1.0,
    z: 0.0,
    z_dot: 0,
    z_list: [], // new Uint8Array([]),
    target_z_list: [] // new Uint8Array([])
  },
  controlBox: {
    state: {
      ready: false,
      manual: false
    },
    throttle: 0,
    mass_error: 1.0,
    k_p: 10,
    k_d: 0,
    k_i: 0,
    target_z: -1.0
  }
};

class App extends React.Component {
  constructor() {
    super();
    this.state = INIT;
    this.dt = MILLI_DT;
  }

  initialize = () => {
    this.setState(INIT, () => {
      this.monocopter = new MonoCopter(this.state.copter);
      this.controller = new Controller(this.monocopter, this.state);
      if ( this.controller.name !== "PidController" ) {
        INIT.copter.z = -1.0;
      }
    });
    this.copterStateInit();
  };

  componentDidMount() {
    this.initialize();
    setInterval(this.update, MS_DELAY);
  }

  stopFunction = () => {
    this.setState({
      ...this.state,
      controlBox: {
        ...this.state.controlBox,
        state: { ...this.state.controlBox.state, ready: false }
      }
    });
  };

  update = () => {
    if (this.state.controlBox.state.ready) {
      this.controller.runBy(this.dt, this.stopFunction);
      this.copterStateUpdate(this.monocopter.z, this.monocopter.thrust);
    }
  };

  copterStateInit = () => {
    this.setState({ ...this.state, copter: INIT.copter }, () => {
      this.monocopter = new MonoCopter(this.state.copter);
      this.controller = new Controller(this.monocopter, this.state);
      this.stopFunction();
    });
  };

  copterStateUpdate = (z, thrust) => {
    this.setState({
      ...this.state,
      copter: {
        ...this.state.copter,
        z,
        thrust,
        z_list: [...this.state.copter.z_list, -z],
        target_z_list: [
          ...this.state.copter.target_z_list,
          -this.state.controlBox.target_z
          // thrust
        ]
      }
    });
  };

  controlBoxChanged = (controlBox) => {
    this.setState({ ...this.state, controlBox }, () => {
      this.monocopter = new MonoCopter(this.state.copter);
      this.controller = new Controller(this.monocopter, this.state);
    });
  };

  controlStateChanged = (controlState) => {
    this.setState({
      ...this.state,
      controlBox: { ...this.state.controlBox, state: controlState }
    });
  };

  render() {
    return (
      <div className="App">
        <MonocopterComponent copter={this.state.copter} />
        <ControlBoxComponent
          controlBox={this.state.controlBox}
          controlBoxChanged={this.controlBoxChanged}
          controlStateChanged={this.controlStateChanged}
          copterStateInit={this.copterStateInit}
        />

        <Plot
          style={{
            left: 130,
            top: 190,
            position: "absolute"
          }}
          config={{
            displayModeBar: false
          }}
          data={[
            {
              type: "scatter",
              showlegend: false,
              y: this.state.copter.z_list,
              mode: "lines+points",
              marker: { color: "white" }
            },
            {
              type: "scatter",
              showlegend: false,
              y: this.state.copter.target_z_list,
              mode: "lines+points",
              marker: { color: "red" }
            }
          ]}
          layout={{
            title: `Monocopter ${this.controller ? this.controller.name : ""}`,
            width: 650,
            height: 400,
            margin: {l: 35, r:30, t:35, b:32},
            paper_bgcolor: "#000000",
            plot_bgcolor: "#000000",
            font: { color: "#ffffff" }
          }}
        />
      </div>
    );
  }
}
export default App;
