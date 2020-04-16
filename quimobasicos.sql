CREATE DATABASE quimobasicos CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE Contenido(
	idContenido VARCHAR(10),
	contenido VARCHAR(25),
	PRIMARY KEY(idContenido)
);

CREATE TABLE EtiquetaRFID(
	idEtiqueta VARCHAR(10),
	PRIMARY KEY(idEtiqueta)
);

CREATE TABLE Dueno(
	idDueno VARCHAR(10),
	nombre VARHCHAR(50)
);

CREATE TABLE Tanque(
	idTanque VARCHAR(14),
	calidad VARCHAR(15),
	estadoValcula VARCHAR(15),
	pesoActual INT,
	peso INT,
	fechaEsperadaRetorno DATE,
	idEtiqueta VARCHAR(10),
	idContenido VARCHAR(10),
	idDueno VARCHAR(10),
	PRIMARY KEY(idTanque),
	FOREIGN KEY(idEtiqueta) REFERENCES EtiquetaRFID(idEtiqueta),
	FOREIGN KEY(idContenido) REFRENCES Contenido(idContenido),
	FOREIGN KEY(idDueno) REFERENCES Dueno(idDueno)
);

CREATE TABLE Mantenimiento(
	idTanque VARCHAR(14),
	fechaMantenimiento DATE,
	observaciones VARCHAR(100),
	PRIMARY KEY(idTanque, fechaMantenimiento),
	FOREIGN KEY(idTanque) REFERENCES Tanque(idTanque)
);


