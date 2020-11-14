//Componentes de registro
const Nombre = document.getElementById("#Nombre");
const Correo = document.getElementById("#Correo");
const Contraseña = document.getElementById("#Contraseña");
const CContraseña = document.getElementById("#CContraseña");
const btnRegistro = document.getElementById("#btnRegistro");

//Componentes de login
const btnLogin = document.getElementById("#btnLogin");
const InputCorreo = document.getElementById("#InputCorreo");
const InputContraseña = document.getElementById("#InputContraseña");

//Componentes de productos
const mainContainer = document.getElementById("#ContenedorProductos")
const btnComprar = document.getElementById("#btnComprar");

//Arreglo de usuarios
let arrayUsuarios = [];

//Arreglo de productos
let arrayProductos = [];

//Arreglo de carrito
let arrayCarrito = [];

//ID Usuario actual
let idUsuario;

//BindTaskEvent
const bindTaskEvent = function (el, event, fn) {
    el.addEventListener(event, fn)
}


//Carga de productos a JSON
const cargaProductos = function () {
    for (let i = 0; i < 4; i++) {
        const JSonProducto = { imagen: "img/cburritos.jpg", precio: "80$", nombre: "Burritos de machaca", descripcion: "1 Orden", cantidad: 8 }
        arrayProductos.push(JSonProducto)
        localStorage.setItem("Productos", JSON.stringify(arrayProductos))
    }
    for (let i = 0; i < 4; i++) {
        const JSonProducto = { imagen: "img/cemmpanadas.jpg", precio: "50$", nombre: "Empanaditas de mango", descripcion: "1 Orden", cantidad: 8 }
        arrayProductos.push(JSonProducto)
        localStorage.setItem("Productos", JSON.stringify(arrayProductos))
    }
}


//Añadir al carrito
const addCarrito = function (e) {
    const parent = e.target.parentNode;
    const comp = parent.querySelector(".htxt")
    const img = parent.parentNode;
    const cont = img.parentNode;
    const cant = cont.querySelector(".cantidad")
    const idContainer = cont.id;

    arrayCarrito.push(arrayProductos[idContainer]);

    if(arrayUsuarios[idUsuario].carrito)
        arrayUsuarios[idUsuario].carrito = arrayCarrito;
    actUsuarios();

    arrayProductos[idContainer].cantidad--;
    cant.textContent = ("Cantidad: " + arrayProductos[idContainer].cantidad)
    actProductos();

    //Producto agotado
    if (arrayProductos[idContainer].cantidad == 0) {
        comp.textContent = "Agotado"
        comp.removeEventListener("click", addCarrito);
        cont.classList.add("agotado")
    }
}

//Funcion para obtener los usuarios
function getUsuarios() {
    arrayUsuarios = localStorage.getItem('Usuarios')
        ? JSON.parse(localStorage.getItem('Usuarios'))
        : []
}

//Actualizar usuario
const actUsuarios = function () {
    localStorage.setItem("Usuarios", JSON.stringify(arrayUsuarios))
}

//Actualizar producto
const actProductos = function () {
    localStorage.setItem("Productos", JSON.stringify(arrayProductos))
}

//Carga de JSON productos a HTML
if (mainContainer) {
    if (localStorage.getItem("Productos") == null) {
        cargaProductos();
    }
    getProductos();
    putProductos();
}

//Obtencion de usuarios al recargar pagina
if (localStorage != null)
    getUsuarios();

