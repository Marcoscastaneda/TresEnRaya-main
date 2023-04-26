var boton_iniciar = document.getElementById("boton_iniciar");

boton_iniciar.addEventListener("click", prueba)

function prueba(){
    
    var inicio = document.getElementById("inicio")

    inicio.style.opacity = "0"
    setTimeout(function () {inicio.style.display = "none"}, 700);

}
