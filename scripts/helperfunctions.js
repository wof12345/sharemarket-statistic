function isInViewport(element) {
  if (element) {
    const rect = element.getBoundingClientRect();

    return (
      rect.left <= window.innerWidth || document.documentElement.clientWidth
    );
  }
}
