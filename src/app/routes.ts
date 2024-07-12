import { Routes } from "@angular/router";
import { CadastrarDiaSemanaComponent } from "./cadastrar-dia-semana/cadastrar-dia-semana.component";
import { CadastrarHorarioComponent } from "./cadastrar-horario/cadastrar-horario.component";
import { CadastrarServicoComponent } from "./cadastrar-servico/cadastrar-servico.component";
import { HomeComponent } from "./home/home.component";

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
    }
];

export default routeConfig;