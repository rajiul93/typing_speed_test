const sentences = [
    'You cannot be honest with others if you’re dishonest with yourself.Changing the things that make you lie is another step toward being a more honest person.If, for example, you lie about drinking and smoking, change the habit. Our inspirational quote category page has even more inspirational and educational quotes.',
    "You’ll then have no reason to be dishonest about it.Honesty is a gift that many people don’t seem to possess.Hopefully, the honesty quotes below will help you understand the importance and value of truthfulnessDon’t forget to check out these karma quotes about what goes around & comes around in our life.",
    "Check out our most popular quote article, a list of short inspirational quotes for daily inspiration"
]
// step 1..................................
const show_sentence = document.querySelector("#show_sentence")
const btn = document.querySelector("#btn")
const score = document.querySelector("#wpm")
const typing_ground = document.querySelector("#textarea");
const time = document.querySelector("#time");
const again = document.querySelector("#again");
const fault = document.querySelector("#fault");
const cpm = document.querySelector("#cpm");



let timer,
    maxTime = 60,
    timeLeft = maxTime,
    index = mistakes = isTyping = 0;

const randomParagraph = () => {
    let randomNumber = Math.floor(Math.random() * sentences.length);
    show_sentence.innerHTML = "";
    sentences[randomNumber].split("").forEach((span) => {
        let spanTag = `<span>${span}</span>`;
        show_sentence.innerHTML += spanTag;
    })
    show_sentence.querySelectorAll("span")[0].classList.add("active")
    btn.addEventListener("click", () => {
        typing_ground.removeAttribute("disabled", true);
        typing_ground.focus();
        typing_ground.style.display= "block"
        
    });
    document.addEventListener("keydown", () => typing_ground.focus());
}

const initTyping = () => {
    const characters = show_sentence.querySelectorAll("span");
    let typedChar = typing_ground.value.split("")[index];
    if (index < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            index--;
            if (characters[index].classList.contains("inCorrect")) {
                mistakes--;
            }
            characters[index].classList.remove("correct", "inCorrect")
        } else {
            if (characters[index].innerText === typedChar) {
                characters[index].classList.add("correct");
            } else {
                mistakes++;
                characters[index].classList.add("inCorrect");
            }
            index++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[index].classList.add("active");
        let wpm = Math.round((((index - mistakes) / 5) / (maxTime - timeLeft)) * 60)
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        fault.innerText = mistakes;
        score.innerText = wpm;
        cpm.innerText = index - mistakes;

    } else {
        typing_ground.value = "";
        clearInterval(timer);
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        time.innerText = `${timeLeft}sec`;
    } else {
        clearInterval(timer);
    }
}

const resetTest = () => {
    randomParagraph();
    typing_ground.value = "";
    clearInterval(timer);
    timeLeft = maxTime,
        index = mistakes = isTyping = 0;
    time.innerText = `${timeLeft}sec`;
    fault.innerText = mistakes;
    score.innerText = 0;
    cpm.innerText = 0;
    // btn.removeAttribute("disabled", true)


}

randomParagraph();
typing_ground.addEventListener("input", initTyping);
again.addEventListener("click", resetTest);






















