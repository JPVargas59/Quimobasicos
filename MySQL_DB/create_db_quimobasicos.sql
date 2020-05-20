CREATE DATABASE quimobasicos CHARACTER SET utf8mb4;

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
    idEtiqueta INT UNIQUE,
    idContenido VARCHAR(10),
    idDueno VARCHAR(10),
    fechaIngreso DATETIME,
    observaciones VARCHAR(250),
    PRIMARY KEY(idTanque),
    FOREIGN KEY(idEtiqueta) REFERENCES EtiquetaRFID(idEtiqueta) ON UPDATE CASCADE,
    FOREIGN KEY(idContenido) REFERENCES Contenido(idContenido) ON UPDATE CASCADE,
    FOREIGN KEY(idDueno) REFERENCES Dueno(idDueno) ON UPDATE CASCADE
);

CREATE TABLE Mantenimiento(
    idTanque VARCHAR(10) NOT NULL,
    fechaMantenimiento DATETIME,
    observaciones VARCHAR(512),
    PRIMARY KEY(idTanque, fechaMantenimiento),
    FOREIGN KEY(idTanque) REFERENCES Tanque(idTanque) ON UPDATE CASCADE
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
	FOREIGN KEY (idTanque) REFERENCES Tanque(idTanque) ON UPDATE CASCADE,
	FOREIGN KEY (idLugar) REFERENCES Lugar(idLugar) ON UPDATE CASCADE
);

CREATE TABLE HistorialPeso (
    idTanque CHAR(10) NOT NULL,
	fecha DATETIME,
	peso FLOAT,
	PRIMARY KEY (idTanque, fecha),
	FOREIGN KEY (idTanque) REFERENCES Tanque(idTanque) ON UPDATE CASCADE
);

CREATE TABLE Usuario (
    idUsuario CHAR(10) NOT NULL,
	fName VARCHAR(64),
	lName VARCHAR(64),
	contrasena VARCHAR(128),
	correo VARCHAR(128),
    idSupervisor CHAR(10),
    puesto ENUM('Admin', 'Supervisor', 'Operador'),
    FOREIGN KEY (idSupervisor) REFERENCES Usuario(idUsuario) ON UPDATE CASCADE,
	PRIMARY KEY (idUsuario)
);

CREATE TABLE TanqueEsta (
    idTanque CHAR(10) NOT NULL,
	idLugar CHAR(10) NOT NULL,
	fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (idTanque),
	FOREIGN KEY (idTanque) REFERENCES Tanque(idTanque) ON UPDATE CASCADE,
	FOREIGN KEY (idLugar) REFERENCES Lugar(idLugar) ON UPDATE CASCADE
);

CREATE TABLE OperadoPor(
    idTanque CHAR(10) NOT NULL,
	idUsuario CHAR(10) NOT NULL,
	fecha DATETIME,
	PRIMARY KEY (idTanque, fecha),
	FOREIGN KEY (idTanque) REFERENCES Tanque(idTanque) ON UPDATE CASCADE,
	FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario) ON UPDATE CASCADE
);

CREATE TRIGGER `pasarAHaEstado` AFTER UPDATE ON `TanqueEsta` FOR EACH ROW INSERT INTO TanqueHaEstado VALUES ( NEW.idTanque, NEW.idLugar, NEW.fecha);
CREATE TRIGGER `pasaPesoAHistorialPeso`  AFTER UPDATE ON `Tanque` FOR EACH ROW INSERT INTO HistorialPeso VALUES (NEW.idTanque, CURRENT_TIMESTAMP(), NEW.pesoActual);
CREATE TRIGGER `nuevoHaEstado` AFTER INSERT ON `TanqueEsta` FOR EACH ROW INSERT INTO TanqueHaEstado VALUES ( NEW.idTanque, NEW.idLugar, NEW.fecha);
CREATE TRIGGER `nuevoPesoAHistorialPeso` AFTER INSERT ON `Tanque` FOR EACH ROW INSERT INTO HistorialPeso VALUES (NEW.idTanque, NEW.fechaIngreso, NEW.pesoActual);
