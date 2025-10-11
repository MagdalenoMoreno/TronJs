import './style.css'

const MotoAzul = {
  img: new Image(),
  x: 450,
  y: 319,
  ancho: 15,
  alto: 35,
  angulo: 0,
  lastMove: "arriba",
  estado: "vivo",
  estela: [],
  longitudEstela: 600,
  velocidad: 2,
  hitbox: []
  
}


const MotoRoja = {
  img: new Image(),
  x: 150,
  y: 281,
  ancho: 15,
  alto: 35,
  angulo: 0,
  lastMove: "abajo",
  estado: "vivo",
  estela: [],
  longitudEstela: 600,
  velocidad: 2,
  hitbox: []
}

let intervaloJuego;
let inicioPartida = false;

inicialitzar();


function inicialitzar() {
  tableroInicial();
    setTimeout(() => {
      inicioPartida = true;
      intervaloJuego = setInterval(RehacerTablero, 1000 / 300);

    }, 3000);
    
}


//Crea el tablero por primera vez

function tableroInicial() {
  const canvas = document.getElementById("tablero");
  const celda = canvas.getContext('2d');

  for (let i = 0; i < 600; i++) {
    for (let j = 0; j < 600; j++) {
      celda.fillStyle = 'rgb(43, 43, 43)';
      celda.fillRect(i, j, 1, 1);
    }
  }
  
  celda.fillStyle = 'rgba(255, 255, 255, 1)';
  celda.fillRect(0, 300, 1000, 1);
  
  let cargadas = 0;
  function imagenCargada() {
    cargadas++;
    if (cargadas === 2) {
      RehacerTablero();
    }
  }

  MotoAzul.img.onload = imagenCargada;
  MotoRoja.img.onload = imagenCargada;

  MotoAzul.img.src = "img/motoAzul.png";
  MotoRoja.img.src = "img/motoRoja.png";
  
}


//Función que redibuja el Canvas entero con las motos y todo

function RehacerTablero() {
  const canvas = document.getElementById("tablero");
    const celda = canvas.getContext('2d');
    
    //Redibujar canvas entero

    celda.clearRect(0, 0, canvas.width, canvas.height);
    
    celda.fillStyle = "rgb(43, 43, 43)";
    celda.fillRect(0, 0, 600, 600)

    celda.fillStyle = 'rgba(255, 255, 255, 1)';
    celda.fillRect(3, 300, 10000, 1);

    mover();

    if (MotoAzul.estado !== "vivo" || MotoRoja.estado !== "vivo") {
      console.log("Game Over");
      clearInterval(intervaloJuego);
      ganador();
    } else {

      //Teletransporte de la moto azul

      if (MotoAzul.x + MotoAzul.ancho / 2 < 0) {
        MotoAzul.x = 600 + MotoAzul.ancho / 2;
      } 
      if (MotoAzul.x - MotoAzul.ancho / 2 > 600) {
        MotoAzul.x = -MotoAzul.ancho / 2;
      } 
      if (MotoAzul.y + MotoAzul.alto / 2 < 0) {
        MotoAzul.y = 600 + MotoAzul.alto / 2;
      } 
      if (MotoAzul.y - MotoAzul.alto / 2 > 600) {
        MotoAzul.y = -MotoAzul.alto / 2;
      } 


      //Teletransporte de la moto roja

      if (MotoRoja.x + MotoAzul.ancho / 2 < 0) {
        MotoRoja.x = 592 + MotoRoja.ancho / 2;
      }
      if (MotoRoja.x > 600) {
        MotoRoja.x = -MotoRoja.ancho / 2;
      }
      if (MotoRoja.y + MotoRoja.alto / 2 < 0) {
        MotoRoja.y = 600 + MotoRoja.alto / 2;
      }
      if (MotoRoja.y - MotoRoja.alto / 2 > 600) {
        MotoRoja.y = -MotoRoja.alto / 2;
      }


      //Dibujar motos en posición y ángulos correctos

      celda.save();
      celda.translate(MotoRoja.x, MotoRoja.y);
      celda.rotate(MotoRoja.angulo);
      celda.drawImage(MotoRoja.img, -MotoRoja.ancho / 2, -MotoRoja.alto / 2, MotoRoja.ancho, MotoRoja.alto);
      celda.restore();
      
      celda.save();
      celda.translate(MotoAzul.x, MotoAzul.y);
      celda.rotate(MotoAzul.angulo);
      celda.drawImage(MotoAzul.img,-MotoAzul.ancho / 2, -MotoAzul.alto / 2, MotoAzul.ancho, MotoAzul.alto);
      celda.restore();


      //Pintar estela de las motos

      for (let i = 0; i < MotoAzul.estela.length; i++) {
        celda.fillStyle = 'rgba(0, 77, 128, 1)';
        let pos = MotoAzul.estela[i];
        celda.fillRect(pos[0] - 3, pos[1], 5, 4);

        celda.fillStyle = 'rgba(124, 0, 0, 1)';
        pos = MotoRoja.estela[i];
        celda.fillRect(pos[0] - 2, pos[1], 5, 4);
      }


      chocar();

    }

}


