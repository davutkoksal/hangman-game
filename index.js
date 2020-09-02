const letters = document.getElementById("letters");
const word = document.getElementById("word");
const wrongwords = document.getElementById("wrong-words");
const figParts = document.querySelectorAll(".figure-part");
const finalMessage = document.getElementById("final-message");
const popup = document.getElementById("popup-container");
const btn = document.getElementById("play-button");
const categoryNameCont = document.getElementById("categoryName");

const alphabet = "abcdefgğhıijklmnoöprsştuüvyz";

let wordsObj = {
  Meyve: ["elma", "muz", "kiraz", "ananas"],
  Hayvan: ["kedi", "köpek", "aslan", "balık"],
};
let selectedWord;
let categoryName;
let trueWords = [];
let wrongWords = [];

btn.addEventListener("click", () => location.reload());

Array.from(alphabet).map((l) => {
  letters.innerHTML += `
<div class="letter">${l}</div>`;
});

function getWord() {
  let words;
  const category = Math.floor(Math.random() * 2);
  if (category == 0) {
    categoryName = "Meyve";
  } else {
    categoryName = "Hayvan";
  }
  words = wordsObj[categoryName];
  const index = Math.floor(Math.random() * words.length);
  categoryNameCont.innerHTML = `Kategori:${categoryName}`;
  return words[index];
}

function writeWord() {
  selectedWord = getWord();
  Array.from(selectedWord).map((l) => {
    word.innerHTML += `
    <div class="word-container"><span class="word">${l}</span></div>`;
  });
}

letters.addEventListener("click", findLetter);

function findLetter(e) {
  if (e.target.className === "letter") {
    if (selectedWord.includes(e.target.textContent)) {
      let check = document.querySelectorAll(".word");
      check.forEach((l) => {
        if (e.target.textContent === l.textContent) {
          l.className = "word-visible";
          trueWords.push(e.target.textContent);
        }
      });
    } else {
      wrongWords.push(e.target.textContent);
      updateWrongWords();
    }
  }

  if (trueWords.length === selectedWord.length) {
    setTimeout(() => {
      finalMessage.innerText = "Tebrikler! Kazandınız! 😃";
      popup.style.display = "flex";
    }, 200);
  }
}

function updateWrongWords() {
  wrongwords.innerHTML = "";
  wrongWords.forEach((l) => {
    wrongwords.innerHTML += `
    <h5 >${l}</h5>`;
  });

  for (let i = 0; i < wrongWords.length; i++) {
    let arr = Array.from(figParts);
    let el = arr[i];
    el.style.visibility = "visible";
  }

  if (wrongWords.length === figParts.length) {
    setTimeout(() => {
      finalMessage.innerText = "Üzgünüm ! Kaybettiniz! 😕";
      popup.style.display = "flex";
    }, 200);
  }
}
writeWord();
