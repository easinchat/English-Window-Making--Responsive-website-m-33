const createElements = (arr) => {
  const htmElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmElements.join(" ");
};
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => {
      displayLesson(data.data);
    });
};
const removeActive = () => {
  const lessonButton = document.querySelectorAll(".lesson-btn");
  lessonButton.forEach((btn) => btn.classList.remove("active"));
  console.log(lessonButton);
};
const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      //   console.log(clickBtn);
      clickBtn.classList.add("active");

      displayLevelWord(data.data);
    });
};
const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((load) => console.log(load));
};

const displayWordDetails = (word) => {
  console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
    <div class="">
              <h2 class="text-2xl font-bold">
                ${word.word} ( <i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})
              </h2>
            </div>
            <div class="">
              <h2 class="font-bold">Meaning</h2>
              <p>  ${word.meaning}</p>
            </div>
            <div class="">
              <h2 class="font-bold">Example</h2>
              <p> ${word.sentence}</p>
            </div>
            
            <div class="">
              <h2 class="font-bold">Synonym</h2> 
            <div class="">${createElements(word.synonyms)}</div>
            </div>
              
            
    `;
  document.getElementById("word_modal").showModal();
};

const displayLevelWord = (words) => {
  //   console.log(words);
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = "";
    wordContainer.innerHTML = `
     <div
        class="text-center  col-span-full rounded-xl py-10 space-y-6"
      >
      <img class="mx-auto" src=".//assets/alert-error.png" alt="" />
        <p class="text-xl font-medium text-gray-400">
        এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-bold text-3xl font-bangla">নেক্সট Lesson এ যান</h2>
      </div>
     `;
    manageSpinner(false);
    return;
  }
  words.forEach((word) => {
    // console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
    <div
        class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4"
      >
        <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
        <p class="text-xl">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}</p>
        <div>
          <h2 class="font-semibold text-xl font-bangla">${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}</h2>
        </div>
        <div class="flex justify-between">
          <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1a91ff1a] hover:bg-[#1A91FF]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1a91ff1a] hover:bg-[#1A91FF]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;

    wordContainer.append(card);
  });
  manageSpinner(false);
};
displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  lessons.forEach((lesson) => {
    // console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
                <button id="lesson-btn-${lesson.level_no}" onclick='loadLevelWord(${lesson.level_no})' class="btn btn-outline btn-primary lesson-btn">
                <i  class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
    `;
    levelContainer.append(btnDiv);
  });
};
loadLessons();

document.getElementById("btn-search").addEventListener("click", () => {
  removeActive();
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);
  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      console.log(allWords);
      const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue),
      );
      displayLevelWord(filterWords);
    });
});

// {
// id: 5
// level: 1
// meaning: "আগ্রহী"
// partsOfSpeech: "adjective"
// points: 1
// pronunciation: ইগার"
// sentence: "The kids were eager to open their gifts."
// synonyms: (3) ['enthusiastic', 'excited', 'keen']
// word: "Eager"}
// {{id: 89, level: 1, word: 'Tree', meaning: 'গাছ', pronunciation: 'ট্রি'}
// id:89
// level: 1
// meaning:"গাছ"pronunciation
// : "ট্রি"
// word:
// "Tree"}