//Función de escucha de las teclas 

document.addEventListener("keydown", function(event) {

  if (!inicioPartida) {
    return;
  }

  switch (event.key) {
    case "ArrowUp": 
      if (MotoAzul.lastMove !== "arriba" && MotoAzul.lastMove !== "abajo") {
        MotoAzul.lastMove = "arriba";
        MotoAzul.y -= MotoAzul.velocidad;
        MotoAzul.angulo = 0;
        RehacerTablero();
      }

      break;

    case "ArrowDown":
      if (MotoAzul.lastMove !== "arriba" && MotoAzul.lastMove !== "abajo") {
        MotoAzul.lastMove = "abajo";
        MotoAzul.y += MotoAzul.velocidad;
        MotoAzul.angulo = Math.PI;
        RehacerTablero();
      }

      break;

    case "ArrowLeft":
      if (MotoAzul.lastMove !== "izquierda" && MotoAzul.lastMove !== "derecha") {
        MotoAzul.lastMove = "izquierda";
        MotoAzul.x -= MotoAzul.velocidad;
        MotoAzul.angulo = 270 * Math.PI / 180;
        RehacerTablero();
      }
      break;

    case "ArrowRight": 
      if (MotoAzul.lastMove !== "izquierda" && MotoAzul.lastMove !== "derecha") {
        MotoAzul.lastMove = "derecha";
        MotoAzul.x += MotoAzul.velocidad;
        MotoAzul.angulo = 90 * Math.PI / 180;
        RehacerTablero();
      }
      break;

    case "w":
      if (MotoRoja.lastMove !== "arriba" && MotoRoja.lastMove !== "abajo") {
        MotoRoja.lastMove = "arriba";
        MotoRoja.y -= MotoRoja.velocidad;
        MotoRoja.angulo = Math.PI;
        RehacerTablero();
      }
      break;

    case "s": 
      if (MotoRoja.lastMove !== "arriba" && MotoRoja.lastMove !== "abajo") {
        MotoRoja.lastMove = "abajo";
        MotoRoja.y += MotoRoja.velocidad;
        MotoRoja.angulo = 0;
        RehacerTablero();
      }
      break;

    case "a": 
      if (MotoRoja.lastMove !== "derecha" && MotoRoja.lastMove !== "izquierda") {
        MotoRoja.lastMove = "izquierda";
        MotoRoja.x -= MotoRoja.velocidad;
        MotoRoja.angulo = 90 * Math.PI / 180;
        RehacerTablero();
      }
      break;


    case "d":
      if (MotoRoja.lastMove !== "derecha" && MotoRoja.lastMove !== "izquierda") {
        MotoRoja.lastMove = "derecha";
        MotoRoja.x += MotoRoja.velocidad;
        MotoRoja.angulo = 270 * Math.PI / 180;
        RehacerTablero();
      }
      break;
  }
})


//Cambia la posición 

function mover() {
  correrAzul();
  correrRojo();
  guardarEstela();
}

