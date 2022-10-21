let fixedFooterContainer = document.querySelector(`.footer_fixed`);
let fixedFooterHeadline;
let totalCharCount = 0;

let headlinePrefab = function (headline) {
  return `<div class="footer_fixed-headline w-mc h-100 position-absolute  p-2 moving_animation-inandout">
${headline}
</div>`;
};

function extractAndUpdateHeadLines(data) {
  for (let i = 0; i < data.length; i++) {
    archivedData.headlines.push(data[0].headline);
  }

  injectHeadline(processHeadline());
}

function processHeadline() {
  let finalHeadline = "";

  for (let i = 0; i < archivedData.headlines.length; i++) {
    for (let j = 0; j < archivedData.headlines[i].length; j++) {
      finalHeadline += `<span class="text_effect-scaleup">${archivedData.headlines[i][j]}</span>`;
      totalCharCount++;
    }
    finalHeadline += "  ***  ";
  }
  console.log(totalCharCount);

  return finalHeadline;
}

function injectHeadline(headline) {
  fixedFooterContainer.innerHTML = headlinePrefab(headline);
  fixedFooterHeadline = document.querySelector(`.footer_fixed-headline`);
  fixedFooterHeadline.style = `animation-duration: ${totalCharCount / 2}s`;
}

setInterval(() => {
  if (1 < isInViewport(fixedFooterHeadline)) {
    fixedFooterHeadline.classList.remove("moving_animation-inandout");

    setTimeout(() => {
      fixedFooterHeadline.classList.add("moving_animation-inandout");
    }, 200);
  }
}, 2000);

fixedFooterContainer.addEventListener("click", (e) => {
  console.log(isInViewport(fixedFooterHeadline));
});

document.addEventListener("click", (e) => {
  console.log(e.target);
});

// fixedFooterContainer.addEventListener("mouseover", (e) => {
//   fixedFooterHeadline.classList.add("headline-zoom");
// });

// fixedFooterContainer.addEventListener("mouseout", (e) => {
//   fixedFooterHeadline.classList.remove("headline-zoom");
// });
