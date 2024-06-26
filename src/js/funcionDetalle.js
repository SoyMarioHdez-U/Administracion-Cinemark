document.addEventListener('DOMContentLoaded', () => {
    const detailForm = document.getElementById('detail-form');
    const deleteBtn = document.getElementById('delete-btn');
    const peliculaSelect = document.getElementById('id_pelicula');
    const salaSelect = document.getElementById('id_sala')
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const regresar = document.getElementById('btn-regre');

    // Función para cargar los detalles del registro
    async function loadDetail() {
        try {
            const response = await fetch(`http://localhost:3000/funciones/${id}`);
            const data = await response.json();
            populateForm(data);
            console.log("Datos del Async de cargar detalles",data);
        } catch (error) {
            console.error('Error al cargar detalles:', error);
        }
    }

    async function generarPeliculas() {
        try {
            const response = await fetch('http://localhost:3000/peliculas');
            const data = await response.json();
            
            data.forEach(dato => {
                const option = new Option(dato.nombre, dato.id_pelicula);
                peliculaSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error al cargar pelicula:', error);
        }
    }
    generarPeliculas();

    async function generarSalas() {
        try {
            const response = await fetch('http://localhost:3000/salas');
            const data = await response.json();
            
            data.forEach(dato => {
                const option = new Option(dato.sala, dato.id_sala);
                salaSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error al cargar sala:', error);
        }
    }
    generarSalas();

//Función para llenar el formulario con los datos recibidos
    function populateForm(data) {
        console.log('Datos del form',data);
        document.getElementById('hora_inicio').value = data[0].hora_inicio;
        document.getElementById('fecha').value = data[0].fecha;
        document.getElementById('id_pelicula').value = data[0].id_pelicula;
        document.getElementById('id_sala').value = data[0].id_sala;
    }

    // Función para enviar los datos editados al servidor
    detailForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(detailForm);

        const selectP = peliculaSelect.value;
        const selectS = salaSelect.value;

        formData.append('id_pelicula', selectP)
        formData.append('id_sala', selectS)

        const requestData = {
            method: 'PUT',
            body: JSON.stringify(Object.fromEntries(formData.entries())),
            headers: {
               'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(`http://localhost:3000/funciones/${id}`, requestData);
            if (response.ok) {
                // Si la edición fue exitosa, redirigir a index.html
                window.location.href = 'funciones.html';
            } else {
                console.error('Error al editar registro:', response.statusText);
            }
        } catch (error) {
            console.error('Error al editar registro:', error);
        }
    });

    // Función para eliminar el registro
    deleteBtn.addEventListener('click', async () => {
        try {
            const response = await fetch(`http://localhost:3000/funciones/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                // Si la eliminación fue exitosa, redirigir a index.html
                window.location.href = 'funciones.html';
            } else {
                console.error('Error al eliminar registro:', response.statusText);
            }
        } catch (error) {
            console.error('Error al eliminar registro:', error);
        }
    });
    regresar.addEventListener('click', (e) =>{
        window.location.href = 'funciones.html'
    });

    // Cargar detalles al cargar la página
    loadDetail();
});