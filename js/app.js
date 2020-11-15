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

//Componentes de carrito 
const cartContainer = document.getElementById("#CartContainer")
const btnCarrito = document.getElementById("#btnCarrito");

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

//Carga de productos
const cargaProductos = function () {
        let JSonProducto = { imagen: "img/cburritos.jpg", precio: 80, nombre: "Burritos de machaca", descripcion: "1 Orden", cantidad: 8, id:0}
        arrayProductos.push(JSonProducto)
        JSonProducto = { imagen: "img/cemmpanadas.jpg", precio: 50, nombre: "Empanaditas de mango", descripcion: "1 Orden", cantidad: 8, id:1}
        arrayProductos.push(JSonProducto)
        JSonProducto = { imagen: "img/mango.jpg", precio: 30, nombre: "Nieve de mango", descripcion: "Con chamoy", cantidad: 8, id:2}
        arrayProductos.push(JSonProducto)
        JSonProducto = { imagen: "img/calabbaza.jpg", precio: 35, nombre: "Dulce de calabaza", descripcion: "Rico", cantidad: 8, id:3}
        arrayProductos.push(JSonProducto)
        JSonProducto = { imagen: "img/limonada.jpg", precio: 30, nombre: "Limonada mineral", descripcion: "Refrescante", cantidad: 8, id:4}
        arrayProductos.push(JSonProducto)
        JSonProducto = { imagen: "img/naranjada.jpg", precio: 30, nombre: "Naranjada mineral", descripcion: "Refrescante", cantidad: 8, id:5}
        arrayProductos.push(JSonProducto)
        JSonProducto = { imagen: "img/empacarne.jpg", precio: 65, nombre: "Empanadas de carne", descripcion: "3 piezas", cantidad: 8, id:6}
        arrayProductos.push(JSonProducto)
        JSonProducto = { imagen: "img/champurrado.jpg", precio: 20, nombre: "Champurrado", descripcion: "Calientito", cantidad: 8, id:7}
        arrayProductos.push(JSonProducto)
        JSonProducto = { imagen: "img/pay.jpg", precio: 20, nombre: "Pay de queso", descripcion: "1 pieza", cantidad: 8, id:8}
        arrayProductos.push(JSonProducto)
        JSonProducto = { imagen: "img/cafe.jpeg", precio: 15, nombre: "Cafe", descripcion: "Calientito", cantidad: 8, id:9}
        arrayProductos.push(JSonProducto)
        JSonProducto = { imagen: "img/carne.jpg", precio: 30, nombre: "Carne seca", descripcion: "100g", cantidad: 8, id:10}
        arrayProductos.push(JSonProducto)
        JSonProducto = { imagen: "img/concha.jpg", precio: 10, nombre: "Pan", descripcion: "Conchita", cantidad: 8, id:11}
        arrayProductos.push(JSonProducto)

        localStorage.setItem("Productos", JSON.stringify(arrayProductos))
}

//Obtener usuario local storage
function getUsuarioActual (){
    idUsuario = localStorage.getItem("user")
}

//Guardar usuario local storage
function setUsuarioActual (){
    localStorage.setItem("user", idUsuario)
}

//Cargar productos local storage
function getProductos() {
    arrayProductos = localStorage.getItem("Productos")
        ? JSON.parse(localStorage.getItem("Productos"))
        : []
}

//Cargar usuarios local storage
function getUsuarios() {
    arrayUsuarios = localStorage.getItem('Usuarios')
        ? JSON.parse(localStorage.getItem('Usuarios'))
        : []
}

//Cargar carrito
function getCarrito() {
    arrayCarrito = arrayUsuarios[idUsuario].cart;
}

//Agregar usuario
const addUsuario = function (jSon) {
    arrayUsuarios.push(jSon)
    localStorage.setItem("Usuarios", JSON.stringify(arrayUsuarios))
}

//Actualizar usuario
const actUsuarios = function () {
    localStorage.setItem("Usuarios", JSON.stringify(arrayUsuarios))
}

//Actualizar producto
const actProductos = function () {
    localStorage.setItem("Productos", JSON.stringify(arrayProductos))
}

//Obtencion de usuarios al recargar pagina
if (localStorage != null)
{
    getUsuarios();
    getUsuarioActual();
    if(idUsuario)
    {
        getCarrito();
        if(cartContainer)
            putCarrito();
    }
    
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
                window.alert("Bienvenido " + arrayUsuarios[idUsuario].nombre)
                var a = document.createElement("a");
                a.href = "principal.html";
                a.click();
            }
            
        }
    })
}

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
                const jSonUsuario = { nombre: Nombre.value, correo: Correo.value, contraseña: Contraseña.value, cart: []}
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

