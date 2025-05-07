document.querySelectorAll(".contact-icons .icon i").forEach((icon) => {
  icon.addEventListener("click", (e) => {
    // Prevent the event from triggering on the surrounding elements
    e.stopPropagation();

    const iconParent = icon.parentElement;
    const textToCopy = iconParent.getAttribute("data-copy");

    // If it's the location icon, open Google Maps
    const locationLink = iconParent.getAttribute("data-location");
    if (locationLink) {
      window.open(locationLink, "_blank");
      return; // Stop further actions (copying text)
    }

    // For other icons (phone/email), copy the text to the clipboard
    navigator.clipboard.writeText(textToCopy).then(() => {
      // Optional: Temporary visual feedback for "Copied"
      const originalText = iconParent.querySelector("p").textContent;
      iconParent.querySelector("p").textContent = "Copied!";
      setTimeout(() => {
        iconParent.querySelector("p").textContent = originalText;
      }, 1000);
    });
  });
});
