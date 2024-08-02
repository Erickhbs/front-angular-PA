import { DiaSemana } from "./dia-semana-data";
import { Horario } from "./horario-data";
import { Servico } from "./servico-data";
import { Usuario } from "./usuario-data";

export interface AgendamentoRequest {
    id?: string;
    dia: string;
    horario: string;
    servico: string;
    usuario: string;
}

export interface AgendamentoResponse{
    id?: string;
    dia: DiaSemana;
    horario: Horario;
    servico: Servico;
    usuario: Usuario;
}