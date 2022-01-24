
const personajes = ['Goku', 'Vegeta' , 'Trunks'];

// Para renombrar, apretar f2 sobre el nombre
const [, ,p3] = personajes;

//console.log (p3);
// console.log (personajes [0]);
// console.log (personajes [0]);
// console.log (personajes [0]);

const retornaArreglo = () => {
    return ['ABC', 123];
}

const [letras, numeros] = retornaArreglo();
//console.log(letras, numeros);

//Tarea
// 1. El primer valor del arr se llamara nombre
// 2. El segundo se llamara setNombre
const useeState = ( valor ) => {
    return [valor, () => { console.log('Hola Mundo')}];
}

const [nombre, setNombre] = useeState ( ' Goku');

console.log(nombre);
setNombre();
// arr[1]();