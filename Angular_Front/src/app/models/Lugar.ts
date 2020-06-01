export interface Lugar {
    idLugar: string;
    lnombre: string;
    radio: number;
    capacidadMaxima: number;
    coordenadas: {
        x:number;
        y:number;
    }
}