const usefulLink1 = document.getElementById('useful-link1');
const dropdown1 = document.getElementById('dropdown1');

usefulLink1.addEventListener('mouseover', () => {
    usefulLink1.innerHTML = '&nbsp;&nbsp;&nbsp;↓ ↓ ↓&nbsp;&nbsp;&nbsp;'; 
});

usefulLink1.addEventListener('mouseout', () => {
    usefulLink1.innerHTML = 'project'; 
});

usefulLink1.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown1.style.display = dropdown1.style.display === 'none' ? 'block' : 'none'; 
});




const usefulLink2 = document.getElementById('useful-link2');
const dropdown2 = document.getElementById('dropdown2');

usefulLink2.addEventListener('mouseover', () => {
    usefulLink2.innerHTML = '&nbsp;&nbsp;&nbsp;↓ ↓ ↓&nbsp;&nbsp;&nbsp;'; 
});

usefulLink2.addEventListener('mouseout', () => {
    usefulLink2.innerHTML = 'useful for me'; 
});

usefulLink2.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown2.style.display = dropdown2.style.display === 'none' ? 'block' : 'none'; 
});
