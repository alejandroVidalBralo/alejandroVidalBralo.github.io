



document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");

    // Lista de imágenes (puedes generarla dinámicamente)
    const images = ["baobab_1.jpeg", "carolina_1.jpeg", "strawberry_1.jpeg"];

    let loadedImages = 0;

    images.forEach((fileName, index) => {
        const div = document.createElement("div");
        div.classList.add("gallery-item");

        const img = document.createElement("img");
        img.src = `img/plants/${fileName}`;
        img.alt = `Imagen ${index + 1}`;

        img.onload = () => {
            loadedImages++;
            if (loadedImages === images.length) {
                msnry.layout(); // Reorganiza cuando todas las imágenes han cargado
            }
        };

        const label = document.createElement("div");
        label.classList.add("week-label");
        label.textContent = `Semana ${index + 1}`;

        div.appendChild(img);
        div.appendChild(label);
        gallery.appendChild(div);
    });



    const images2 = document.querySelectorAll('.gallery-item img');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.getElementById('close');

    images2.forEach(image => {
        image.addEventListener('click', () => {
            const imgSrc = image.src;
            modalImg.src = imgSrc;
            modal.style.display = 'flex';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

});
