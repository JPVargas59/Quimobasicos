INSERT INTO Contenido VALUES ("G-134A", "Cloro");
INSERT INTO Contenido VALUES ("G-404A", "Hipoclorito de sodio");
INSERT INTO Contenido VALUES ("G-804A", "Sodio");

INSERT INTO EtiquetaRFID VALUES(1);
INSERT INTO EtiquetaRFID VALUES(2);
INSERT INTO EtiquetaRFID VALUES(3);
INSERT INTO EtiquetaRFID VALUES(4);
INSERT INTO EtiquetaRFID VALUES(5);
INSERT INTO EtiquetaRFID VALUES(6);
INSERT INTO EtiquetaRFID VALUES(7);
INSERT INTO EtiquetaRFID VALUES(8);
INSERT INTO EtiquetaRFID VALUES(9);
INSERT INTO EtiquetaRFID VALUES(10);

INSERT INTO Dueno VALUES("JC","Jackie Chan");
INSERT INTO Dueno VALUES("ZT","Zun Tsu");
INSERT INTO Dueno VALUES("YX","Ying Xi");
INSERT INTO Dueno VALUES("FLORO","Floro PM");

INSERT INTO Tanque VALUES
    ("EURO5149661", "Buena", "Muy bueno", 50, 20.5, "2020-02-02 10:00:00", 1, "G-134A", "FLORO"), 
    ("EURO514967", "Mala", "Muy mala", 60, 45.5, "2020-12-08 10:00:00", 1, "G-134A", "FLORO"),  
    ("NVVU100706", "Mala", "Mala", 60, 23.5, "2020-09-10 14:00:00", 1, "G-134A", "FLORO");

INSERT INTO Mantenimiento VALUES (
	"EURO514966", "2019-08-02 10:00:00", "Se arregló la válvula"
);
INSERT INTO Mantenimiento VALUES (
	"EURO514967", "2019-10-08 17:30:00", "Se limpio el interior del tanque"
);
INSERT INTO Mantenimiento VALUES (
	"EURO514966", "2020-01-12 12:30:00", "Se volvió a pintar el tanque"
);
INSERT INTO Mantenimiento VALUES (
	"NVVU100706", "2020-04-02 13:30:00", "Se arregló la válvula del tanque"
);

INSERT INTO Lugar VALUES("PT", "Patio",15.1434,1000,ST_GeomFromText('POINT (20.53456  87.53242)'));
INSERT INTO Lugar VALUES("AMC","Almacen", 25.89,1500,ST_GeomFromText('POINT (22.53456  33.53242)'));
INSERT INTO Lugar VALUES("ETD", "Entrada",5.573,2000,ST_GeomFromText('POINT (10.53456  55.53242)'));

INSERT INTO TanqueEsta VALUES (
	"NVVU1007063", "PT","2020-10-01"
);
INSERT INTO TanqueEsta VALUES (
	"EURO514966", "AMC", "2020-10-01"
);
INSERT INTO TanqueEsta VALUES (
	"EURO514967", "ETD", "2020-10-02"
);

INSERT INTO TanqueHaEstado VALUES (
	"NVVU100706", "PT", "2020-02-08 10:20:00"
);
INSERT INTO TanqueHaEstado VALUES (
	"EURO514966", "AMC", "2020-04-10 16:20:00" 
);
INSERT INTO TanqueHaEstado VALUES (
	"EURO514967", "ETD", "2020-11-23 13:20:00" 
);

INSERT INTO HistorialPeso VALUES 
    ("EURO514967", "2020-10-10", 20), 
    ("EURO514966", "2020-12-04", 20), 
    ("EURO514967", "2020-03-03", 40);

INSERT INTO Usuario VALUES (
    'OP000001',
    'Alejandro',
    'Hernandez Lopez',
    '4272e0482200e205890367fe6603b0159a5a2c11ff7607cbbc9dd219da41035e',
    1,
    'alexhdz@quimobasicos.com'
);
INSERT INTO Usuario VALUES (
    'OP000002',
    'Juan Pablo',
    'Vargas Rodriguez',
    'fef2d481e8454c1dc62e65ccd139153506c4c92ac44a4adefe736e07da6a1e73',
    1,
    'juanpablo.vr@quimobasicos.com'
);
INSERT INTO Usuario VALUES (
    'OP000003',
    'Diana',
    'Loredo de Leon',
    'bde4fddbaed98a68fdb45670ba8917344605e490fa59c280091eb1307ac5b3c9',
    2,
    'diana.loredo@quimobasicos.com'
);
INSERT INTO Usuario VALUES (
    'OP000004',
    'Yulisa',
    'Medina',
    '76549b827ec46e705fd03831813fa52172338f0dfcbd711ed44b81a96dac51c6',
    2,
    'yulisa.medina@quimobasicos.com'
);

INSERT INTO Operador VALUES (
    'OP000002', 'OP000003'
);
INSERT INTO Operador VALUES (
    'OP000001', 'OP000003'
);
INSERT INTO Operador VALUES (
    'OP000004', 'OP000002'
);

INSERT INTO OperadoPor VALUES (
"NVVU100706", "OP000002", CURRENT_DATE()
);
INSERT INTO OperadoPor VALUES(
"EURO514966", "OP000001", CURRENT_DATE()
);
INSERT INTO OperadoPor VALUES(
"EURO514967", "OP000004", CURRENT_DATE()
);
