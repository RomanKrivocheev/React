
const saludar = function saludar (nombre) {
    return ` Hola, ${ nombre }` ;
}

const saludar2 = (nombre) => {
    return `Hola , ${nombre} `;
}

const saludar3 = (nombre) => `Hola , ${nombre} `;
const saludar4 = () => `Hola Mundo `;

console.log(saludar4());

const getUser = () => ({
    
        uid: 'ABC123',
        username: 'El_Papi1502'
    
});


const user = getUser();

console.log(getUser());

//Tarea
//1. Transformen a una funcion de flecha
//2. Tiene que retornan un objeto implicito
//3. Pruebas
const getUsuarioActivo = (nombre) => ({
    uid: 'ABC567',
    username: nombre
});

const usuarioActivo = getUsuarioActivo('Fernando');
console.log(usuarioActivo);
