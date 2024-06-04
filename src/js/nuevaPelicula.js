document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.getElementById('add-form');
    const idiomaSelect = document.getElementById('id_idioma')
    const estadoSelect = document.getElementById('id_estado')
    
    async function generarIdiomas() {
        try {
            const response = await fetch('http://localhost:3000/idiomas');
            const data = await response.json();
            
            data.forEach(dato => {
                const option = new Option(dato.idioma, dato.id_idioma);
                idiomaSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error al cargar idiomas:', error);
        }
    }
    generarIdiomas();

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

        
        const selectI = idiomaSelect.value;
        const selectE = estadoSelect.value;
        
        formData.append('id_idioma', selectI)
        formData.append('id_estado', selectE)
        
        try {
            const response = await fetch('http://localhost:3000/peliculas', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                window.location.href = 'peliculas.html';
            } else {
                console.error('Error al agregar película:', response.statusText);
            }
        } catch (error) {
            console.error('Error al agregar película:', error);
        }
    });

    // Agregar evento al botón de regresar
    const regresarBtn = document.getElementById('btn-regre');
    regresarBtn.addEventListener('click', () => {
        window.location.href = 'peliculas.html';
    });

    
});