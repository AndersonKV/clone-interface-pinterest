const grids = document.querySelectorAll(".grid");
const headings = document.querySelectorAll(".heading .wrapper .text");

function enterScreen(index) {
  const grid = grids[index];
  const heading = headings[index];
  const gridColumns = grid.querySelectorAll(".column");
  const items = document.querySelectorAll(".column .item");

  items.forEach((element) => {
    const imgExist = element.querySelector("img");

    if (imgExist != null) {
      imgExist.remove();
    }
  });

  items.forEach((element) => {
    element.append(getImage());
  });

  grid.classList.add("active");

  gridColumns.forEach((element) => {
    element.classList.remove("animate-before", "animate-after");
  });

  heading.classList.remove("animate-before", "animate-after");
}

function exitScreen(index, exitDelay) {
  const grid = grids[index];
  const heading = headings[index];
  const gridColumns = grid.querySelectorAll(".column");

  gridColumns.forEach((element) => {
    element.classList.add("animate-after");
  });

  heading.classList.add("animate-after");

  setTimeout(() => {
    grid.classList.remove("active");
  }, exitDelay);
}

function setupAnimationCycle({ timePerScreen, exitDelay }) {
  const cycleTime = timePerScreen + exitDelay;
  let nextIndex = 0;

  function nextCycle() {
    const currentIndex = nextIndex;

    enterScreen(currentIndex);

    setTimeout(() => exitScreen(currentIndex, exitDelay), timePerScreen);

    nextIndex = nextIndex >= grids.length - 1 ? 0 : nextIndex + 1;
  }

  nextCycle();

  setInterval(nextCycle, cycleTime);
}

function getImage() {
  const img = document.createElement("img");
  const imagem = `https://source.unsplash.com/user/erondu/236x350`;
  img.src = imagem;

  return img;
}

setupAnimationCycle({
  timePerScreen: 2000, // ms
  exitDelay: 200 * 7, // ms
});
