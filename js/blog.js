document.addEventListener("DOMContentLoaded", function () {
    fetch("../data/entradas.txt")
        .then(response => response.text())
        .then(data => {
            let entries = parseEntries(data);
            displayEntriesGrid(entries);
        });
});

function parseEntries(data) {
    let entries = [];
    
    // Normalizar saltos de línea para evitar problemas entre Windows y Linux/macOS
    data = data.replace(/\r\n/g, "\n"); 

    let entriesArray = data.split("\n---\n"); // Separar por '---' con saltos de línea

    entriesArray.forEach(entry => {
        let lines = entry.split("\n");

        let titulo = lines.find(line => line.startsWith("TÍTULO:"))?.replace("TÍTULO:", "").trim();
        let fecha = lines.find(line => line.startsWith("FECHA:"))?.replace("FECHA:", "").trim();
        let autor = lines.find(line => line.startsWith("AUTOR:"))?.replace("AUTOR:", "").trim();
        let imagen = lines.find(line => line.startsWith("IMAGEN:"))?.replace("IMAGEN:", "").trim();
        let contenidoIndex = lines.findIndex(line => line.startsWith("CONTENIDO:"));

        if (contenidoIndex !== -1) {
            let contenido = lines.slice(contenidoIndex + 1).join("\n").trim();
            entries.push({
                titulo,
                fecha,
                autor,
                imagen,
                contenido
            });
        }
    });

    return entries;
}


function displayEntriesGrid(entries) {
    let gridContainer = document.getElementById("entries-grid");

    gridContainer.innerHTML = ""; // Limpiar antes de agregar
    gridContainer.style.display = "grid";
    gridContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(250px, 1fr))";
    gridContainer.style.gap = "20px";

    entries.forEach((entry, index) => {
        let entryCard = document.createElement("div");
        entryCard.classList.add("entry-card");
        entryCard.innerHTML = `
            <img src="${entry.imagen}" alt="${entry.titulo}" class="card-image">
            <h3>${entry.titulo}</h3>
            <p>${entry.fecha} - ${entry.autor}</p>
            <button onclick="showEntry(${index})">Leer más</button>
        `;

        gridContainer.appendChild(entryCard);
    });

    // Guardamos las entradas en localStorage para poder accederlas al hacer clic
    localStorage.setItem("entries", JSON.stringify(entries));
}

function showEntry(index) {
    let entries = JSON.parse(localStorage.getItem("entries"));
    let entry = entries[index];

    let contentContainer = document.getElementById("entry-content");
    let gridContainer = document.getElementById("entries-grid");

    contentContainer.innerHTML = `
    <button onclick="goBack()">← Volver</button>
    <div class="entry-layout">
        <img src="${entry.imagen}" alt="${entry.titulo}" class="entry-image">
        <div class="entry-details">
            <h2>${entry.titulo}</h2>
            <p><strong>${entry.fecha}</strong> - ${entry.autor}</p>
        </div>
    </div>
    ${parseContent(entry.contenido)}
`;

    gridContainer.style.display = "none";
    contentContainer.style.display = "block";
}

function goBack() {
    document.getElementById("entries-grid").style.display = "grid";
    document.getElementById("entry-content").style.display = "none";
}

function parseContent(content) {
    content = content.replace(/# (.*?)\n/g, "<h1>$1</h1>");
    content = content.replace(/## (.*?)\n/g, "<h2>$1</h2>");
    content = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="entry-image">');
    return `<p>${content.replace(/\n/g, "</p><p>")}</p>`;
}
