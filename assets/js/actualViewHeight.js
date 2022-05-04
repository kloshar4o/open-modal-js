/* Actual screen view height for IOS */
function setViewHeight() {
  const vh = `${window.innerHeight}px`;
  document.documentElement.style.setProperty("--screen-h", vh);
}
setViewHeight();
window.addEventListener("resize", setViewHeight);
