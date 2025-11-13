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


