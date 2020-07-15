self.addEventListener('install', e => {
    console.log('sw install')
})

self.addEventListener('activate', e => {
    console.log('sw activate')
})

self.addEventListener('fetch', e => {
    //console.log('sw fetch')
    })



//pruebas de fetch // 

  /*  let url = e.request.url
    let method = e.request.method
    console.log(url, method)
    console.log(e.request)
    console.log("---------------------")


    let respuesta = fetch(e.request.url)

    if (url.includes('Estilos.css')) {
        //respuesta=null

        respuesta = new Response(`
    body{
        background-color: cornFlowerblue;
    }
.w-100{
    width: 100%;
}

.w-10{  
    width: 10%;
}

.w-20{
    width: 20%;
}

.w-30{
    width: 30%;
}
.ml-item{
    margin-left: 20px;
}

.contenedor{
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.page-content{
    padding: 10px;
}

img {
    width: 100%;
    border-radius: 50%;
    margin-bottom: 20px;
    
    
}

    `, {
            headers: {
                'content-type': 'text/css'
            }
        })
        e.respondWith(respuesta)
    }

    else if (url.includes('material.indigo-pink.min.css')){
        //respuesta= fetch('https://code.getmdl.io/1.3.0/material.light_green-green.min.css')
        e.respondWith(respuesta)
    }

    else if (url.includes('Super.jpg')){
        console.log('get imagen!!')
       // respuesta = fetch('images/Fontanarrosa.jpg')
       // respuesta = fetch( 'https://ih1.redbubble.net/image.740628694.8539/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u5.jpg', { mode:'no-cors'})  //solucion error de CORS
        //.catch (error => console.log('ERROR EN FETCH IMAGEN!',error))
        e.respondWith(respuesta)
    }

    else if ( url.includes('script.js')){
        //respuesta = fetch(url)
        e.respondWith(respuesta)
    }


    else {
        //respuesta = fetch(url)
       // e.respondWith(respuesta)
    }

})
*/
