import React from "react";
import { Typography, Slider, Button } from "@material-ui/core";

const LEFT = 170;
const TOP = 22;
const GAP = 30;
const SLD_GAP = 150;

class ControlBoxComponent extends React.Component {
  render() {
    return (
      <div>
        <Typography
          style={{
            left: LEFT,
            top: TOP,
            position: "absolute",
            color: "#ffffff"
          }}
          id="discrete-slider-small-steps"
          gutterBottom
        >
          Mass Err &nbsp;&nbsp;: &nbsp;&nbsp;{this.props.controlBox.mass_error}
        </Typography>
        <Slider
          style={{
            left: LEFT + SLD_GAP,
            top: TOP,
            width: 400,
            position: "absolute"
          }}
          defaultValue={0}
          value={this.props.controlBox.mass_error}
          onChange={(event, value) => {
            this.props.controlBoxChanged({
              ...this.props.controlBox,
              mass_error: value
            });
          }}
          min={0.5}
          max={3.0}
          step={0.01}
        />
        <Typography
          style={{
            left: LEFT,
            top: TOP + GAP,
            position: "absolute",
            color: "#ffffff"
          }}
          id="discrete-slider-small-steps"
          gutterBottom
        >
          P value : &nbsp;&nbsp;{this.props.controlBox.k_p}
        </Typography>
        <Slider
          style={{
            left: LEFT + SLD_GAP,
            top: TOP + GAP,
            width: 400,
            position: "absolute"
          }}
          defaultValue={0}
          value={this.props.controlBox.k_p}
          onChange={(event, value) => {
            this.props.controlBoxChanged({
              ...this.props.controlBox,
              k_p: value
            });
          }}
          min={0}
          max={50}
          step={1}
        />
        <Typography
          style={{
            left: LEFT,
            top: TOP + GAP * 2,
            position: "absolute",
            color: "#ffffff"
          }}
          id="discrete-slider-small-steps"
          gutterBottom
        >
          D value : &nbsp;&nbsp;{this.props.controlBox.k_d}
        </Typography>
        <Slider
          style={{
            left: LEFT + SLD_GAP,
            top: TOP + GAP * 2,
            width: 400,
            position: "absolute"
          }}
          defaultValue={0}
          value={this.props.controlBox.k_d}
          onChange={(event, value) => {
            this.props.controlBoxChanged({
              ...this.props.controlBox,
              k_d: value
            });
          }}
          min={0}
          max={20}
          step={1}
        />
        <Typography
          style={{
            left: LEFT,
            top: TOP + GAP * 3,
            position: "absolute",
            color: "#ffffff"
          }}
          id="discrete-slider-small-steps"
          gutterBottom
        >
          I&nbsp; value : &nbsp;&nbsp;{this.props.controlBox.k_i}
        </Typography>
        <Slider
          style={{
            left: LEFT + SLD_GAP,
            top: TOP + GAP * 3,
            width: 400,
            position: "absolute"
          }}
          defaultValue={0}
          value={this.props.controlBox.k_i}
          onChange={(event, value) => {
            this.props.controlBoxChanged({
              ...this.props.controlBox,
              k_i: value
            });
          }}
          min={0}
          max={20}
          step={1}
        />
        <Button
          variant="contained"
          color="default"
          style={{
            position: "absolute",
            left: LEFT + 180,
            top: TOP + GAP * 4.5,
            width: 80,
            height: 25
          }}
          onClick={(event) => {
            this.props.copterStateInit();
          }}
        >
          Init
        </Button>
        <Button
          variant="contained"
          color={this.props.controlBox.state.ready ? "secondary" : "default"}
          style={{
            position: "absolute",
            left: LEFT + 300,
            top: TOP + GAP * 4.5,
            width: 80,
            height: 25
          }}
          onClick={(event) => {
            this.props.controlStateChanged({
              ...this.props.controlBox.state,
              ready: this.props.controlBox.state.ready ? false : true
            });
          }}
        >
          Run
        </Button>
      </div>
    );
  }
}
export default ControlBoxComponent;