//Boton registro de usuario
if (btnRegistro) {
    btnRegistro.addEventListener("click", () => {

        let cr = false;

        if (Correo.value == "" || Nombre.value == "" || Contraseña.value == "" || CContraseña.value == "") {
            window.alert("Error: Faltan campos por llenar.");
        }
        else {
            if (Contraseña.value !== CContraseña.value)
                window.alert("Las contraseñas no coinciden");
            else {
                const jSonUsuario = { nombre: Nombre.value, correo: Correo.value, contraseña: Contraseña.value, carrito: []}
                for (let i = 0; i < arrayUsuarios.length; i++) {
                    if (jSonUsuario.correo === arrayUsuarios[i].correo)
                        cr = true;
                }
                if (cr)
                    window.alert("Error: Correo en cuenta ya existente, favor de introducir otro.");
                else {
                    addUsuario(jSonUsuario);
                    var a = document.createElement("a");
                    a.href = "index.html";
                    a.click();
                }
            }
        }
    })
}

//Boton inicio de sesion
if (btnLogin) {
    btnLogin.addEventListener("click", () => {
        if (InputCorreo.value == "" || InputContraseña.value == "") {
            window.alert("Error: Faltan campos por llenar.");
        }
        else {
            const JSonLogIn = { correo: InputCorreo.value, contraseña: InputContraseña.value }
            if (verifyUsuario(JSonLogIn) >= 0) {
                prompt("Hola " + arrayUsuarios[idUsuario].nombre)
                var a = document.createElement("a");
                a.href = "principal.html";
                a.click();
            }
        }
    })
}

//Funcion agregar usuario registro
const addUsuario = function (jSon) {
    arrayUsuarios.push(jSon)
    localStorage.setItem("Usuarios", JSON.stringify(arrayUsuarios))
}

//Funcion verificacion de usuario
const verifyUsuario = function (jSon) {
    let vu = -1;
    for (let i = 0; i < arrayUsuarios.length; i++) {
        if (jSon.correo == arrayUsuarios[i].correo && jSon.contraseña == arrayUsuarios[i].contraseña) {
            vu = i;
            console.log(vu)
            idUsuario = vu;
        }

    }
    if (vu < 0)
        window.alert("Adertencia: Datos ingresados erroneos, intentelo de nuevo.");
    return vu;
}

//Cargar datos productos desde local storage
function getProductos() {
    arrayProductos = localStorage.getItem("Productos")
        ? JSON.parse(localStorage.getItem("Productos"))
        : []
}

//Cargar array a imagenes
function putProductos() {
    let i = 0;
    let c = 0;
    let row = document.createElement("div")
    row.classList.add("productorow")
    arrayProductos.forEach(producto => {

        const container = document.createElement("div")
        const img = document.createElement("img");
        const divimg = document.createElement("div");
        const divtxt = document.createElement("div")
        const txt = document.createElement("a")
        const precio = document.createElement("div")
        const nombre = document.createElement("div")
        const descripcion = document.createElement("div")
        const cantidad = document.createElement("div")

        precio.textContent = producto.precio;
        nombre.textContent = producto.nombre;
        descripcion.textContent = producto.descripcion;
        cantidad.textContent = ("Cantidad: " + producto.cantidad);
        txt.textContent = "Comprar";
        img.src = producto.imagen;

        container.classList.add("productocontainer")
        divimg.classList.add("imgproductologocontainer")
        img.classList.add("logo");
        divtxt.classList.add("hdivtxt")
        txt.classList.add("htxt")
        precio.classList.add("precio")
        nombre.classList.add("descripcion")
        descripcion.classList.add("descripcion")
        cantidad.classList.add("descripcion")
        cantidad.classList.add("cantidad")


        if(producto.cantidad==0)
            txt.textContent = "Agotado";
        else
        bindTaskEvent(txt, "click", addCarrito);

        divtxt.appendChild(txt)

        divimg.appendChild(img)
        divimg.appendChild(divtxt)

        container.appendChild(divimg)
        container.appendChild(precio)
        container.appendChild(nombre)
        container.appendChild(descripcion)
        container.appendChild(cantidad)

        container.id = i;

        row.appendChild(container)

        i++;

        if (c == 3) {
            mainContainer.appendChild(row)
            row = document.createElement("div")
            row.classList.add("productorow")
            c = 0;
        }
        else
            c++
    })
    mainContainer.appendChild(row)
}