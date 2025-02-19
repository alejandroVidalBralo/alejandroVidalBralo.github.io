// Seleccionamos el enlace y el contenedor de la lista desplegable
const usefulLink = document.getElementById('useful-link');
const dropdown = document.getElementById('dropdown');

// Añadimos el evento hover para cambiar el texto
usefulLink.addEventListener('mouseover', () => {
    usefulLink.innerHTML = '&nbsp;&nbsp;&nbsp;▼&nbsp;&nbsp;&nbsp;'; // Cambia el texto por el icono de desplegar
});

usefulLink.addEventListener('mouseout', () => {
    usefulLink.innerHTML = 'useful for me'; // Restaura el texto inicial (opcional)
});

// Función para mostrar u ocultar la lista al hacer clic
usefulLink.addEventListener('click', (e) => {
    e.preventDefault(); // Prevenir que el enlace se siga
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none'; // Alternar visibilidad de la lista
});
