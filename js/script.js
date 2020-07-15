//-------------------------------------------//
//-------------JQUERY JAVASCRIPT ------------//
//-------------------------------------------//
let listaProductos =
    [
        
       /*  { Nombre: 'Pan', cantidad: 2, precio: 12.34 },
        { Nombre: 'carne', cantidad: 1, precio: 25.5 },
        { Nombre: 'leche', cantidad: 3, precio: 58.78 },
        { Nombre: 'fideos', cantidad: 4, precio: 65.12 } */
        
    ]
    //-------------------------------------------//
    //         FUNCIONES GLOBALES----------------//
    //-------------------------------------------//

    function guardarListaProductosLocal(lista){
        let prod = JSON.stringify(lista)
        localStorage.setItem('LISTA', prod)
    }

    function leerListaProductosLocal(lista){
        if (localStorage.getItem('LISTA')){
            lista = JSON.parse(localStorage.getItem('LISTA'))
        }

        return lista

    }
    
    function getURL (){
        return 'https://5f0e4752704cdf0016eaeec7.mockapi.io/lista/'
    }
    //-------------------------------------------//
    //---------------API REST--------------------//
    //-------------------------------------------//



    /*----------------*/
    /*      GET       */
    /*----------------*/
    function getProdWeb(cb){
        let url = getURL()+'?'+Date.now()  /* Esta es una tecnica para evitar problemas de cache, ya que al inyectar el date.now en el url obliga a resfrescar la pagina*/
        

        $.ajax({url, method:'get'})
        .then(cb)
        .catch(error => {
            console.log(error)
            listaProductos=leerListaProductosLocal(listaProductos)
            cb(listaProductos)
        })

    }

    /*--------------------*/
    /*      DELETE        */
    /*--------------------*/
    function deleteProdWeb(id,cb){
        let url = getURL()+id
        

        $.ajax({url, method:'delete'})
        .then(cb)
        .catch(error => {
            console.log(error)
            cb('error')
        })

    }

    /*---------------------*/
    /*      UPDATE-        */
    /*--------------------*/
    function upgradeProdWeb(id, prod, cb){
        let url = getURL()+id
        

        $.ajax({url, data: prod, method:'put'})
        .then(cb)
        .catch(error => {
            console.log(error)
            cb('error')
        })

    }

    
    /*---------------------*/
    /*      POST-   -     */
    /*--------------------*/
    function postProdWeb(prod, cb){
        let url = getURL()
        

        $.ajax({url, data: prod, method:'post'})
        .then(cb)
        .catch(error => {
            console.log(error)
            cb('error')
        })

    }
    

function borrarProd(id) {
    console.log(id)

    deleteProdWeb(id, prod=>{
        
        //listaProductos.splice(index, 1)
        renderlista()
        console.log('delete',prod)
    })
}



function cambiarCantidad(id, e) {
    let cantidad = Number(e.value)
    let index = listaProductos.findIndex(prod => prod.id == id)
    console.log('cambiarCantidad', id, index, cantidad)


    listaProductos[index].cantidad = cantidad
    let prod = listaProductos[index]

     /*guardamos los productos en el Local Storage*/
     guardarListaProductosLocal(listaProductos)

    upgradeProdWeb(id, prod, prod =>{
        console.log('upgrade cantidad', prod )
    })

}

function cambiarPrecio(id, e) {
    let precio = Number(e.value)
    let index = listaProductos.findIndex(prod => prod.id == id)
    console.log('cambiar precio',id ,index, precio)

    listaProductos[index]['precio'] = precio

    let prod = listaProductos[index]

     /*guardamos los productos en el Local Storage*/
     guardarListaProductosLocal(listaProductos)

    upgradeProdWeb(id, prod, prod =>{
        console.log('upgrade precio', prod )
    })

}
function configurarListeners(){
    $('#btn-entrada-producto').click( ()=> {
        let input= $('#ingreso-producto')
        let producto = input.val()
        if(producto != '') {
            
            //listaProductos.push({
            let prod = {
                Nombre: producto,
                cantidad: 1,
                precio: 0
            }

            postProdWeb(prod, prod =>{
                console.log ( 'post', prod )

                renderlista()
    
                input.val('')
            })
            
        }
    })
    $('#btn-borrar-productos').click( ()=>{
    

        //listaProductos = []
        deleteAllProdWeb( info => {
        console.log(info)
        renderlista()
        })

    })

}


