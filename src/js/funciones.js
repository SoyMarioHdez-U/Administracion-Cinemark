document.addEventListener('DOMContentLoaded', () => {
    const dataTable = document.getElementById('tablaPeliculas'); 
    const newF = document.getElementById('btn-newf');
    const regresar = document.getElementById('btn-regre');
    const ordenarPor = document.getElementById('ordenarPor');

    // Función para cargar datos en la tabla
    async function loadData() {
        try {
            const response = await fetch('http://localhost:3000/funciones');
            const data = await response.json();
            
            renderTable(data);
            
            // Agregar event listener para los botones de detalle
            const detailBtns = document.querySelectorAll('.detail-btn');
            detailBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const row = e.target.closest('tr');
                    const id = row.dataset.id;
                    window.location.href = `funcionDetalle.html?id=${id}`;
                });
            });
        } catch (error) {
            console.error('Error al cargar datos:', error);
        }
    }

    // Función para renderizar la tabla
    function renderTable(data) {
        const tbody = dataTable.querySelector('tbody');
        tbody.innerHTML = ''; // Limpiar tabla
        data.forEach(item => {
            tbody.innerHTML += `
                <tr data-id="${item.id_funcion}">
                    <td>${item.id_funcion}</td>
                    <td>${item.hora_inicio}</td>
                    <td>${item.fecha}</td>
                    <td>${item.nombre}</td>
                    <td>${item.sala}</td>
                    <td><button class="btn btn-secondary detail-btn">Detalle</button></td>
                </tr>`;
        });
    }

    // Función para ordenar los datos
    function sortData(data, criteria) {
        return data.sort((a, b) => {
            switch (criteria) {
                case 'hora-asc':
                    return a.hora_inicio.localeCompare(b.hora_inicio);
                case 'hora-desc':
                    return b.hora_inicio.localeCompare(a.hora_inicio);
                case 'fecha-asc':
                    return a.fecha.localeCompare(b.fecha);
                case 'fecha-desc':
                    return b.fecha.localeCompare(a.fecha);
                case 'pelicula':
                    return a.id_pelicula.localeCompare(b.id_pelicula);
                default:
                    return 0;
            }
        });
    }

    // Event listener para el cambio de opción en el select de ordenarPor
    ordenarPor.addEventListener('change', async (e) => {
        try {
            const response = await fetch('http://localhost:3000/funciones');
            let data = await response.json();
            
            // Ordenar los datos según el criterio seleccionado
            data = sortData(data, e.target.value);
            
            // Renderizar la tabla con los datos ordenados
            renderTable(data);
            
        } catch (error) {
            console.error('Error al cargar datos:', error);
        }
    });

    //funcion del boton que me lleva a la pagina de agregar funcion
    newF.addEventListener('click', (e) =>{
        window.location.href = 'nuevaFuncion.html';
    });

    regresar.addEventListener('click', (e) =>{
        window.location.href = 'principal.html';
    });

    // Cargar datos al cargar la página
    loadData();
});
