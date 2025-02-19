document.getElementById("boton").addEventListener("click", async function() {
    const palabra1 = document.getElementById("campo1").value;
    const palabra2 = document.getElementById("campo2").value;
    const texto = palabra1 + palabra2;

    const hash = await sha256(texto);
    document.getElementById("result").value = hash;
});

async function sha256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}
