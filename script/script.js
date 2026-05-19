const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => {
      displayLesson(data.data);
    });
};
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};
// {{id: 89, level: 1, word: 'Tree', meaning: 'গাছ', pronunciation: 'ট্রি'}
// id:89
// level: 1
// meaning:"গাছ"pronunciation
// : "ট্রি"
// word:
// "Tree"}

const displayLevelWord = (words) => {
  //   console.log(words);
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
    <div
        class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4"
      >
        <h2 class="font-bold text-2xl">Eager</h2>
        <p class="text-xl">Meaning /Pronounciation</p>
        <div>
          <h2 class="font-semibold text-xl font-bangla">"আগ্রহী / ইগার"</h2>
        </div>
        <div class="flex justify-between">
          <button class="btn bg-[#1a91ff1a] hover:bg-[#1A91FF]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="btn bg-[#1a91ff1a] hover:bg-[#1A91FF]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;

    wordContainer.append(card);
  });
};
displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  lessons.forEach((lesson) => {
    console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
                <button onclick='loadLevelWord(${lesson.level_no})' class="btn btn-outline btn-primary">
                <i  class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
    `;
    levelContainer.append(btnDiv);
  });
};
loadLessons();
