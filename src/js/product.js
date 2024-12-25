function initProduct() {
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    return; // Disable functionality on mobile
  }
  const elm = document.getElementById("product-image-thumb");
  const zoom = document.getElementById("product-image-zoom");
  if (!zoom) return;
  zoom.style.backgroundImage = `url(${elm.src})`;
  const h = elm.width;
  const w = elm.height;
  zoom.onmousemove = (e) => {
    var y = (100 * e.offsetY) / h;
    var x = (100 * e.offsetX) / w;
    zoom.style.backgroundPositionY = y + "%";
    zoom.style.backgroundPositionX = x + "%";
  };

  zoom.onmouseleave = () => {
    zoom.style.backgroundPosition = "50% 50%";
  };
}

window.scripts = window.scripts || [];
window.scripts.push(initProduct);
