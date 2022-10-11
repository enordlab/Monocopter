class Controller {
  constructor(monocopter, state) {
    this.name = "PidController";
    this.monocopter = monocopter;
    this.mass_error = state.controlBox.mass_error;

    this.k_p = state.controlBox.k_p;
    this.k_d = state.controlBox.k_d;
    this.k_i = state.controlBox.k_i;
    this.integral_z = 0;
    this.g = 9.81;
    this.target_z = state.controlBox.target_z;
    this.target_z_dot = 0;
  }

  thrust_control = (target_z, actual_z, dt) => {
    // TODO : trust = measure_error * parameter
    return 0;
  };

  runBy = (dt) => {
    this.monocopter.thrust = this.thrust_control(
      this.target_z,
      this.monocopter.z,
      this.target_z_dot,
      this.monocopter.z_dot,
      dt
    );
    this.monocopter.advance_state(dt);
  };

}

export default Controller;
