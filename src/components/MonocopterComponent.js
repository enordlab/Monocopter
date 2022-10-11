import React from "react";

import monocopter from "../assets/monocopter.png";
import monocopter_flying from "../assets/monocopter_flying.png";
import audioFile from "../assets/tot.wav";

import "./Monocopter.css";

const x_pos = 20;
const y_pos = 20;

const tube_x = x_pos;
const tube_y = y_pos;
const tube_h = 550;

const drone_x = x_pos + 57;
const drone_y = y_pos + tube_h - 20;

const audio = new Audio(audioFile);

class MonocopterComponent extends React.Component {
  render() {
    var monocopterImage = monocopter;
    if ( this.props.copter.thrust ) {
      monocopterImage = this.props.copter.thrust > 0 ? monocopter_flying : monocopter;
      if (this.props.copter.thrust > 0) {
        var vol = Math.floor(this.props.copter.thrust) / 20;
        if ( vol > 1 ) vol = 1;
        // console.log(vol);
        audio.volume = vol;
        audio.play();
      }
    }
    return (
      <div>
        <div
          className="drone"
          style={{
            left: drone_x,
            top: drone_y + this.props.copter.z * 240,
            backgroundImage: `url(${monocopterImage})`,
            backgroundSize: "100% 100%"
          }}
        />
        <div className="cylinder" style={{ left: tube_x, top:tube_y }}>
            <div className="ellipse" style={{ backgroundColor: "deepskyblue" }}></div>
            <div className="rectangle" style={{ backgroundColor: "lightgray" }}></div>
        </div>
      </div>
    );
  }
}

export default MonocopterComponent;
