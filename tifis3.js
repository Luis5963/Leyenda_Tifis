var tablero, direccion, tifisDibujo;
var n = 0;

var fondo = {
	imagenURL: "fondo.png",
	imagenOK: false
};

var tifis = {
	imagenURL: ["diana-frente.png", "diana-atras.png", "diana-der.png", "diana-izq.png"],
	imagenOK: [false, false, false, false],
	x: 100,
	y: 100,
	velocidad: 10,
	mover: [false, false, false, false]
};

var liz = {
	imagenURL: "liz.png",
	imagenOK: false,
	x: aleatorio(0,9),
	y: aleatorio(0,9)
};

var teclas = {
	movimiento: [38, 40, 39, 37]
};


function inicio()
{
	var canvas = document.getElementById("campo");
	tablero = canvas.getContext("2d");

	fondo.imagen = new Image();
	fondo.imagen.src = fondo.imagenURL;
	fondo.imagen.onload = confirmarFondo;

	tifis.frente = new Image();
	tifis.frente.src = tifis.imagenURL[0];
	tifis.frente.onload = confirmarFrente;

	tifis.atras = new Image();
	tifis.atras.src = tifis.imagenURL[1];
	tifis.atras.onload = confirmarAtras;

	tifis.der = new Image();
	tifis.der.src = tifis.imagenURL[2];
	tifis.der.onload = confirmarDerecha;

	tifis.izq = new Image();
	tifis.izq.src = tifis.imagenURL[3];
	tifis.izq.onload = confirmarIzquierda;

	liz.imagen = new Image();
	liz.imagen.src = liz.imagenURL;
	liz.imagen.onload = confirmarLiz;

	document.addEventListener("keydown", mover);
}

function mover(datos)
{
	var codigo = datos.keyCode;
	direccion = codigo;
	confirmarMover();

	if(codigo==teclas.movimiento[0] && tifis.y > 0)
	{
			if(tifisDibujo==tifis.atras && tifis.mover[0])
				tifis.y -= tifis.velocidad;
			dibujar();
	}


	if(codigo==teclas.movimiento[1] && tifis.y < 450)
	{
		if(tifisDibujo==tifis.frente && tifis.mover[1])
			tifis.y += tifis.velocidad;
		dibujar();
	}

	if(codigo==teclas.movimiento[2] && tifis.x < 450)
	{
		if(tifisDibujo==tifis.der && tifis.mover[2])
			tifis.x += tifis.velocidad;
		dibujar();
	}

	if(codigo==teclas.movimiento[3] && tifis.x > 0)
	{
		if(tifisDibujo==tifis.izq && tifis.mover[3])
			tifis.x -= tifis.velocidad;
		dibujar();
	}
}

function confirmarFondo()
{
	fondo.imagenOK = true;
	dibujar();
}

function confirmarFrente()
{
	tifis.imagenOK[0] = true;
	dibujar();
}

function confirmarAtras()
{
	tifis.imagenOK[1] = true;
	dibujar();
}

function confirmarDerecha()
{
	tifis.imagenOK[2] = true;
	dibujar();
}

function confirmarIzquierda()
{
	tifis.imagenOK[3] = true;
	dibujar();
}

function confirmarMover()
{
	if(tifis.x>160 && tifis.x<240 && tifis.y==220)
		tifis.mover[0] = false;
	else if(tifis.x<140 && tifis.y==220)
		tifis.mover[0] = false;
	else if(tifis.x>110 && tifis.y==370)
		tifis.mover[0] = false;
	else
		tifis.mover[0] = true;

	if(tifis.x<140 && tifis.y==150)
		tifis.mover[1] = false;
	else if(tifis.x>110 && tifis.y==300)
		tifis.mover[1] = false;
	else
		tifis.mover[1] = true;

	if(tifis.y>300 && tifis.y<370 && tifis.x==110)
			tifis.mover[2] = false;
		else if(tifis.y<220 && tifis.x==160)
			tifis.mover[2] = false;
		else 
			tifis.mover[2] = true;	

	if(tifis.y>150 && tifis.y<220 && tifis.x==130)
			tifis.mover[3] = false;
		else if(tifis.y<220 && tifis.x==240)
			tifis.mover[3] = false;
		else 
			tifis.mover[3] = true;	
}

function confirmarLiz()
{
	liz.imagenOK = true;
	dibujar();
}

function dibujar()
{
	if(fondo.imagenOK)
	{
		tablero.drawImage(fondo.imagen, 0, 0)
	}

	if(liz.imagenOK)
	{
		tablero.drawImage(liz.imagen, liz.x, liz.y);
	}

	if(tifis.imagenOK[0] && tifis.imagenOK[1] && tifis.imagenOK[2] && tifis.imagenOK[3])
	{
		tifisDibujo = tifis.frente;		
		if(direccion==teclas.movimiento[0])
		{
			tifisDibujo = tifis.atras;
		}
		if(direccion==teclas.movimiento[1])
		{
			tifisDibujo = tifis.frente;
		}
		if(direccion==teclas.movimiento[2])
		{
			tifisDibujo = tifis.der;
		}
		if(direccion==teclas.movimiento[3])
		{
			tifisDibujo = tifis.izq;
		}

		tablero.drawImage(tifisDibujo, tifis.x, tifis.y);
	}

	ganar();
}

function aleatorio(minimo, maximo)
{
	var numero = (Math.floor(Math.random()*(maximo-minimo+1)+minimo))*50;
	return numero;
}

function ganar()
{
	if(liz.x == tifis.x - 50 && liz.y==tifis.x || liz.x == tifis.x + 50 && liz.y==tifis.y || liz.y == tifis.y - 50 && liz.x==tifis.x || liz.y == tifis.y - 50 && liz.x==tifis.x)
	{
		n = n+1;
		if(n==3)
			alert("Ganaste!!!");
		liz.x = aleatorio(0,9);
		liz.y = aleatorio(0,9);
		dibujar();
	}
}
