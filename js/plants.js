document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
    const tagsContainer = document.getElementById("tags-container");

    // Lista de imágenes con prefijos
    const images = ["baobab_1.jpeg", "carolina_1.jpeg", "strawberry_1.jpeg"];
    let activeTags = [];

    // Función para cargar imágenes según los tags activos
    function loadImages() {
        gallery.innerHTML = ""; // Limpiar galería

        // Si no hay tags seleccionados, no mostrar nada
        if (activeTags.length === 0) {
            return;
        }

        // Filtrar las imágenes según los tags activos
        const filteredImages = images.filter(img => activeTags.some(tag => img.startsWith(tag)));

        filteredImages.forEach((fileName, index) => {
            const div = document.createElement("div");
            div.classList.add("gallery-item");

            const img = document.createElement("img");
            img.src = `../img/plants/${fileName}`;
            img.alt = `Imagen ${index + 1}`;

            const label = document.createElement("div");
            label.classList.add("week-label");
            label.textContent = `Imagen ${fileName}`;

            div.appendChild(img);
            div.appendChild(label);
            gallery.appendChild(div);
        });

        addImageClickEvents();
    }

    // Función para agregar eventos de clic a las imágenes
    function addImageClickEvents() {
        const images2 = document.querySelectorAll('.gallery-item img');
        const modal = document.getElementById('modal');
        const modalImg = document.getElementById('modal-img');
        const closeModal = document.getElementById('close');

        images2.forEach(image => {
            image.addEventListener('click', () => {
                modalImg.src = image.src;
                modal.style.display = 'flex';
            });
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Función para agregar un tag y actualizar la galería
    function addTag(tag) {
        if (!activeTags.includes(tag)) {
            activeTags.push(tag);
            const tagButton = document.querySelector(`[data-tag="${tag}"]`);
            tagButton.classList.add("active");
            loadImages();
        }
    }

    // Función para eliminar un tag y actualizar la galería
    function removeTag(tag) {
        activeTags = activeTags.filter(activeTag => activeTag !== tag);
        const tagButton = document.querySelector(`[data-tag="${tag}"]`);
        tagButton.classList.remove("active");
        loadImages();
    }

    // Agregar eventos de clic en los botones de los tags
    tagsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("tag-button")) {
            const tag = event.target.getAttribute("data-tag");
            if (activeTags.includes(tag)) {
                removeTag(tag);
            } else {
                addTag(tag);
            }
        }
    });

    // Cargar imágenes por defecto
    //loadImages(); // Cargar todas las imágenes al inicio
});