function correrRojo() {
  switch (MotoRoja.lastMove) {
    case "arriba": MotoRoja.y -= MotoRoja.velocidad;
      break;

    case "izquierda": MotoRoja.x -= MotoRoja.velocidad;
      break;

    case "derecha": MotoRoja.x += MotoRoja.velocidad;
      break;

    case "abajo": MotoRoja.y += MotoRoja.velocidad;
      break; 
  }
}

function correrAzul() {
  switch (MotoAzul.lastMove) {
    case "arriba": MotoAzul.y -= MotoAzul.velocidad;
      break;

    case "izquierda": MotoAzul.x -= MotoAzul.velocidad;
      break;

    case "derecha": MotoAzul.x += MotoAzul.velocidad;
      break;

    case "abajo": MotoAzul.y += MotoAzul.velocidad;
      break; 
  }
}


//Guarda una matriz del paso de las motos para definir la estela

function guardarEstela() {
  MotoAzul.estela.push([MotoAzul.x, MotoAzul.y]);

  if (MotoAzul.estela.length >= MotoAzul.longitudEstela) {
    MotoAzul.estela.shift();
  }

  MotoRoja.estela.push([MotoRoja.x, MotoRoja.y]);

  if (MotoRoja.estela.length >= MotoRoja.longitudEstela) {
    MotoRoja.estela.shift();
  }

}


//Define las hitbox y quien gana al chocar

function chocar() {
  switch (MotoAzul.lastMove) {
    case "arriba": MotoAzul.hitbox = [MotoAzul.x, MotoAzul.y - 17];
      break;

    case "izquierda": MotoAzul.hitbox = [MotoAzul.x - 17, MotoAzul.y];
      break;

    case "derecha": MotoAzul.hitbox = [MotoAzul.x + 17, MotoAzul.y];
      break;

    case "abajo": MotoAzul.hitbox = [MotoAzul.x, MotoAzul.y + 17];
      break; 
  }

  switch (MotoRoja.lastMove) {
    case "arriba": MotoRoja.hitbox = [MotoRoja.x, MotoRoja.y - 17];
      break;

    case "izquierda": MotoRoja.hitbox = [MotoRoja.x - 17, MotoRoja.y];
      break;

    case "derecha": MotoRoja.hitbox = [MotoRoja.x + 17, MotoRoja.y];
      break;

    case "abajo": MotoRoja.hitbox = [MotoRoja.x, MotoRoja.y + 17];
      break; 

  }

    for (let i = 0; i < MotoRoja.estela.length; i++) {
      if (Math.abs(MotoRoja.estela[i][0] - MotoAzul.hitbox[0]) < 3 && Math.abs(MotoRoja.estela[i][1] - MotoAzul.hitbox[1]) < 3) {
        MotoAzul.estado = "muerto";
      } if (Math.abs(MotoAzul.estela[i][0] - MotoAzul.hitbox[0]) < 3 && Math.abs(MotoAzul.estela[i][1] - MotoAzul.hitbox[1]) < 3) {
        MotoAzul.estado = "muerto";
      } if (Math.abs(MotoRoja.estela[i][0] - MotoRoja.hitbox[0]) < 3 && Math.abs(MotoRoja.estela[i][1] - MotoRoja.hitbox[1]) < 3) {
        MotoRoja.estado = "muerto";
      } if (Math.abs(MotoAzul.estela[i][0] - MotoRoja.hitbox[0]) < 3 && Math.abs(MotoAzul.estela[i][1] - MotoRoja.hitbox[1]) < 3) {
        MotoRoja.estado = "muerto";
      } if (Math.abs(MotoAzul.hitbox[0] - MotoRoja.hitbox[0]) < 3 && Math.abs(MotoAzul.hitbox[1] - MotoRoja.hitbox[1]) < 3) {
        MotoRoja.estado = "muerto";
        MotoAzul.estado = "muerto";
      }
    }
}

function ganador() {
  if (MotoAzul.estado === "vivo") {
    console.log("Ha ganado la moto azul");
  } else if (MotoRoja.estado === "vivo") {
    console.log("Ha ganado la moto roja");
  } else {
    console.log("Empate!!!")
  }
}