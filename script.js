let listaProductos =
    [
        //--------------------------------------------//
        //              VARIABLES GLOBALES
        //-------------------------------------------//
        { Nombre: 'Pan', cantidad: 2, precio: 12.34 },
        { Nombre: 'carne', cantidad: 1, precio: 25.5 },
        { Nombre: 'leche', cantidad: 3, precio: 58.78 },
        { Nombre: 'fideos', cantidad: 4, precio: 65.12 }

    ]
let crearLista = true
let ul
//-------------------------------------------//
//         FUNCIONES GLOBALES----------------//
//-------------------------------------------//
function borrarProd(index) {
    console.log(index)
    listaProductos.splice(index, 1)
    renderlista()
}
function cambiarCantidad(index, e) {
    let cantidad = Number(e.value)
    listaProductos[index].cantidad = cantidad

}

function cambiarPrecio(index, e) {
    let precio = Number(e.value)
    listaProductos[index].precio = precio

}
function configurarListeners(){
    document.getElementById('btn-entrada-producto').addEventListener('click',()=> {
        let input=document.getElementById('ingreso-producto')
        let producto = input.value
        if(producto != '') {
            
            listaProductos.push({
                Nombre: producto,
                cantidad: 1,
                precio: 0
            })
            
            renderlista()
            input.value=''
        }
    })
    document.getElementById('btn-borrar-productos').addEventListener('click', ()=>{
    

        listaProductos = []
        renderlista()

    })

}

function renderlista() {
    if (crearLista) {
        ul = document.createElement('ul')
        ul.classList.add('demo-list-icon', 'mdl-list', 'w-100')
    }
    ul.innerHTML = ''

    listaProductos.forEach((prod, index) => {
        ul.innerHTML +=
            `<li class="mdl-list__item">
        <span class="mdl-list__item-primary-content w-10">
            <i class="material-icons">shopping_cart</i>

        </span>
        <span class="mdl-list__item-primary-content w-30">

             ${prod.Nombre}
    </span>
        <span class="mdl-list__item-primary-content w-20">

            <div class="mdl-textfield mdl-js-textfield">
                <input onchange="cambiarCantidad(${index}, this)" class="mdl-textfield__input" type="text" id="sample-cantidad-${index}">
                    <label class="mdl-textfield__label" for="${index}">${prod.cantidad}</label>
        </div>
    </span>
            <span class="mdl-list__item-primary-content w-20 ml-item">

                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input onchange="cambiarPrecio(${index}, this)" class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?"
                        id="${index}">
                        <label class="mdl-textfield__label" for="${index}">${prod.precio}</label>
                        <span class="mdl-textfield__error">Input is not a number!</span>
        </div>
    </span>
                <span class="mdl-list__item-primary-content ml-item">

                    <button onclick="borrarProd(${index})"
                        class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                        <i class="material-icons">remove_shopping_cart</i>
                    </button>
                </span>
</li>`

    })
    // <ul class="demo-list-icon mdl-list w-100">

    if (crearLista) {
        document.getElementById('lista').appendChild(ul)
    }

    else {
        componentHandler.upgradeElements(ul)


    }


    crearLista = false
}
function start(){
    renderlista()
    configurarListeners()
}


//-------------------------------------------//
//            EJECUTABLE                     //
//-------------------------------------------//
 //start()
// window.onload = start
 window.addEventListener('DOMContentLoaded', start)