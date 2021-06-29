import Film from './Film.js';
import Actor from './Actor.js';
import Studio from './Studio.js';

Film.hasMany(Actor);
Actor.belongsTo(Film);
Studio.hasMany(Film, { foreignKey: 'film' });
Film.belongsTo(Studio, { foreignKey: 'studioId' });

