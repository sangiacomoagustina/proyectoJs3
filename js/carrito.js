let producto = [];
let carrito = [];

//Descomentar para Cargar los Productos al Local Storage

/*
producto.push(new Item({nombre: `Leche`, marca: `La Serenísima`, precio: 390 }, 5));
producto.push(new Item(new Productos(`Azúcar`, `Ledesma`, 700.20), 4));
producto.push(new Item(new Productos(`Azúcar`, `Chango`, 650.30), 4));
producto.push(new Item(new Productos(`Yerba`, `Mañanita`, 880.50), 10));
producto.push(new Item(new Productos(`Yerba`, `Playadito`, 1880.90), 4));
producto.push(new Item(new Productos(`Café`, `Arlistan`, 715.25), 2));
producto.push(new Item(new Productos(`Té`, `La Virginia`, 334.80), 1));
producto.push(new Item(new Productos(`Mate Cocido`, `Unión`, 296.50), 4));
producto.push(new Item(new Productos(`Galletitas`, `Granix`, 800.3), 6));
producto.push(new Item(new Productos(`Galletitas`, `Oreo`, 913), 2));
producto.push(new Item(new Productos(`Manteca`, `La Serenísima`, 587), 3));
producto.push(new Item(new Productos(`Dulce de Leche`, `La Serenísima`, 549), 2));

localStorage.setItem(`productos`, JSON.stringify(producto));
*/

const selectProd = document.querySelector(`#productos`);
const botonAgregar = document.querySelector(`#agregar`);


function traerProductos() {
    productos = JSON.parse(localStorage.getItem(`productos`)) || [];
    carrito = JSON.parse(localStorage.getItem(`carrito`)) || [];
}

function opciones() {
    productos.forEach(({ producto }, index) => {
        const { nombre, marca, precio } = producto;
        const option = document.createElement(`option`);
        option.textContent = `${nombre} - ${marca} - $${precio}`;
        option.value = index;
        selectProd.appendChild(option);
    });
}

document.addEventListener(`DOMContentLoaded`, () => {
    traerProductos();
    opciones();
    tabla();

    botonAgregar.addEventListener(`submit`, (e) => {
        e.preventDefault();
        const elegido = productos.find((item, index) => index === +selectProd.value);

        if (elegido === undefined) {
            alert(`Debe seleccionar un producto`);
            return;
        }

        const nuevoItem = carrito.findIndex((item) => item.producto.producto.nombre === elegido.producto.nombre && item.producto.producto.marca === elegido.producto.marca);
        if (nuevoItem !== -1) {
            carrito[nuevoItem].cantidad++;
        } else {
            const item = new Item(elegido, 1);
            carrito.push(item);
        }

        localStorage.setItem(`carrito`, JSON.stringify(carrito));
        tabla();
    })
})

function tabla() {
    const bTabla = document.getElementById(`items`);
    const total = document.getElementById(`total`)
    bTabla.innerHTML = ``;
    carrito.forEach((item, index) => {
        const { cantidad, producto: { producto: { marca, nombre, precio } } } = item;
        bTabla.innerHTML = bTabla.innerHTML + `
        <tr class="">
        <th scope="row"> ${index + 1} </th>
        <td> ${nombre || ``} </td>
        <td> ${marca || ``} </td>
        <td> $${precio || ``} </td>
        <td> ${cantidad || ``} </td>
        <td> $${precio * cantidad || 0} </td>
        <td> <button class="borrarProd">❌</button><td>
        </tr>
        `;

    });

    total.textContent = carrito.reduce((acc, item) => acc + item.producto.producto.precio * item.cantidad, 0);
}

document.addEventListener("click", function (e) {
    const target = e.target.closest(".borrarProd");
    console.log(`hola, estoy escuchando`);
    
    if (target) {
        const index = target.closest('tr').rowIndex;
        const itemABorrar = carrito[index - 1];
        carrito = carrito.filter((item) => {
            return item != itemABorrar;
        })

        localStorage.setItem(`carrito`, JSON.stringify(carrito));
        tabla();
    }
});