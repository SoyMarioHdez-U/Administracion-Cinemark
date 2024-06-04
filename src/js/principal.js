document.addEventListener('DOMContentLoaded', () => {
    const peliculas= document.getElementById('btn-tabla');
    const funciones = document.getElementById('btn-funciones');
    const reservas = document.getElementById('btn-reservas');

    funciones.addEventListener('click', (e) =>{
        window.location.href = 'funciones.html'
    });
    peliculas.addEventListener('click', (e) =>{
        window.location.href = 'tabla.html'
    });
    reservas.addEventListener('click', (e) =>{
        window.location.href = 'reservas.html'
    });

});