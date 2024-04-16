function agregarAlCarrito(id, cantidad) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  let productoExistenteIndex = carrito.findIndex((item) => item.id === id);

  if (productoExistenteIndex !== -1) {
    carrito[productoExistenteIndex].cantidad += cantidad;
  } else {
    const producto = {
      id: id,
      cantidad: cantidad,
    };
    carrito.push(producto);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  console.log("Producto(s) agregado(s) al carrito:", {
    id: id,
    cantidad: cantidad,
  });
}

agregarAlCarrito("1", 1);
agregarAlCarrito("2", 1);
agregarAlCarrito("3", 1);
agregarAlCarrito("1", 1);

mostrarCarrito();

function obtenerUrlImagen(id) {
  const prod = inventario_joyeria.filter((el) => el.id === id)[0];
    return prod.Imagen
}

function mostrarCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const carritoCuerpo = document.getElementById("carrito-cuerpo");

  carritoCuerpo.innerHTML = "";

  carrito.forEach((item) => {
    const fila = document.createElement("tr");

    const columnaImagen = document.createElement("td");
    const imagen = document.createElement("img");
    imagen.src = obtenerUrlImagen(item.id);
    imagen.alt = "Imagen del producto";
    imagen.style.maxWidth = "100px";
    columnaImagen.appendChild(imagen);
    fila.appendChild(columnaImagen);

    const columnaProducto = document.createElement("td");
    columnaProducto.textContent = obtenerNombreProducto(item.id);
    fila.appendChild(columnaProducto);

    const columnaCantidad = document.createElement("td");
    columnaCantidad.textContent = item.cantidad;
    fila.appendChild(columnaCantidad);

    const columnaAcciones = document.createElement("td");

    const btnAumentar = document.createElement("button");
    btnAumentar.textContent = "+";
    btnAumentar.addEventListener("click", function () {
      aumentarCantidad(item.id);
    });
    columnaAcciones.appendChild(btnAumentar);

    const btnReducir = document.createElement("button");
    btnReducir.textContent = "-";
    btnReducir.addEventListener("click", function () {
      reducirCantidad(item.id);
    });
    columnaAcciones.appendChild(btnReducir);

    fila.appendChild(columnaAcciones);

    carritoCuerpo.appendChild(fila);
  });
}

function aumentarCantidad(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const producto = carrito.find((item) => item.id === id);

  if (producto) {
    producto.cantidad++;
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  mostrarCarrito();
}

function reducirCantidad(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const producto = carrito.find((item) => item.id === id);

  if (producto && producto.cantidad > 1) {
    producto.cantidad--;
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  mostrarCarrito();
}

function obtenerNombreProducto(id) {
  const prod = inventario_joyeria.filter((el) => el.id === id)[0];
  return prod.Nombre
}
