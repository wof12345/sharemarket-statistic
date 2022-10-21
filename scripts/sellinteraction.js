let input_gen_cont = document.querySelector(`.input_gen_cont`);
let floater_indicator = document.querySelector(`.arrow_shape`);

let pageLogics = {
  floater_gen_shrunk: false,
};

floater_indicator.addEventListener("click", () => {
  if (!pageLogics.floater_gen_shrunk) {
    floater_indicator.style = ` transform: rotate(180deg);`;
    pageLogics.floater_gen_shrunk = true;
    input_gen_cont.style = `transform: translateX(100%);`;
  } else {
    floater_indicator.style = `right:0%;`;
    pageLogics.floater_gen_shrunk = false;
    input_gen_cont.style = ``;
  }
});
