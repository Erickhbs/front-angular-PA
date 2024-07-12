import { DiaSemanaResponse } from "./dia-semana-data";
import { HorarioResponse } from "./horario-data";
import { ServicoResponse } from "./servico-data";

export interface AgendamentoRequest {
    id: string;
    dia: DiaSemanaResponse;
    horario: HorarioResponse;
    servico: ServicoResponse;
}

export interface AgendamentoResponse {
    id: string;
    dia: DiaSemanaResponse;
    horario: HorarioResponse;
    servico: ServicoResponse;
}