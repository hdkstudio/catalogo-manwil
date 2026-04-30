let pedidos = [];

// INICIO
function comenzar() {
    document.getElementById("inicio").style.display = "none";
    document.getElementById("catalogo").style.display = "block";

    mostrarCategoria("salchichas");
}

// Cambiar categoría
function mostrarCategoria(id) {
    document.querySelectorAll(".productos").forEach(sec => {
        sec.style.display = "none";
    });

    document.getElementById(id).style.display = "grid";
}

// Agregar producto
function agregar(boton) {
    let card = boton.closest(".card");

    let nombre = card.querySelector("h3").textContent;
    let codigo = card.querySelector(".codigo").textContent.replace("COD: ", "");
    let cantidad = parseFloat(card.querySelector(".cantidad").value);
    let precio = parseFloat(card.querySelector(".precio").value);

    if (!cantidad || cantidad <= 0 || !precio || precio <= 0) {
        alert("Completa cantidad y precio correctamente");
        return;
    }

    let existente = pedidos.find(p => p.codigo === codigo);

    if (existente) {
        existente.cantidad = cantidad;
        existente.precio = precio;
    } else {
        pedidos.push({ nombre, cantidad, precio, codigo });
    }

    boton.classList.add("agregado");
    boton.textContent = "Agregado ✔";

    actualizarVista();
}

// Quitar producto
function quitar(boton) {
    let card = boton.closest(".card");
    let codigo = card.querySelector(".codigo").textContent.replace("COD: ", "");

    pedidos = pedidos.filter(p => p.codigo !== codigo);

    let btnAgregar = card.querySelector(".btn-agregar");
    btnAgregar.classList.remove("agregado");
    btnAgregar.textContent = "Agregar";

    actualizarVista();
}

// Vista previa
function actualizarVista() {
    let lista = document.getElementById("listaPedido");

    if (pedidos.length === 0) {
        lista.innerHTML = "No hay productos agregados";
        return;
    }

    let texto = "";
    let total = 0;

    pedidos.forEach(p => {
        total += p.cantidad * p.precio;
        texto += `• [${p.codigo}] ${p.nombre} | Cantidad: ${p.cantidad} | Precio: ${p.precio}<br>`;
    });

    texto += `<br><strong>TOTAL: ${total.toFixed(2)} Bs</strong>`;
    lista.innerHTML = texto;
}

// WhatsApp
function enviarPedido() {
    if (pedidos.length === 0) {
        alert("No hay pedidos");
        return;
    }

    let mensaje = "Pedido:%0A";
    let total = 0;

    pedidos.forEach(p => {
        total += p.cantidad * p.precio;
        mensaje += `[${p.codigo}] ${p.nombre} - Cantidad: ${p.cantidad} - Precio: ${p.precio}%0A`;
    });

    mensaje += `%0ATOTAL: ${total.toFixed(2)} Bs`;

    let numero = "59165545622"; // CAMBIA ESTO
    let url = `https://wa.me/${numero}?text=${mensaje}`;

    window.open(url, "_blank");
}

// PRODUCTOS (FÁCIL PARA AGREGAR MÁS)
function cargarProductos() {

    const datos = [
        {
            cat: "salchichas",
            nombre: "Salchicha Ahumada",
            datos: "Peso: 1-3-5 Kg. | 18 Unid. por kilo | 12cm",
            img: "img/sal/sal-001.webp",
            cod: "SAL-001"
        },
        {
            cat: "chorizos",
            nombre: "Chorizo Precocido de Cerdo",
            datos: "Peso: 1/2kg | 9-10 Unidades | 9cm",
            img: "img/ch/ch-001.webp",
            cod: "CHO-001"
        },
        {
            cat: "mortadelas",
            nombre: "Mortadela Tradicional",
            datos: "Peso: 2kg",
            img: "img/producto3.png",
            cod: "MOR-001"
        },
        {
            cat: "sellados",
            nombre: "Jamón Sellado",
            datos: "Empaque al vacío",
            img: "img/producto4.png",
            cod: "SEL-001"
        },
        {
            cat: "salame",
            nombre: "Salame Premium",
            datos: "Curado",
            img: "img/producto5.png",
            cod: "SALP-001"
        },
        {
            cat: "tocino",
            nombre: "Tocino Ahumado",
            datos: "500g",
            img: "img/producto6.png",
            cod: "TOC-001"
        }
    ];

    datos.forEach(p => {
        let contenedor = document.getElementById(p.cat);

        contenedor.innerHTML += `
            <div class="card">
                <img src="${p.img}">
                <h3>${p.nombre}</h3>
                <p>${p.datos}</p>
                <p class="codigo">COD: ${p.cod}</p>

                <input type="number" class="cantidad" placeholder="Cantidad">
                <input type="number" class="precio" placeholder="Precio (Bs)">

                <div class="botones-card">
                    <button class="btn-agregar" onclick="agregar(this)">Agregar</button>
                    <button class="btn-quitar" onclick="quitar(this)">Quitar</button>
                </div>
            </div>
        `;
    });

}
function borrarTodo() {
    let seguro = confirm("¿Estás seguro de eliminar todo el pedido?");

    if (!seguro) {
        return;
    }

    pedidos = [];

    // Resetear botones e inputs
    document.querySelectorAll(".card").forEach(card => {
        let btnAgregar = card.querySelector(".btn-agregar");
        let inputCantidad = card.querySelector(".cantidad");
        let inputPrecio = card.querySelector(".precio");

        // Reset botón agregar
        btnAgregar.classList.remove("agregado");
        btnAgregar.textContent = "Agregar";

        // Vaciar inputs
        inputCantidad.value = "";
        inputPrecio.value = "";
    });

    actualizarVista();
    alert("Pedido eliminado correctamente.");
}
cargarProductos();
actualizarVista();