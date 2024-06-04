document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.getElementById('add-form');
    const regresar = document.getElementById('btn-regre');
    const funcionSelect = document.getElementById('id_funcion')
    const butacaSelect = document.getElementById('id_butaca')
    const estadoSelect = document.getElementById('id_estado')



    async function generarFunciones(){
        try {
            const response = await fetch('http://localhost:3000/funciones');
            const data = await response.json();
            
            data.forEach(dato => {
                const info = `Pelicula: ${dato.nombre} Funcion: ${dato.hora_inicio} Fecha: ${dato.fecha} Sala: ${dato.sala}`
                const option = new Option(info, dato.id_funcion);
                funcionSelect.appendChild(option);
            });
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
        generarButacas(butacas);

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


    

    addForm.addEventListener('submit', async (e) => {
  
        e.preventDefault();
        const formData = new FormData(addForm);

        const selectF = funcionSelect.value;
        const selectB = butacaSelect.value;
        const selectE = estadoSelect.value;

        formData.append('id_funcion', selectF)
        formData.append('id_butaca', selectB)
        formData.append('id_estado', selectE)

        const requestData = {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData.entries())),
            headers: {
            'Content-Type': 'application/json'
            }
        };
        console.log(requestData)

        try {
            const response = await fetch('http://localhost:3000/reservas', requestData);
            if (response.ok) {
                window.location.href = 'reservas.html';
            } else {
                console.error('Error al agregar registro:', response.statusText);
            }
        } catch (error) {
            console.error('Error al agregar registro:', error);
        }
    });

    regresar.addEventListener('click', (e) =>{
        window.location.href = 'reservas.html'
    });
    // Cargar datos al cargar la página
    loadData();
});