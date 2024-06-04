document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.getElementById('add-form')
    const regresar = document.getElementById('btn-regre')
    const peliculaSelect = document.getElementById('id_pelicula');
    const salaSelect = document.getElementById('id_sala')


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
    

    addForm.addEventListener('submit', async (e) => {
            
        e.preventDefault();
        const formData = new FormData(addForm);

        const selectP = peliculaSelect.value;
        const selectS = salaSelect.value;

        formData.append('id_pelicula', selectP)
        formData.append('id_sala', selectS)

        const requestData = {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData.entries())),
            headers: {
               'Content-Type': 'application/json'
            }
        };
        console.log(requestData)

        try {
            const response = await fetch('http://localhost:3000/funciones', requestData);
            if (response.ok) { 
                window.location.href = 'funciones.html';
            } else {
                console.error('Error al agregar registro:', response.statusText);
            }
        } catch (error) {
            console.error('Error al agregar registro:', error);
        }
    });
    regresar.addEventListener('click', (e) =>{
        window.location.href = 'funciones.html'
    });
    // Cargar datos al cargar la página
    loadData();
});