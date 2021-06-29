import Film from './Film';
import Actor from './Actor';
import Studio from './Studio';

Film.hasMany(Actor);
Actor.hasMany(Film);
Studio.hasMany(Film);
Film.belongsTo(Studio);


