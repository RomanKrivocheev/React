
//import { heroes} from './data/heroes';

//import { heroes } from "./data/heroes";
import heroes, {owners} from "../data/heroes";

//console.log (owners);


export const getHeroeById = (id) => {
    return heroes.find( (heroes) => heroes.id === id);
}

// console.log( getHeroeById(2));

// find solo devuelve uno. se debe utilizar FILTER
export const getHeroesByOwner = (owner) => heroes.filter ((heroe) => heroe.owner === owner);

//console.log( getHeroesByOwner('Marvel'));