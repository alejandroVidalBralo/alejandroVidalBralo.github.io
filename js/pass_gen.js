document.getElementById("boton").addEventListener("click", async function() {
    const word1 = document.getElementById("campo1").value;
    const word2 = document.getElementById("campo2").value;

    const hash = await AES(word1, word2);
    document.getElementById("result").value = hash;
});

async function AES(word1, word2) {
    return CryptoJS.AES.encrypt(word1, word2).toString();
}
