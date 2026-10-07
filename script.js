document.addEventListener("keydown", e => {
  // Don't let AFL controls interfere with text entry.
  const typing =
    e.target.tagName === "INPUT" ||
    e.target.tagName === "TEXTAREA" ||
    e.target.isContentEditable;

  if (typing) {
    // Allow Ctrl + Enter to submit the Entertainment answer.
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      checkAnswer();
    }

    return;
  }

  const key = e.key.toLowerCase();

  if (
    ["w", "a", "s", "d", "shift", "e", "k", "h", "l"].includes(key)
  ) {
    e.preventDefault();
  }

  keys[key] = true;

  if (key === "k") kick();
  if (key === "h") handball();
  if (key === "l") leadKick();
  if (key === "e") evade();
});

document.addEventListener("keyup", e => {
  const typing =
    e.target.tagName === "INPUT" ||
    e.target.tagName === "TEXTAREA" ||
    e.target.isContentEditable;

  if (typing) return;

  keys[e.key.toLowerCase()] = false;
});
