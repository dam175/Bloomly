// Obtener elementos
const menuBtn = document.getElementById("menu-btn");
const menuLateral = document.getElementById("menu-lateral");
const closeBtn = document.getElementById("close-btn");
const overlay = document.getElementById("overlay");

// Mostrar el menú
menuBtn.addEventListener("click", () => {
  menuLateral.classList.add("activo");
  overlay.classList.add("activo");
});

// Cerrar el menú (botón X o fondo oscuro)
closeBtn.addEventListener("click", cerrarMenu);
overlay.addEventListener("click", cerrarMenu);

function cerrarMenu() {
  menuLateral.classList.remove("activo");
  overlay.classList.remove("activo");
}

// === BUSCADOR GLOBAL ===
document.addEventListener("DOMContentLoaded", () => {
  const buscador = document.getElementById("buscar");
  if (!buscador) return; // Evita errores si no hay barra en la página
  
  buscador.addEventListener("keyup", () => {
    const texto = buscador.value.toLowerCase();
    const productos = document.querySelectorAll(".producto, .cuadro");
    
    productos.forEach(prod => {
      const nombre = prod.querySelector("h3")?.textContent.toLowerCase() || "";
      const descripcion = prod.querySelector("p")?.textContent.toLowerCase() || "";
      const visible = nombre.includes(texto) || descripcion.includes(texto);
      prod.style.display = visible ? "block" : "none";
    });
  });
});
