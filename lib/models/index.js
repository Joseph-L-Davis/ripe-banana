import Film from './Film';
import Actor from './Actor';

Film.hasMany(Actor);
Actor.hasMany(Film);
