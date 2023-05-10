// Boton de inicio de partida
var boton_iniciar = document.getElementById("boton_iniciar");

boton_iniciar.addEventListener("click", iniciar_cambio_nombre)
function iniciar_cambio_nombre(){
    var inicio = document.getElementById("inicio")
    inicio.style.opacity = "0"
    setTimeout(function () {inicio.style.display = "none"}, 700);
}
// Variables utiles
var btnPlay = document.getElementById("startBtn");
var btnTheme = document.getElementById("botontema");
var v = document.getElementsByTagName("audio")[0];
var sound = false;
var boton = document.getElementById("botonaudio");
/* AÑADIMOS LA MUSICA */

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
// Variables utiles
var botonemojis = document.getElementById("boton_emojis");
var panel_emojis = document.getElementById("panel_emojis");
var contenedor_emojis = document.getElementById("contenedor_emojis");
var div_desplegable = false;
/* DESPLEGABLE EMOJIS */

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
// Variables utiles

var botontema = document.getElementById("botontema");
var iconthemes = document.querySelectorAll(".icotheme");
var button_desplegado = false;
/* EFECTO DESPLEGABLE EN TEMAS */

botontema.addEventListener("click", function aparecer_iconos(){
    if(button_desplegado == false){
        for(var i=0; i<iconthemes.length; i++){
            iconthemes[i].style.display = "flex";
        }
        botontema.style.height = "250px";
        botontema.style.boxShadow = " 0 0 20px 1px rgb(117,199,251)";
        button_desplegado = true;
        var i = 0;
        var intervalId = setInterval(function () {
          iconthemes[i].style.opacity = "1";
          i++;
          if (i >= iconthemes.length) {
            clearInterval(intervalId);
          }
        }, 700 / iconthemes.length);    
    }else{
        for(var i=0; i<iconthemes.length; i++){
          iconthemes[i].style.opacity = "0";
          setTimeout(function() {
            iconthemes[i].style.display = "none";
          }, 200);
        }
        botontema.style.height = "60px";
        button_desplegado = false;
    }
});

/* Cambio de temas en la página dependiendo de la selección  */

var tema = document.getElementById('tema')
var botonEstilo0 = document.getElementById('botonEstilo0')
botonEstilo0.addEventListener("click", function(){
  if (button_desplegado == true){
    tema.setAttribute('href', 'css/style.css');
  }
})

var botonEstilo1 = document.getElementById('botonEstilo1')
botonEstilo1.addEventListener("click", function(){
  tema.setAttribute('href', 'css/tema1.css');
})

var botonEstilo2 = document.getElementById('botonEstilo2')
botonEstilo2.addEventListener("click", function(){
  tema.setAttribute('href', 'css/tema2.css');
})

var botonEstilo3 = document.getElementById('botonEstilo3')
botonEstilo3.addEventListener("click", function(){
  tema.setAttribute('href', 'css/tema3.css');
})

/* Efectos relacionado con las estrellas en el tema del espacio */
const wH = window.innerHeight
const wW = window.innerWidth
const generateStars = n => {
  for (let i = 0; i < n; i++) {
    const div = document.createElement('div')
    div.className = i % 20 == 0 ? 'star star--big' : i % 9 == 0 ? 'star star--medium' : 'star'
    div.setAttribute('style', `top:${Math.round(Math.random()*wH)}px;left:${Math.round(Math.random()*wW)}px;animation-duration:${Math.round(Math.random()*3000) + 3000}ms;animation-delay:${Math.round(Math.random()*3000)}ms;`)
    document.body.appendChild(div)
  }
}
//Numero de estrellas generadas
generateStars(150)