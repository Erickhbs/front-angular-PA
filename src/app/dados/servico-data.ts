import { DiaSemana } from "./dia-semana-data";

export interface Servico {
    id?: string;
    nome: string;
    preco: number;
    dias?: DiaSemana[];
}