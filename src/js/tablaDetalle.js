document.addEventListener('DOMContentLoaded', () => {
    const detailForm = document.getElementById('detail-form');
    const deleteBtn = document.getElementById('delete-btn');
    const foto = document.getElementById('Foto')
    const vid = document.getElementById('Vid')
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const regresar = document.getElementById('btn-regre')
    // Función para cargar los detalles del registro
    async function loadDetail() {
        try {
            const response = await fetch(`http://localhost:3000/peliculas/${id}`);
            const data = await response.json();
            populateForm(data);
            console.log("Datos del Async de cargar detalles",data);
        } catch (error) {
            console.error('Error al cargar detalles:', error);
        }
    }

//Función para llenar el formulario con los datos recibidos
    function populateForm(data) {
        console.log('Datos del form',data);
        document.getElementById('nombre').value = data[0].nombre;
        document.getElementById('descripcion').value = data[0].descripcion;
        document.getElementById('director').value = data[0].director;
        document.getElementById('duracion').value = data[0].duracion;
        foto.innerHTML = `<img src="${data[0].imagen}"></img>`
        document.getElementById('video').value = data[0].video;
        vid.innerHTML = `${data[0].video}`
        document.getElementById('ruta').value = data[0].imagen;
        document.getElementById('id_idioma').value = data[0].id_idioma;
        document.getElementById('id_estado').value = data[0].id_estado;
    }
    
    // Función para enviar los datos editados al servidor
    detailForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(detailForm);
        const requestData = {
            method: 'PUT',
            body: formData,
        };

        try {
            const response = await fetch(`http://localhost:3000/peliculas/${id}`, requestData);
            if (response.ok) {
                // Si la edición fue exitosa, redirigir a index.html
                window.location.href = 'tabla.html';
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
            const response = await fetch(`http://localhost:3000/peliculas/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                // Si la eliminación fue exitosa, redirigir a index.html
                window.location.href = 'tabla.html';
            } else {
                console.error('Error al eliminar registro:', response.statusText);
            }
        } catch (error) {
            console.error('Error al eliminar registro:', error);
        }
    });
    regresar.addEventListener('click', (e) =>{
        window.location.href = 'tabla.html'
    });

    // Cargar detalles al cargar la página
    loadDetail();
});
