window.addEventListener("load", (_) => {
  let opacity = 1;
  const cycles = 100;
  const duration = 400;
  const div = opacity / cycles;
  loader.removeChild(cyrcle);
  var animation = window.setInterval(() => {
    if (opacity > 0) {
      opacity -= div;
      loader.style.opacity = opacity;
    } else {
      document.body.removeChild(loader);
      window.clearInterval(animation);
    }
  }, duration / cycles);

  document.querySelector(".delete_button")?.addEventListener("click", (e) => {
    const confirm = window.confirm(
      "Are you sure, you want to delete your account?"
    );
    if (!confirm) {
      e.preventDefault();
    }
  });
  document.querySelectorAll("a").forEach((hyperlink) => {
    if (hyperlink.href === window.location.href) {
      hyperlink.classList.add("active");
    }
    hyperlink.addEventListener("click", (_) =>
      _.target.href === window.location.href ? _.preventDefault() : true
    );
  });
});
