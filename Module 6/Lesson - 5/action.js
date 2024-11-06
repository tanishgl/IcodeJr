let book = document.querySelector(".book");

const story = [
  "In a sunny orchard, a little bunny named Benny loved munching on sweet, juicy apples.",
  "Every morning, he’d hop from tree to tree",
  "picking the ripest ones to nibble.",
  "One day, he found a shiny red apple that looked extra tasty,",
  "but it was too high up!",
  "Benny’s friends—a squirrel, a bird, and a mouse—saw his trouble and teamed up to help.",
  "The bird flew up to grab it,",
  "and together they shared the delicious apple.",
  "Benny learned that apples taste even sweeter when shared with friends!",
];

const images = [
  "./images/bunny.jpeg",
  "./images/tree.jpeg",
  "./images/apple.jpeg",
  "./images/shiny.jpeg",
  "./images/high.jpeg",
  "./images/helper.jpeg",
  "./images/fly.jpeg",
  "./images/share.jpeg",
  "./images/tasty.jpeg",
];

const totalPages = story.length;

fillBook();

book.children[0].addEventListener("click", (e) => {
  turnNextPage(0);
});

function fillBook() {
  for (let i = 1; i <= totalPages; i++) {
    let page = createPage(story[i - 1], i);
    book.appendChild(page);
  }
}

function createPage(page_content, page_no) {
  const page = document.createElement("div");
  page.classList.add("page");
  page.innerHTML = page_content;
  page.style.zIndex = -page_no;
  page.appendChild(createImage(page_no));
  page.appendChild(createPageNumber(page_no));
  /* Make Next Button */
  if (page_no !== totalPages) {
    page.appendChild(createNextButton(page_no));
  }
  /* Make Prev Button */
  if (page_no > 0) {
    page.appendChild(createPrevButton(page_no));
  }
  return page;
}

function createPageNumber(pageNo) {
  let num = document.createElement("span");
  num.innerHTML = pageNo;
  num.classList.add("page-num");
  return num;
}

function createImage(pageNo) {
  let img = document.createElement("img");
  img.src = images[pageNo - 1];
  return img;
}

function createNextButton(pageNo) {
  let nextBtn = document.createElement("button");
  nextBtn.innerHTML = ">";
  nextBtn.classList.add("btn-next", "btn");
  nextBtn.addEventListener("click", (e) => {
    turnNextPage(pageNo);
  });
  return nextBtn;
}

function createPrevButton(pageNo) {
  let prevBtn = document.createElement("button");
  prevBtn.innerHTML = "<";
  prevBtn.classList.add("btn-prev", "btn");
  prevBtn.addEventListener("click", (e) => {
    turnPrevPage(pageNo);
  });
  return prevBtn;
}

function turnNextPage(pageNo) {
  for (let i = 0; i < pageNo; i++) {
    book.children[i].style.zIndex--;
  }
  let page = book.children[pageNo];
  page.classList.remove("flip-back");
  page.classList.add("flip");
  toggleButtonsVisibility(page, false);
}

function turnPrevPage(pageNo) {
  for (let i = 0; i < pageNo; i++) {
    book.children[i].style.zIndex++;
  }
  let page = book.children[pageNo - 1];
  page.classList.remove("flip");
  page.classList.add("flip-back");
  toggleButtonsVisibility(page, true);
}

function toggleButtonsVisibility(page, toShow) {
  let pageElements = [...page.children];
  let nextButton = pageElements.filter((element) =>
    element.classList.contains("btn-next")
  )[0];
  let prevButton = pageElements.filter((element) =>
    element.classList.contains("btn-prev")
  )[0];
  if (nextButton) {
    nextButton.style.visibility = toShow ? "visible" : "hidden";
  }
  if (prevButton) {
    prevButton.style.visibility = toShow ? "visible" : "hidden";
  }
}
