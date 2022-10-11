class MonoCopter {
  constructor(prop) {
    this.initialize(prop.z, prop.mass);
  }

  initialize = (z, m) => {
    this.g = 9.81;

    this.z = z;
    this.z_dot = 0.0;

    this.m = m;

    this.thrust = 0;
  };

  z_dot_dot = () => {
    var f_net = this.m * this.g - this.thrust;
    return f_net / this.m;
  };

  advance_state = (dt) => {
    var delta_z_dot = this.z_dot_dot() * dt;
    this.z_dot = this.z_dot + delta_z_dot;

    var delta_z = this.z_dot * dt;
    this.z = this.z + delta_z;
  };
}

export default MonoCopter;
