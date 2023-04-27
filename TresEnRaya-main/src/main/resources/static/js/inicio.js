var boton_iniciar = document.getElementById("boton_iniciar");

boton_iniciar.addEventListener("click", prueba)

function prueba(){
    
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

/* TECLA ENTER PARA JUGAR */

var input = document.getElementById("nickname");
var boton = document.getElementById("startBtn");

input.addEventListener("keyup", jugar)
function jugar() {
  if (event.key === 13) {
    button.click();
  }
};


