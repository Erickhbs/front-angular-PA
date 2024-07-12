import { HorarioResponse } from "./horario-data";

export interface DiaSemanaRequest {
    id?: string;
    dia: string;
    disponivel?: boolean;
    horarios?: HorarioResponse[];
}

export interface DiaSemanaResponse {
    id: string;
    dia: string;
    disponivel: boolean;
    horarios: HorarioResponse[];
}