let pedidos = [];

// Cambiar categoría
function mostrarCategoria(id) {
    document.querySelectorAll(".productos").forEach(sec => {
        sec.style.display = "none";
    });

    document.getElementById(id).style.display = "grid";
}

// Agregar producto
function agregar(boton) {
    let card = boton.parentElement;

    let nombre = card.querySelector("h3").textContent;
    let codigo = card.querySelector(".codigo").textContent.replace("COD: ", "");
    let cantidad = parseFloat(card.querySelector("input[type='number']").value);
    let precio = parseFloat(card.querySelector("input[type='text']").value);

    if (!cantidad || !precio) {
        alert("Completa cantidad y precio");
        return;
    }

    let existente = pedidos.find(p => p.nombre === nombre);

    if (boton.classList.contains("agregado")) {
        boton.classList.remove("agregado");
        boton.textContent = "Agregar";
        pedidos = pedidos.filter(p => p.nombre !== nombre);
    } else {
        boton.classList.add("agregado");
        boton.textContent = "Agregado ✔";

        if (existente) {
            existente.cantidad = cantidad;
            existente.precio = precio;
        } else {
            pedidos.push({ nombre, cantidad, precio, codigo });
        }
    }

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

    texto += `<br><strong>TOTAL: ${total}</strong>`;
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

    mensaje += `%0ATOTAL: ${total}`;

    let numero = "59165545622"; // CAMBIA ESTO
    let url = `https://wa.me/${numero}?text=${mensaje}`;

    window.open(url, "_blank");
}

// PRODUCTOS (EJEMPLO CON DATOS REALES)
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

                <input type="number" placeholder="Cantidad">
                <input type="text" placeholder="Precio">

                <button onclick="agregar(this)">Agregar</button>
            </div>
        `;
    });
}

cargarProductos();
actualizarVista();
mostrarCategoria("salchichas");
