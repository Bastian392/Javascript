













// Clase producto //
class Producto {
  constructor(nombre, precio, cantidad) {
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
  }
}

// Inventario //
const inventario = [];

// Agregar un producto al inventario //
function agregarProducto() {
    const nombre = prompt("Ingrese el nombre del producto:");
    const precio = parseFloat(prompt("Ingrese el precio del producto:"));
    const cantidad = parseInt(prompt("Ingrese la cantidad del producto:"));
  
    const producto = new Producto(nombre, precio, cantidad);
    inventario.push(producto);
  
    alert("Producto agregado al inventario:");
  }
  
// Buscar un producto en el inventario por nombre //
function buscarProducto() {
    const nombre = prompt("Ingrese el nombre del producto");
  
    for (let i = 0; i < inventario.length; i++) {
      if (inventario[i].nombre.toLowerCase() === nombre.toLowerCase()) {
        // return inventario[i];
        alert ("Producto encontrado:");
       } else  {
            alert("Producto no encontrado.");
       }
  }
}





// Switch Mode //
const colorModeButton = document.querySelector("#color-mode");
const body = document.body;

colorModeButton.addEventListener("click", cambiarModoColor);

function cambiarModoColor() {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    colorModeButton.innerText = "Light Mode";
  }
  else {
    colorModeButton.innerText = "Dark Mode";
  }
}









// Alerta //
// Mensaje de Alerta //
const mensajeAlerta = "¿Estas seguro que quieres tocarlo?"

const alerta = document.querySelector("#noTocar");

alerta.addEventListener("mouseover", mostrarAlerta)


alerta.addEventListener("click", AlertaClick)


// Funcion de alerta //

function mostrarAlerta() {
  alert(mensajeAlerta);
  alerta.removeEventListener("mouseover", mostrarAlerta)
}

function AlertaClick() {
    window.location.href = "https://thumbs.gfycat.com/RewardingLimpCowbird-mobile.mp4";
    
}




// Inventario avanzado //

    // Obtener referencias a los elementos del DOM
    const nombreInput = document.getElementById('nombre');
    const cantidadInput = document.getElementById('cantidad');
    const agregarBtn = document.getElementById('agregar');
    const inventarioList = document.getElementById('inventario');

    // Cargar el inventario desde el LocalStorage al cargar la página
    cargarInventario();

    // Agregar evento click al botón "Agregar"
    agregarBtn.addEventListener('click', agregarItem);

    // Función para agregar un item al inventario
    function agregarItem() {
      const nombre = nombreInput.value;
      const cantidad = cantidadInput.value;

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