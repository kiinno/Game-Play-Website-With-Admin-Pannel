const switcher = document.getElementById("theme-switch");

const switch_effect = (ev) => {
  const body = document.body;

  if (body.classList.contains("dark")) localStorage.setItem("theme", "light");
  else localStorage.setItem("theme", "dark");

  body.classList.toggle("dark");
};

switcher.addEventListener("click", switch_effect);

window.addEventListener("load", () => {
  const mode = window.localStorage.getItem("theme");

  if (mode === "dark") switch_effect();
});
