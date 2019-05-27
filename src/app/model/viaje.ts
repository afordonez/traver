export interface Viaje {
    id: number;
    conductor: string;
    fecha?: number;
    coste?: number;
    ganancia?: number;
    origen: string;
    destino: string;
    realizado: Date;
    
}
