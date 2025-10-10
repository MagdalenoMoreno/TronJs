import './style.css'

const EstelaAzul = []

const EstelaRoja = []

const MotoAzul = {
  img: new Image(),
  x: 450,
  y: 318,
  ancho: 15,
  alto: 35,
  angulo: 0,
  lastMove: "arriba",
  estado: "vivo",
  estela: EstelaAzul,
  velocidad: 2
  
}

const MotoRoja = {
  img: new Image(),
  x: 150,
  y: 282,
  ancho: 15,
  alto: 35,
  angulo: 0,
  lastMove: "abajo",
  estado: "vivo",
  estela: EstelaRoja,
  velocidad: 2
}


inicialitzar();

function inicialitzar() {
    tableroInicial();
    setInterval(RehacerTablero, 1000 / 360);
    
}


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
  celda.fillRect(3, 300, 10000, 1);
  
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

function RehacerTablero() {
  const canvas = document.getElementById("tablero");
    const celda = canvas.getContext('2d');
    
    celda.clearRect(0, 0, canvas.width, canvas.height);
    
    celda.fillStyle = "rgb(43, 43, 43)";
    celda.fillRect(0, 0, 600, 600)

    celda.fillStyle = 'rgba(255, 255, 255, 1)';
    celda.fillRect(3, 300, 10000, 1);

    mover();

    if (MotoAzul.estado !== "vivo" || MotoRoja.estado !== "vivo") {
      console.log("Game Over");
    } else {

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
    }
}

document.addEventListener("keydown", function(event) {
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

    default:
      break;
  }
})

function mover() {
    correrAzul();
    correrRojo();
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