class MonoCopter {
  constructor(prop) {
    this.initialize(prop.z, prop.mass, prop.k_f);
  }

  initialize = (z, m, k_f) => {
    this.g = 9.81;

    this.z = z;
    this.z_dot = 0.0;

    this.m = m;
    this.k_f = k_f;

    this.omega = 0.0;

    this.thrust = 0;
  };

  z_dot_dot = () => {
    return this.g;
    // TODO : calculate required z_dot_dot
  };

  advance_state = (dt) => {
    var delta_z_dot = this.z_dot_dot() * dt;
    this.z_dot = this.z_dot + delta_z_dot;

    var delta_z = this.z_dot * dt;
    this.z = this.z + delta_z;
  };
}

export default MonoCopter;