async function deleteAllProdWeb(cb){
    for(let i=0; i<listaProductos.length; i++){
      
      let porcentaje = parseInt((i*100) / listaProductos.length)
      console.log(porcentaje+ '%')

      try{

          let url = getURL() + listaProductos[i].id
          let p = await $.ajax({url, method:'delete'})
         //console.log('producto borrado', p)
         }
         catch(error){
          let err = {
              info: 'error',
              error
          }
          cb(err)
        }
        
    }
    cb('ok')

}


function renderlista() {
   
    $.ajax({url: 'plantilla-lista.hbs', method: 'get'})
     .then(source => {
        const templete = Handlebars.compile(source)
        /*Pido los datos a MocApi.io*/
        getProdWeb(prods =>{
            listaProductos = prods
            /*guardamos los productos en el Local Storage*/
            guardarListaProductosLocal(listaProductos)
            
                    let data = {listaProductos} //idem a {listaProductos : listaProductos}
                     $('#lista').html(templete(data))
                     
                     
                     let ul=$('#contenedor-lista')
                     componentHandler.upgradeElements(ul)
        })


     })
     .catch(error => console.log('Error en renderlista:', error ))
    
///////////////otro metodo de jquery//////////////////
   
    /* 
    $.get('plantilla-lista.hbs', source => {
        const templete = Handlebars.compile(source)
            let data = {listaProductos} //idem a {listaProductos : listaProductos}
             $('#lista').html(templete(data))
             
             
             let ul=$('#contenedor-lista')
             componentHandler.upgradeElements(ul)
    }) */
/////////////////////////////////////////////////////
    
}


function registrarServiceWorker() {
    if('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            this.navigator.serviceWorker.register('./sw.js').then(function(reg){
                //console.log("el serviceWorker se registro correctamente ", reg)
            })
            .catch (function (err) {
                console.warn('error al registrar ServiceWorker', err)
                
            })
        })
    }
}



function start(){
    registrarServiceWorker()
    renderlista()
    configurarListeners()
}


//-------------------------------------------//
//            EJECUTABLE                     //
//-------------------------------------------//
//start()
window.onload = start
//$(document). ready(start)



///////////////////////////////////////////////
//-------------------------------------------//
//            VANILLA JAVASCRIPT             //
//-------------------------------------------//
///////////////////////////////////////////////
/* 
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
/* function renderlista() {

   fetch('plantilla-lista.hbs')
   .then(respuesta => respuesta.text())
   .then(source => {

        const templete = Handlebars.compile(source)
        let data = {listaProductos} //idem a {listaProductos : listaProductos}
        $('#lista').html(templete(data))
        

        let ul=$('#contenedor-lista')
        componentHandler.upgradeElements(ul)


   })
   .catch(error => console.log('Error en renderlista:', error ))
    */
/*
function renderlista() {
    
    let xhr = new XMLHttpRequest
    xhr.open('get', 'plantilla-lista.hbs')
    xhr.send()
    
    xhr.addEventListener('load', () => {
        if (xhr.status == 200) {
            let source = xhr.response

            const templete = Handlebars.compile(source)
            let data = {listaProductos} //idem a {listaProductos : listaProductos}
            let lista = document.getElementById('lista')
            lista.innerHTML = templete(data)
        
            let ul= document.getElementById('contenedor-lista')
            componentHandler.upgradeElements(ul)
        }
    })
    
    

    }


function registrarServiceWorker() {
    if('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            this.navigator.serviceWorker.register('./sw.js').then(function(reg){
                //console.log("el serviceWorker se registro correctamente ", reg)
            })
            .catch (function (err) {
                console.warn('error al registrar ServiceWorker', err)
                
            })
        })
    }
}



function start(){
    registrarServiceWorker()
    renderlista()
    configurarListeners()
}


//-------------------------------------------//
//            EJECUTABLE                     //
//-------------------------------------------//
 //start()
// window.onload = start
 window.addEventListener('DOMContentLoaded', start) */