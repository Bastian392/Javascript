// DarkMode
const colorModeButton = document.querySelector("#color-mode");
const body = document.body;
let bodyStorage = localStorage.getItem("dark-mode");

// Funciones DarkMode
function activarDarkMode() {
  body.classList.add("dark-mode");
  localStorage.setItem("dark-mode", "activado");
  colorModeButton.innerText = "Light Mode";
}

function desactivarDarkMode() {
  body.classList.remove("dark-mode");
  localStorage.setItem("dark-mode", "desactivado");
  colorModeButton.innerText = "Dark Mode";
}

// Verificar el estado almacenado en localStorage para activar o desactivar el modo oscuro
if (bodyStorage === "activado") {
  activarDarkMode();
} else {
  desactivarDarkMode();
}

// Evento click en el botón de cambio de modo
colorModeButton.addEventListener("click", () => {
  bodyStorage = localStorage.getItem("dark-mode");
  if (bodyStorage === "activado") {
    desactivarDarkMode();
  } else {
    activarDarkMode();
  }
});

// Inventario
// Obtener referencias a los elementos del DOM
const nombreInput = document.getElementById('nombre');
const cantidadInput = document.getElementById('cantidad');
const agregarBtn = document.getElementById('agregar');
const inventarioList = document.getElementById('inventario');

// Cargar el inventario desde el LocalStorage al cargar la página
cargarInventario();

// EventListener submit form
document.getElementById('formInventario').addEventListener('submit', agregarItem);

// Función para agregar un item al inventario
function agregarItem(event) {
  event.preventDefault();
  const nombre = nombreInput.value;
  const cantidad = cantidadInput.value;
  
  // Verificar si nombre y cantidad tienen un valor
  if (nombre && cantidad) {
    // Crear un nuevo elemento li para el item
    const item = document.createElement('li');
    
    // Crear span para mostrar el nombre y la cantidad del producto
    const infoSpan = document.createElement('span');
    infoSpan.textContent = nombre + ' - ' + cantidad;
    item.appendChild(infoSpan);
    
    // Crear botón de eliminar
    const eliminarBtn = document.createElement('button');
    eliminarBtn.textContent = 'Eliminar';
    eliminarBtn.classList.add('eliminar');
    eliminarBtn.addEventListener('click', () => {
      // Mostrar una alerta Toastify al eliminar el producto
      Toastify({
        text: "Producto eliminado",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #ff4b1f, #ff9068)",
        }
      }).showToast();
      item.remove(); // Eliminar el elemento del DOM
      guardarInventario(); // Guardar el inventario actualizado en el LocalStorage
    });
    item.appendChild(eliminarBtn);
    
    // Agregar el item al inventario
    inventarioList.appendChild(item);
    
    // Limpiar los inputs
    nombreInput.value = '';
    cantidadInput.value = '';
    
    guardarInventario(); // Guardar el inventario en el LocalStorage
  }
}

// Cargar el inventario desde el LocalStorage
function cargarInventario() {
  const inventario = JSON.parse(localStorage.getItem('inventario'));
  if (inventario) {
    inventario.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${item.nombre} - ${item.cantidad}</span>
        <button class="eliminar">Eliminar</button>
      `;
      li.querySelector('.eliminar').addEventListener('click', () => {
        li.remove();
        guardarInventario();
      });
      inventarioList.appendChild(li);
    });
  }
}

// Guardar el inventario en el LocalStorage
function guardarInventario() {
  const items = Array.from(inventarioList.querySelectorAll('li'));
  const inventario = items.map(item => {
    const nombreCantidad = item.querySelector('span').textContent.split(' - ');
    return {
      nombre: nombreCantidad[0],
      cantidad: nombreCantidad[1]
    };
  });
  localStorage.setItem('inventario', JSON.stringify(inventario));
}