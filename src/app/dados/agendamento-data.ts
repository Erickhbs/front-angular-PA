import { DiaSemana } from "./dia-semana-data";
import { Horario } from "./horario-data";
import { Servico } from "./servico-data";

export interface Agendamento {
    id?: string;
    dia: DiaSemana;
    horario: Horario;
    servico: Servico;
}