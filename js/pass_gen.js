document.getElementById("boton").addEventListener("click", async function() {
    const word1 = document.getElementById("campo1").value;
    const word2 = document.getElementById("campo2").value;


    if (word1.length === 0 || word2.length === 0 || word1 == word2) {
        document.getElementById("result").value = "/!\\ keywords can not be empty or equal /!\\ ";
        return;
    }

    const hash1 = await AES(word1);
    const hash2 = await AES(word2);

    const xorBytes = xorHashes(hash1, hash2);

    const result = base91Encode(xorBytes);

    document.getElementById("result").value = result;
});

async function AES(word) {
    const encoder = new TextEncoder();
    const data = encoder.encode(word);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return new Uint8Array(hashBuffer);
}

function xorHashes(bytes1, bytes2) {
    if (bytes1.length !== bytes2.length) {
         throw new Error("Los hashes deben tener la misma longitud");
    }
    const result = new Uint8Array(bytes1.length);
    for (let i = 0; i < bytes1.length; i++) {
         result[i] = bytes1[i] ^ bytes2[i];
    }
    return result;
}

const encodingChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~\"";

function base91Encode(data) {
    let b = 0, n = 0, output = "";
    for (let i = 0; i < data.length; i++) {
        b |= data[i] << n;
        n += 8;
        if (n > 13) {
            let v = b & 8191; // 2^13 - 1
            if (v > 88) {
                b >>= 13;
                n -= 13;
            } else {
                v = b & 16383; // 2^14 - 1
                b >>= 14;
                n -= 14;
            }
            output += encodingChars.charAt(v % 91) + encodingChars.charAt(Math.floor(v / 91));
        }
    }
    if (n) {
        output += encodingChars.charAt(b % 91);
    }
    return output;
}



document.getElementById('copyButton').addEventListener('click', function() {
    var resultInput = document.getElementById('result');
    var originalText = resultInput.value; 
    
    navigator.clipboard.writeText(originalText)
        .then(function() {
            
            resultInput.value = 'copied to clipboard';
            
        
            setTimeout(function() {
                resultInput.value = originalText;
            }, 2000); 
        })
        .catch(function(error) {
            alert('Failed to copy text: ' + error);
        });
});
