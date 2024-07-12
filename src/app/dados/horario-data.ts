export interface HorarioRequest {
    id?: string;
    horas: number;
    minutos: number;
}

export interface HorarioResponse {
    id: string;
    horas: number;
    minutos: number;
}