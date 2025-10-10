import './style.css'

const MotoAzul = {
  img: new Image(),
  x: 450,
  y: 301,
  ancho: 15,
  alto: 35,
  angulo: 0,
  lastMove: "arriba",
  estado: "vivo"
  
}

const MotoRoja = {
  img: new Image(),
  x: 150,
  y: 265,
  ancho: 15,
  alto: 35,
  angulo: 0,
  lastMove: "abajo",
  estado: "vivo"
  
}

const EstelaAzul = []

const EstelaRoja = []

inicialitzar();

function inicialitzar() {
  
  
  for (let i = 0; i < 20; i++) {
    console.log(MotoAzul.estado);
    tableroInicial();
    mover();
    
  }
  
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
  

  MotoAzul.img.src = "img/motoAzul.png";
  MotoAzul.img.onload = function() {
    celda.drawImage(MotoAzul.img, MotoAzul.x, MotoAzul.y, 15, 35);

  }

  MotoRoja.img.src = "img/motoRoja.png";
  MotoRoja.img.onload = function() {
    celda.drawImage(MotoRoja.img, MotoRoja.x, MotoRoja.y, 15, 35);

  }
  
}

function RehacerTableroAzul(num) {
  const canvas = document.getElementById("tablero");
    const celda = canvas.getContext('2d');
    
    celda.clearRect(0, 0, canvas.width, canvas.height);
    
    celda.fillStyle = "rgb(43, 43, 43)";
    celda.fillRect(0, 0, 600, 600)

    celda.fillStyle = 'rgba(255, 255, 255, 1)';
    celda.fillRect(3, 300, 10000, 1);

    celda.save();
    celda.translate(MotoRoja.x, MotoRoja.y);
    celda.rotate(MotoRoja.angulo);
    celda.drawImage(MotoRoja.img, -MotoRoja.ancho / 2, -MotoRoja.alto / 2, MotoRoja.ancho, MotoRoja.alto);
    celda.restore();

    celda.save();
    celda.translate(MotoAzul.x, MotoAzul.y);
    celda.rotate(MotoAzul.angulo = num * Math.PI / 180);
    celda.drawImage(MotoAzul.img,-MotoAzul.ancho / 2, -MotoAzul.alto / 2, MotoAzul.ancho, MotoAzul.alto);
    celda.restore();
}

function RehacerTableroRojo(num) {
  const canvas = document.getElementById("tablero");
    const celda = canvas.getContext('2d');
    
    celda.clearRect(0, 0, canvas.width, canvas.height);
    
    celda.fillStyle = "rgb(43, 43, 43)";
    celda.fillRect(0, 0, 600, 600)

    celda.fillStyle = 'rgba(255, 255, 255, 1)';
    celda.fillRect(3, 300, 10000, 1);

    celda.save();
    celda.translate(MotoAzul.x, MotoAzul.y);
    celda.rotate(MotoAzul.angulo);
    celda.drawImage(MotoAzul.img,-MotoAzul.ancho / 2, -MotoAzul.alto / 2, MotoAzul.ancho, MotoAzul.alto);
    celda.restore();

    celda.save();
    celda.translate(MotoRoja.x, MotoRoja.y);
    celda.rotate(MotoRoja.angulo = num * Math.PI / 180);
    celda.drawImage(MotoRoja.img,-MotoRoja.ancho / 2, -MotoRoja.alto / 2, MotoRoja.ancho, MotoRoja.alto);
    celda.restore();
}


document.addEventListener("keydown", function(event) {
  switch (event.key) {
    case "ArrowUp": 
      if (MotoAzul.lastMove !== "arriba" && MotoAzul.lastMove !== "abajo") {
        moverArribaAzul();
        MotoAzul.lastMove = "arriba";
      }

      break;

    case "ArrowDown":
      if (MotoAzul.lastMove !== "arriba" && MotoAzul.lastMove !== "abajo") {
        moverAbajoAzul();
        MotoAzul.lastMove = "abajo";
      }

      break;

    case "ArrowLeft":
      if (MotoAzul.lastMove !== "izquierda" && MotoAzul.lastMove !== "derecha") {
        moverIzquierdaAzul();
        MotoAzul.lastMove = "izquierda";
      }
      break;

    case "ArrowRight": 
      if (MotoAzul.lastMove !== "izquierda" && MotoAzul.lastMove !== "derecha") {
        moverDerechaAzul();
        MotoAzul.lastMove = "derecha";
      }
      break;

    case "w":
      if (MotoRoja.lastMove !== "arriba" && MotoRoja.lastMove !== "abajo") {
        moverArribaRojo();
        MotoRoja.lastMove = "arriba";
      }
      break;

    case "a": 
      if (MotoRoja.lastMove !== "derecha" && MotoRoja.lastMove !== "izquierda") {
        moverIzquierdaRojo();
        MotoRoja.lastMove = "izquierda";
      }
      break;

    case "s": 
      if (MotoRoja.lastMove !== "arriba" && MotoRoja.lastMove !== "abajo") {
        moverAbajoRojo();
        MotoRoja.lastMove = "abajo";
      }
      break;

    case "d":
      if (MotoRoja.lastMove !== "derecha" && MotoRoja.lastMove !== "izquierda") {
        moverDerechaRojo();
        MotoRoja.lastMove = "derecha";
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
    case "arriba": MotoRoja.y -= 10 
      break;

    case "izquierda": MotoRoja.x -= 10
      break;

    case "derecha": MotoRoja.x += 10
      break;

    case "abajo": MotoRoja.y += 10 
      break; 
  }
}

function correrAzul() {
  switch (MotoAzul.lastMove) {
    case "arriba": MotoAzul.y -= 10 
      break;

    case "izquierda": MotoAzul.x -= 10
      break;

    case "derecha": MotoAzul.x += 10
      break;

    case "abajo": MotoAzul.y += 10 
      break; 
  }
}

function moverArribaAzul() {
  RehacerTableroAzul(360);

}

function moverAbajoAzul() {
  RehacerTableroAzul(180);
}

function moverIzquierdaAzul() {
  RehacerTableroAzul(270);
}

function moverDerechaAzul() {
  RehacerTableroAzul(90);
}

function moverArribaRojo() {
  RehacerTableroRojo(180);
}

function moverAbajoRojo() {
  RehacerTableroRojo(0);
}

function moverIzquierdaRojo() {
    RehacerTableroRojo(90);

}

function moverDerechaRojo() {
  RehacerTableroRojo(270);
}