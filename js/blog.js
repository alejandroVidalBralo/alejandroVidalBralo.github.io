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
        `;

        gridContainer.appendChild(entryCard);

        entryCard.onclick = () => showEntry(index);
        entryCard.style.cursor = "pointer"; // Para indicar que es clickeable

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
    // Asegurar que haya un salto de línea al final para que las expresiones regulares lo capturen bien
    content = content.trim() + "\n";

    // Convertir encabezados
    content = content.replace(/^# (.*?)$/gm, "<h1>$1</h1>");
    content = content.replace(/^## (.*?)$/gm, "<h2>$1</h2>");

    // Convertir imágenes estilo Markdown
    content = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="entry-image">');

    // Convertir párrafos (pero sin afectar etiquetas ya convertidas)
    content = content.replace(/\n{2,}/g, "</p><p>"); // Doble salto de línea = nuevo párrafo
    content = `<p>${content.replace(/\n/g, "<br>")}</p>`; // Saltos de línea normales dentro de un párrafo

    return content;
}
