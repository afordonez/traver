export interface Viaje {
    id: string;
    conductor: string;
    fecha?: number;
    coste?: number;
    ganancia?: number;
    origen: string;
    destino: string;
    realizado: boolean;
    locIdOrigen: string;
    locIdDestino: string;
    latitudeOr?:string;
    longitudeOr?:string;
    latitudeDes?:string;
    longitudeDes?:string;
    distance?:number;
    
}
