
const activo = true;

// let mensaje = '';

// if(activo) {
//     mensaje = 'Activo';
// } else {
//     mensaje = 'Inactivo';
// }

//const mensaje = (!activo) ? 'Activo' : 'Inactivo';

// operador sin la parte del false
const mensaje = !activo && 'Activo';

console.log(mensaje);