class Controller {
  constructor(monocopter, state) {
    this.name = "OpenController";
    this.monocopter = monocopter;
    this.mass_error = state.controlBox.mass_error;
    this.monocopter.omega = this.calculate_omega_from_velocity(0.0);
  }

  calculate_omega_from_velocity = (linear_acc) => {
    // TODO : calculate omega from acceleration
    return 0;
  };

  runBy = (dt, stopFunction) => {
    this.monocopter.advance_state(dt);
    if (stopFunction) {
      if (this.monocopter.z > 0) {
        stopFunction();
        this.monocopter.z = 0;
      }
    }
  };

}

export default Controller;
