import { Sequelize } from 'sequelize';
import db from '../utils/db';

class Studio extends Sequelize.Model{}

Studio.init({
  //creating studio attributes
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.DataTypes.STRING,
  },
  state: {
    type: Sequelize.DataTypes.STRING
  },
  country: {
    type: Sequelize.DataTypes.STRING
  }
}, {
  sequelize: db,
  modelName: 'Studio',
  underscored: true
});


export default Studio;
