CREATE DATABASE quimobasicos CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

USE quimobasicos;

CREATE TABLE Contenido(
    idContenido VARCHAR(10) NOT NULL,
    contenido VARCHAR(25),
    PRIMARY KEY(idContenido)
);

CREATE TABLE EtiquetaRFID(
    idEtiqueta INT NOT NULL,
    PRIMARY KEY(idEtiqueta)
);

CREATE TABLE Dueno(
    idDueno VARCHAR(10) NOT NULL,
    nombre VARCHAR(50),
    PRIMARY KEY (idDueno)
);

CREATE TABLE Tanque(
    idTanque VARCHAR(10) NOT NULL,
    calidad VARCHAR(128),
    estadoValvula VARCHAR(128),
    pesoActual FLOAT,
    peso FLOAT,
    fechaEsperadaRetorno DATETIME,
    idEtiqueta INT,
    idContenido VARCHAR(10),
    idDueno VARCHAR(10),
    PRIMARY KEY(idTanque),
    FOREIGN KEY(idEtiqueta) REFERENCES EtiquetaRFID(idEtiqueta) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(idContenido) REFERENCES Contenido(idContenido) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(idDueno) REFERENCES Dueno(idDueno) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Mantenimiento(
    idTanque VARCHAR(10) NOT NULL,
    fechaMantenimiento DATETIME,
    observaciones VARCHAR(512),
    PRIMARY KEY(idTanque, fechaMantenimiento),
    FOREIGN KEY(idTanque) REFERENCES Tanque(idTanque) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Lugar (
    idLugar CHAR(10) NOT NULL,
	lnombre VARCHAR(50),
	radio FLOAT,
	capacidadMaxima SMALLINT UNSIGNED,
	coordenadas POINT,
	PRIMARY KEY (idLugar)
);

CREATE TABLE TanqueHaEstado (
    idTanque CHAR(10) NOT NULL,
	idLugar CHAR(10) NOT NULL,
	fecha DATETIME NOT NULL,
	PRIMARY KEY (idTanque, idLugar, fecha),
	FOREIGN KEY (idTanque) REFERENCES Tanque(idTanque) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (idLugar) REFERENCES Lugar(idLugar) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE HistorialPeso (
    idTanque CHAR(10) NOT NULL,
	fecha DATETIME,
	peso FLOAT,
	PRIMARY KEY (idTanque, fecha),
	FOREIGN KEY (idTanque) REFERENCES Tanque(idTanque) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Usuario (
    idUsuario CHAR(10) NOT NULL,
	fName VARCHAR(64),
	lName VARCHAR(64),
	contrasena VARCHAR(128),
	genero TINYINT UNSIGNED,
	correo VARCHAR(128),
	PRIMARY KEY (idUsuario)
);

CREATE TABLE Operador (
    operadorId CHAR(10) PRIMARY KEY REFERENCES Usuario(idUsuario) ON UPDATE CASCADE ON DELETE CASCADE,
	idSupervisor CHAR(10),
	FOREIGN KEY (idSupervisor) REFERENCES Usuario(idUsuario) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE TanqueEsta (
    idTanque CHAR(10) NOT NULL,
	idLugar CHAR(10) NOT NULL,
	fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (idTanque, idLugar),
	FOREIGN KEY (idTanque) REFERENCES Tanque(idTanque) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (idLugar) REFERENCES Lugar(idLugar) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE OperadoPor(
    idTanque CHAR(10) NOT NULL,
	idUsuario CHAR(10) NOT NULL,
	fecha DATETIME,
	PRIMARY KEY (idTanque, idUsuario),
	FOREIGN KEY (idTanque) REFERENCES Tanque(idTanque) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario) ON UPDATE CASCADE ON DELETE CASCADE
);
