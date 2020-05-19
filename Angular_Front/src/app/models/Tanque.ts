export interface Tanque {
  id: string;
  idContenido: string;
  idDueno: string;
  pesoActual: number;
  fechaIngreso: Date | string;
  fechaEsperadaRetorno: Date | string;
  calidad: string;
  peso: number;
  idEtiqueta: any;
}

