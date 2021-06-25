import { Sequelize } from 'sequelize/types';
import db from '../utils/db';

class Actor extends Sequelize.Model{}

Actor.init({
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  dob: {
    type: Sequelize.DataTypes.DATE
  },
  pob: {
    type: Sequelize.DataTypes.STRING
  }
}, {
  sequelize: db,
  modelName: 'Actor',
  underscored: true
});