//Funcion verificacion de usuario
const verifyUsuario = function (jSon) {
    let vu = -1;
    for (let i = 0; i < arrayUsuarios.length; i++) {
        if (jSon.correo == arrayUsuarios[i].correo && jSon.contraseña == arrayUsuarios[i].contraseña) {
            vu = i;
            console.log(vu)
            idUsuario = vu;
            setUsuarioActual ()
        }
    }
    if (vu < 0)
        window.alert("Adertencia: Datos ingresados erroneos, intentelo de nuevo.");
    return vu;
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

    arrayUsuarios[idUsuario].cart = arrayCarrito;
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

//Poner productos en pagina
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

        precio.textContent = (producto.precio+"$");
        nombre.textContent = producto.nombre;
        descripcion.textContent = producto.descripcion;
        cantidad.textContent = ("Cantidad: " + producto.cantidad);
        txt.textContent = "Comprar";
        img.src = producto.imagen;

        container.classList.add("productocontainer")
        divimg.classList.add("imgproductologocontainer")
        img.classList.add("logo")
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

//Poner productos en carrito
function putCarrito() {

        getProductos();
        let productosc = [];
        let productosj = [];
        let t = 0;
    
        for(let i = 0; i<arrayProductos.length; i++){
            productosc[i] = 0;
            arrayUsuarios[idUsuario].cart.forEach(producto => {
                if(producto.id==i)
                {
                    productosc[i]++;
                    productosj[i]= producto;
                }
            })  
        }
    
        for(let i = 0; i<arrayProductos.length; i++){
            
            if(productosc[i]>0)
            {
            let container = document.createElement("div")
            container.classList.add("items")
            const divimg = document.createElement("div")
            const img = document.createElement("img");
            const nombre = document.createElement("div")
            const precio = document.createElement("div")
            const del = document.createElement("a")
            const cant = document.createElement("div")
            
            
            nombre.classList.add("nombreCarrito")
            precio.classList.add("precioCarrito")
            del.classList.add("fas")
            del.classList.add("fa-trash")
            del.classList.add("delicon")
            cant.classList.add("invisible")
    
            del.id=(i);
    
            img.src=productosj[i].imagen;
    
            nombre.textContent = productosj[i].nombre;
            precio.textContent = (productosj[i].precio)+"$ * "+productosc[i]+" = "+ (productosj[i].precio*productosc[i]+"$");
            cant.textContent = productosc[i];
    
            img.classList.add("logo")
            divimg.classList.add("imgitem")
    
            bindTaskEvent(del,"click", delItemCart)
    
            divimg.appendChild(img);
    
            container.appendChild(divimg)
            container.appendChild(nombre)
            container.appendChild(precio)
            container.appendChild(del)
            container.appendChild(cant)
    
            cartContainer.appendChild(container)
            }
        }
    
        let totalcontainer = document.createElement("div")
        let btnCarrito = document.createElement("button")
    
        btnCarrito.textContent = "Comprar";
    
        btnCarrito.classList.add("btncarrito")

        bindTaskEvent(btnCarrito,"click",comparCarrito)

        totalcontainer.classList.add("totalcarrito")
    
        for(let i = 0; i<=arrayProductos.length; i++){
            if(productosj[i])
            {
                t = t+productosj[i].precio*productosc[i]
            }
        }
    
        totalcontainer.textContent = ("Subtotal: "+t+"$")
        cartContainer.appendChild(totalcontainer)
        cartContainer.appendChild(btnCarrito)
    
}

//Quitar elemento del carrito
function delItemCart(e){
    const basura = e.target;
    const cont = basura.parentNode;
    const cant = cont.querySelector(".invisible");

    let l = arrayCarrito.length;

    for(let i = 0; i<l ;)
    {
        if(arrayCarrito[i].id == basura.id)
        {
            console.log(arrayCarrito[i].nombre+":"+arrayProductos[arrayCarrito[i].id].cantidad)
            arrayCarrito.splice(i,1);
            i=0;
            l--;
        }
        else
        i++
    }

    arrayUsuarios[idUsuario].cart = arrayCarrito;

    localStorage.setItem("Usuarios", JSON.stringify(arrayUsuarios))

    arrayProductos[basura.id].cantidad += parseInt(cant.textContent);

    actProductos();

    const a = document.createElement("a")
    a.href="carrito.html"
    a.click()
}

//Comprar
function comparCarrito()
{
    arrayUsuarios[idUsuario].cart=[]
    actUsuarios();
    window.alert("Feliciades");
    const a = document.createElement("a")
    a.href="productos.html"
    a.click()
}

//Carga de JSON productos a HTML
if (mainContainer) {
    if (localStorage.getItem("Productos") == null) {
        cargaProductos();
    }
    getProductos();
    putProductos();
}

