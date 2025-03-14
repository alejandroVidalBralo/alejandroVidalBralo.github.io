const dropdownSections = [
    { section: 'dropdown0_section', box: 'dropdown0', defaultText: 'about me' },
    { section: 'dropdown1_section', box: 'dropdown1', defaultText: 'hobbies and projects' },
    { section: 'dropdown2_section', box: 'dropdown2', defaultText: 'my experience' } // Adjust the default text as needed
];

dropdownSections.forEach(dropdown => {
    const dropdownElement = document.getElementById(dropdown.section);
    const dropdownBox = document.getElementById(dropdown.box);

    dropdownElement.addEventListener('mouseover', () => {
        dropdownElement.querySelector('a').textContent = '↓';
    });

    dropdownElement.addEventListener('mouseout', () => {
        dropdownElement.querySelector('a').textContent = dropdown.defaultText;
    });

    dropdownElement.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() === 'a') return;
        e.preventDefault();
        dropdownBox.style.display = dropdownBox.style.display === 'none' ? 'block' : 'none';
    });
});
