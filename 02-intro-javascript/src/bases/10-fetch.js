
const apiKey = "H38jUJc7OiYLe857I1G8bs75BGBC76tk";

const peticion = fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`);

peticion
.then( resp => resp.json() )
.then( ({data}) => {
    const {url} = data.images.original;

    const img = document.createElement('img');
    img.src = url;

    document.body.append (img);
})
.catch(console.warn);