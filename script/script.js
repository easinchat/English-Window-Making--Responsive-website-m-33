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
