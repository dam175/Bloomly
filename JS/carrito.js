// carrito.js - funcional y simple, usa localStorage para persistir entre páginas

// Selectores
const btnCarrito = document.getElementById('btn-carrito'); // el <a id="btn-carrito">
const carritoEl = document.getElementById('carrito');
const cerrarCarritoBtn = document.getElementById('cerrarCarrito');
const vaciarCarritoBtn = document.getElementById('vaciarCarrito');
const listaCarrito = document.getElementById('listaCarrito');
const totalEl = document.getElementById('total');

// cargar carrito desde localStorage
let carritoItems = JSON.parse(localStorage.getItem('carrito')) || [];

// abrir / cerrar
if (btnCarrito) {
  btnCarrito.addEventListener('click', function(e) {
    e.preventDefault(); // evita navegar
    carritoEl.classList.add('activo');
    renderizarCarrito();
  });
}
if (cerrarCarritoBtn) {
  cerrarCarritoBtn.addEventListener('click', () => carritoEl.classList.remove('activo'));
}

// vaciar
if (vaciarCarritoBtn) {
  vaciarCarritoBtn.addEventListener('click', () => {
    carritoItems = [];
    guardarYRenderizar();
  });
}

// función para guardar en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carritoItems));
}

// función para renderizar carrito
function renderizarCarrito() {
  listaCarrito.innerHTML = '';
  let total = 0;

  carritoItems.forEach(item => {
    const li = document.createElement('li');

    // nombre, cantidad y subtotal
    const subtotal = (item.precio * item.cantidad);
    total += subtotal;

    li.innerHTML = `
      <div style="flex:1">
        <strong>${escapeHtml(item.nombre)}</strong><br>
        Q${item.precio.toFixed(2)} x ${item.cantidad}
      </div>
      <div style="text-align:right">
        <div>Q${subtotal.toFixed(2)}</div>
        <button class="btn-eliminar" data-nombre="${escapeHtml(item.nombre)}">Eliminar</button>
      </div>
    `;

    listaCarrito.appendChild(li);
  });

  totalEl.textContent = `Total: Q${total.toFixed(2)}`;

  // añadir listeners a botones eliminar (delegación simple)
  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const nombre = e.target.getAttribute('data-nombre');
      eliminarProducto(nombre);
    });
  });
}

// eliminar producto por nombre
function eliminarProducto(nombre) {
  carritoItems = carritoItems.filter(p => p.nombre !== nombre);
  guardarYRenderizar();
}

// guardar y renderizar
function guardarYRenderizar() {
  guardarCarrito();
  renderizarCarrito();
}

// función para añadir productos — la llamaremos desde los botones .agregar-btn
function agregarProductoDesdeDOM(productoEl) {
  const nombre = productoEl.querySelector('h2').textContent.trim();
  const precioText = productoEl.querySelector('.precio').textContent.trim(); // ejemplo "Q25.00"
  const precio = parseFloat(precioText.replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
  const cantidadInput = productoEl.querySelector('select');
  const cantidad = cantidadInput ? parseInt(cantidadInput.value) : 1;

  const existente = carritoItems.find(p => p.nombre === nombre);
  if (existente) existente.cantidad += cantidad;
  else carritoItems.push({ nombre, precio, cantidad });

  guardarYRenderizar();
}

// conectar botones .agregar-btn actuales en la página (funciona en todas las páginas si este script está en ellas)
document.querySelectorAll('.agregar-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const productoEl = e.target.closest('.producto');
    if (!productoEl) return;
    agregarProductoDesdeDOM(productoEl);
    // abrir carrito para ver confirmación
    carritoEl.classList.add('activo');
  });
});

// inicializar render
renderizarCarrito();

// utilidad: proteger texto al inyectar (evita problemas con comillas en nombres)
function escapeHtml(text) {
  return text.replace(/[&<>"']/g, function (m) {
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m];
  });
}
