document.addEventListener('DOMContentLoaded', () => {
    const detailForm = document.getElementById('detail-form');
    const deleteBtn = document.getElementById('delete-btn');
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const regresar = document.getElementById('btn-regre');
    const funcionSelect = document.getElementById('id_funcion')
    const butacaSelect = document.getElementById('id_butaca')
    const estadoSelect = document.getElementById('id_estado')

    // Función para cargar los detalles del registro
    async function loadDetail() {
        try {
            const response = await fetch(`http://localhost:3000/reservas/${id}`);
            const data = await response.json();
            await cargarButacas(data[0].id_funcion)
            populateForm(data);
            console.log("Datos del Async de cargar detalles",data);
        } catch (error) {
            console.error('Error al cargar detalles:', error);
        }
    }

    

    async function generarFunciones(){
        try {
            const response = await fetch('http://localhost:3000/funciones');
            const data = await response.json();
            
            data.forEach(dato => {
                const info = `Pelicula: ${dato.nombre} Funcion: ${dato.hora_inicio} Fecha: ${dato.fecha} Sala: ${dato.sala}`
                const option = new Option(info, dato.id_funcion);
                funcionSelect.appendChild(option);
            });
            // const id_funcion = data[0].id_funcion
            // await cargarButacas(id_funcion)
        } catch (error) {
            console.error('Error al cargar funciones:', error);
        }
    }
    generarFunciones();

    funcionSelect.addEventListener('change', async (event) => {
        const id_funcion = event.target.value;
        await cargarButacas(id_funcion);
    });

    async function cargarButacas(id_funcion) {
        const response = await fetch(`http://localhost:3000/Sala/${id_funcion}`);
        const butacas = await response.json();
        await generarButacas(butacas);

    }


    function generarButacas(butacas){
        try {
            // const response = await fetch(`http://localhost:3000/butacas/${butacas[0].sala}`);
            // const data = await response.json();
            butacaSelect.innerHTML = ''
            butacas.forEach(dato => {

                const info = `Butaca: ${dato.butaca} Sala: ${dato.sala} Estado: ${dato.estado_butaca}`
                const option = new Option(info, dato.id_butaca);
                butacaSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error al cargar butacas:', error);
        }
    }

    async function generarEstados() {
        try {
            const response = await fetch('http://localhost:3000/estados');
            const data = await response.json();
            
            data.forEach(dato => {
                const option = new Option(dato.estado, dato.id_estado);
                estadoSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error al cargar estados:', error);
        }
    }
    generarEstados();

//Función para llenar el formulario con los datos recibidos
    function populateForm(data) {
        console.log('Datos del form',data);
        document.getElementById('nombre').value = data[0].nombre;
        document.getElementById('apellido').value = data[0].apellido;
        document.getElementById('telefono').value = data[0].telefono;
        document.getElementById('correo').value = data[0].correo;
        document.getElementById('id_funcion').value = data[0].id_funcion;
        document.getElementById('id_butaca').value = data[0].id_butaca;
        document.getElementById('id_estado').value = data[0].id_estado;
    }

    // Función para enviar los datos editados al servidor
    detailForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(detailForm);

        const selectF = funcionSelect.value;
        const selectB = butacaSelect.value;
        const selectE = estadoSelect.value;

        formData.append('id_funcion', selectF)
        formData.append('id_butaca', selectB)
        formData.append('id_estado', selectE)

        const requestData = {
            method: 'PUT',
            body: JSON.stringify(Object.fromEntries(formData.entries())),
            headers: {
               'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(`http://localhost:3000/reservas/${id}`, requestData);
            if (response.ok) {
                // Si la edición fue exitosa, redirigir a index.html
                window.location.href = 'reservas.html';
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
            const response = await fetch(`http://localhost:3000/reservas/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                // Si la eliminación fue exitosa, redirigir a index.html
                window.location.href = 'reservas.html';
            } else {
                console.error('Error al eliminar registro:', response.statusText);
            }
        } catch (error) {
            console.error('Error al eliminar registro:', error);
        }
    });
    regresar.addEventListener('click', (e) =>{
        window.location.href = 'reservas.html'
    });

    // Cargar detalles al cargar la página
    loadDetail();
    
});