
  var boton_iniciar = document.getElementById("boton_iniciar");

  boton_iniciar.addEventListener("click", prueba)

  function prueba(){
      
      var inicio = document.getElementById("inicio")


var boton_iniciar = document.getElementById("boton_iniciar");

boton_iniciar.addEventListener("click", iniciar_cambio_nombre)

function iniciar_cambio_nombre(){
    
    var inicio = document.getElementById("inicio")


      inicio.style.opacity = "0"
      setTimeout(function () {inicio.style.display = "none"}, 700);


  }
  var btnPlay = document.getElementById("startBtn");
  var btnTheme = document.getElementById("botontema");

  btnPlay.addEventListener("click", function() {
    // muestra el botón de cambio de tema
    btnTheme.style.display = "block";
  });

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
    if (keyCode === 13) {
      button.click();
    }
  };

  // EFECTO DESPLEGABLE EN TEMAS
  var botontema = document.getElementById("botontema");
  var iconthemes = document.querySelectorAll(".icotheme");
  var button_desplegado = false;

  botontema.addEventListener("click", function aparecer_iconos(){
      if(button_desplegado == false){
          for(var i=0; i<iconthemes.length; i++){
              iconthemes[i].style.display = "flex";
          }
          botontema.style.height = "30%";
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
              //alert("Han pasado 2 segundos!");
              iconthemes[i].style.display = "none";
            }, 200);
          }
          botontema.style.height = "60px";
          button_desplegado = false;
      }
  });


  //cambio de tema

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

  //stars
  const wH = window.innerHeight
  const wW = window.innerWidth

  const generateStars = n => {
    for (let i = 0; i < n; i++) {
      const div = document.createElement('div')
      div.className = i % 20 == 0 ? 'star star--big' : i % 9 == 0 ? 'star star--medium' : 'star'
      // random everywhere!
      div.setAttribute('style', `top:${Math.round(Math.random()*wH)}px;left:${Math.round(Math.random()*wW)}px;animation-duration:${Math.round(Math.random()*3000) + 3000}ms;animation-delay:${Math.round(Math.random()*3000)}ms;`)
      document.body.appendChild(div)
    }
  }

  generateStars(150)

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
