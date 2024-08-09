import { Routes } from "@angular/router";
import { CadastrarDiaSemanaComponent } from "./cadastrar-dia-semana/cadastrar-dia-semana.component";
import { CadastrarHorarioComponent } from "./cadastrar-horario/cadastrar-horario.component";
import { CadastrarServicoComponent } from "./cadastrar-servico/cadastrar-servico.component";
import { HomeComponent } from "./home/home.component";
import { CadastrarAgendamentoComponent } from "./cadastrar-agendamento/cadastrar-agendamento.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { ListarHorarioComponent } from "./listar-horario/listar-horario.component";
import { ListarServicoComponent } from "./listar-servico/listar-servico.component";
import { ListarDiaComponent } from "./listar-dia/listar-dia.component";
import { ListarAgendamentoComponent } from "./listar-agendamento/listar-agendamento.component";
import { ListarAgendamentoClienteComponent } from "./listar-agendamento-cliente/listar-agendamento-cliente.component";
import { DisponibilizarHorariosComponent } from "./disponibilizar-horarios/disponibilizar-horarios.component";

const routeConfig: Routes = [
    
    {
        path: '',
        component: HomeComponent,
        title: 'Página inicial'
    },
    {
        path: 'cadastro-dia',
        component: CadastrarDiaSemanaComponent,
        title: 'Cadastro de dia'
    },
    {
        path: 'cadastro-horario',
        component: CadastrarHorarioComponent,
        title: 'Cadastro de horário'
    },
    {
        path: 'cadastro-servico',
        component: CadastrarServicoComponent,
        title: 'Cadastro de serviço'
    },
    {
        path: 'cadastro-agendamento',
        component: CadastrarAgendamentoComponent,
        title: 'Página de agendamento'
    },
    {
        path: 'disponibilizar-horarios',
        component: DisponibilizarHorariosComponent,
        title: 'Disponibilizar horários'
    },
    {
        path: 'listar-horario',
        component: ListarHorarioComponent,
        title: 'Listagem de Horários'
    },
    {
        path: 'listar-servico',
        component: ListarServicoComponent,
        title: 'Listagem de Serviços'
    },
    {
        path: 'listar-dia',
        component: ListarDiaComponent,
        title: 'Listagem de Dias'
    },
    {
        path: 'listar-agendamento',
        component: ListarAgendamentoComponent,
        title: 'Listagem de Agendamentos'
    },
    {
        path: 'listar-meus-agendamentos',
        component: ListarAgendamentoClienteComponent,
        title: 'Listagem de Agendamentos'
    },
    {
        path: 'login-page',
        component: LoginPageComponent,
        title: 'Página Login'
    }

];

export default routeConfig;