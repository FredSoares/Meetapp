import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';

// array of all models
const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // create the database connections
    this.connection = new Sequelize(databaseConfig);

    // pass the connection to all models
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
