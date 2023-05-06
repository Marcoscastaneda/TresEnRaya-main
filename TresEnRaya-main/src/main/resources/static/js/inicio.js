
var boton_iniciar = document.getElementById("boton_iniciar");

boton_iniciar.addEventListener("click", iniciar_cambio_nombre)

function iniciar_cambio_nombre(){
    
    var inicio = document.getElementById("inicio")

    inicio.style.opacity = "0"
    setTimeout(function () {inicio.style.display = "none"}, 700);

}

/* AÑADIMOS LA MUSICA */

var v = document.getElementsByTagName("audio")[0];
var sound = false;

var boton = document.getElementById("botonaudio");
boton.addEventListener("click", function(){
   if (!sound) {
       v.play();
       document.getElementById("imgsonido").setAttribute('src', 'img/sonido_on.png');
       sound = true;
   } else {
       v.pause();
       document.getElementById("imgsonido").setAttribute('src', 'img/sonido_off.png');
       sound = false;
   }
});







