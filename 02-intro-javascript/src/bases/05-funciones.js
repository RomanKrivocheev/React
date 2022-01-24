
const saludar = function saludar(nombre) {
    return ` Hola, ${ nombre }` ;
}

const saludar2 = (nombre) => {
    return ` Hola, ${ nombre }` ;
}

const saludar3 = (nombre) => ` Hola, ${ nombre }` ;

const saludar4 = () => ` Hola` ;

console.log(saludar2('Vegeta'));

const getUser = () => {
    return {
        uid: 'ABC123',
        username : 'El_Papi1502'
    }
}

console.log( getUser());

// Tarea
const getUsuarioActivo = (nombre) => ({
        uid: 'ABC567',
        username: nombre
})

const usuarioActivo = getUsuarioActivo('Fernando');
console.log( usuarioActivo);
