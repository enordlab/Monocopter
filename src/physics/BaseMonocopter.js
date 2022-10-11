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
  };

  advance_state = (dt) => {
    // TODO : z_dot_dot -> z_dot -> z
  };
}

export default MonoCopter;
