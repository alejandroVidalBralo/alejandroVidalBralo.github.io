const texts = ["phd student", "not a web designer"];
let textIndex = 0;
let charIndex = 0;
let currentText = "";
let deleting = false;

function typeWriter() {
    const element = document.getElementById("phd");

    if (!deleting) {
        if (charIndex < texts[textIndex].length) {
            currentText += texts[textIndex].charAt(charIndex);
            charIndex++;
            element.textContent = currentText;
            setTimeout(typeWriter, Math.random() * (300 - 200) + 200);
        } else {

            setTimeout(() => {
                deleting = true;
                setTimeout(typeWriter, 500); 
            }, 1000);
        }
    }

    else {
        if (charIndex > 0) {
            currentText = currentText.slice(0, -1);
            charIndex--;
            element.textContent = currentText;
            setTimeout(typeWriter, Math.random() * (150 - 100) + 100); 
        } else {

            deleting = false;
            textIndex = (textIndex + 1) % texts.length; 
            setTimeout(typeWriter, 500); 
        }
    }
}

typeWriter();
