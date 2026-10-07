document.addEventListener("keydown", e => {
  // If the player is typing an Entertainment answer,
  // DO NOT let AFL controls interfere.
  const typing =
    document.activeElement === answerBox ||
    document.activeElement?.tagName === "INPUT" ||
    document.activeElement?.tagName === "TEXTAREA" ||
    document.activeElement?.isContentEditable;

  if (typing) {
    // Enter submits the answer
    if (e.key === "Enter") {
      e.preventDefault();
      checkAnswer();
    }

    // Ignore all AFL controls while typing
    return;
  }

  // AFL controls only work during the AFL game
  if (!gameActive) return;

  const key = e.key.toLowerCase();

  const aflKeys = [
    "w",
    "a",
    "s",
    "d",
    "shift",
    "e",
    "k",
    "h",
    "l"
  ];

  if (aflKeys.includes(key)) {
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
    document.activeElement === answerBox ||
    document.activeElement?.tagName === "INPUT" ||
    document.activeElement?.tagName === "TEXTAREA" ||
    document.activeElement?.isContentEditable;

  // Don't interfere with typing
  if (typing) return;

  keys[e.key.toLowerCase()] = false;
});
