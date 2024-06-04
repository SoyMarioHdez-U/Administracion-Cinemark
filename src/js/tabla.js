document.addEventListener('DOMContentLoaded', () => {
    const dataTable = document.getElementById('data-table'); // Sacar las id de los forms
    const newP = document.getElementById('btn-newp');
    const regresar = document.getElementById('btn-regre');

    // Función para cargar datos en la tabla
    async function loadData() {
        try {
            const response = await fetch('http://localhost:3000/peliculas');
            const data = await response.json();
            
            // Limpiar la tabla antes de cargar los nuevos datos
            dataTable.innerHTML = '<thead class="thead-light"><tr><th>#</th><th>Pelicula</th><th>Descripción</th><th>Director</th><th>Duración</th><th>Idioma</th><th>Estado<th></th></th></tr></thead><tbody>'; // Elimina toda la datatable pero vuelve a recolocar los heads de datatable 
            console.log(data)
            // Insertar filas con los datos
            data.forEach(item => {
                dataTable.innerHTML += `<tr data-id="${item.id_pelicula}"><td>${item.id_pelicula}</td><td>${item.nombre}</td><td>${item.descripcion}</td><td>${item.director}</td><td>${item.duracion}</td><td>${item.id_idioma}</td><td>${item.id_estado}</td><td><button class="btn btn-secondary detail-btn">Detalle</button></td></tr>`;
            });

            dataTable.innerHTML += '</tbody>'; // Cierra el table body

            // Agregar event listener para los botones de detalle
            const detailBtns = document.querySelectorAll('.detail-btn');
            detailBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const row = e.target.closest('tr');
                    const id = row.dataset.id;
                    console.log(row)
                    console.log(id)
                    window.location.href = `tablaDetalle.html?id=${id}`; // Te manda a detalle html
                });
            });
        } catch (error) {
            console.error('Error al cargar datos:', error);
        }
    }

    //funcion del boton que me lleva a la pagina de agregar pelicula
    newP.addEventListener('click', (e) =>{
        window.location.href = 'nuevaPelicula.html'
    });
    
    regresar.addEventListener('click', (e) =>{
        window.location.href = 'principal.html'
    });
    // Cargar datos al cargar la página

    loadData();
});
