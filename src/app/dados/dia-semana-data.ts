import { Horario } from "./horario-data";

export interface DiaSemana {
    id?: string;
    dia: string;
    disponivel?: boolean;
    horarios?: Horario[];
}