// Desestructuracion
// Asignacion desestructurante

const persona = {
    nombre: 'Tony',
    edad: 45,
    clave: 'Ironman',
    rango: 'Soldado'
};

const { nombre , edad, clave} = persona;

// console.log(nombre);
// console.log(edad);
// console.log(clave);

const useeContext = ( { clave, nombre, edad, rango = 'Capitan'}) => {
    // console.log( nombre , edad, rango);
    return {
        nombreClave: clave,
        anios: edad,
        latlng: {
            lat: 14.12321,
            lng: -12.3232
        }
    }
}

const {nombreClave, anios, latlng:{ lat, lng}} = useeContext( persona );

console.log(nombreClave, anios);
console.log(lat, lng);