class Controller {
  constructor(monocopter, state) {
    this.name = "BaseController";
    this.monocopter = monocopter;
    this.mass_error = state.controlBox.mass_error;
  }

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
