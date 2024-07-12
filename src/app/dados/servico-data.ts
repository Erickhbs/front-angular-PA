import { DiaSemanaResponse } from "./dia-semana-data";

export interface ServicoRequest {
    id?: string;
    nome: string;
    preco: number;
    dias?: DiaSemanaResponse[];
}

export interface ServicoResponse {
    id: string;
    nome: string;
    preco: number;
    dias: DiaSemanaResponse[];
}