document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('.gallery-item img');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.getElementById('close');

    images.forEach(image => {
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
