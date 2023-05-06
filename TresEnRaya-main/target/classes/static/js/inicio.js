
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

/* DESPLEGABLE EMOJIS */

var botonemojis = document.getElementById("boton_emojis");
var panel_emojis = document.getElementById("panel_emojis");
var contenedor_emojis = document.getElementById("contenedor_emojis");
var div_desplegable = false;

contenedor_emojis.addEventListener("click", function(event) {
  if (event.target !== botonemojis && event.target.parentNode !== botonemojis) {
    
    panel_emojis.style.opacity = "0";
    setTimeout(function() {
      panel_emojis.style.display = "none";
    }, 300);
    div_desplegable = false;
  } else {
    
    if (div_desplegable == false) {
      panel_emojis.style.display = "inline-block";
      setTimeout(function() {
        panel_emojis.style.opacity = "1";
      }, 50);
      div_desplegable = true;
    } else {
      panel_emojis.style.opacity = "0";
      setTimeout(function() {
        panel_emojis.style.display = "none";
      }, 300);
      div_desplegable = false;
    }
  }
});

panel_emojis.addEventListener("click", function(event) {

    event.stopPropagation();
});
