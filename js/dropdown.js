const usefulLink = document.getElementById('useful-link');
const dropdown = document.getElementById('dropdown');

usefulLink.addEventListener('mouseover', () => {
    usefulLink.innerHTML = '&nbsp;&nbsp;&nbsp;▼&nbsp;&nbsp;&nbsp;'; 
});

usefulLink.addEventListener('mouseout', () => {
    usefulLink.innerHTML = 'useful for me'; 
});

usefulLink.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none'; 
});
