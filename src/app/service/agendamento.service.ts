import { Injectable } from '@angular/core';
import { AgendamentoRequest, AgendamentoResponse } from '../dados/agendamento-data';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  readonly url = 'http://localhost:8080/agendamento'
  agendamentoRequest!: AgendamentoRequest;

  constructor() { }

  async getAgendamentos(): Promise<AgendamentoResponse[]>{
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getAgendamentoById(id: number): Promise<AgendamentoResponse>{
    const data = await fetch(`${this.url}/${id}`);
    return await data.json();
  }

  async cadastrarAgendamento(agendamentoRequest: AgendamentoRequest){
    console.log(agendamentoRequest);

    const token = localStorage.getItem('token');

    await fetch(this.url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(agendamentoRequest),
    }).then(
      (response) => {
        if(!response.ok){
          throw new Error('Erro ao cadastrar dia');
        }
      }
    );
    //this.router.navigate(['']);
  }

  async atualizarAgendamento(agendamentoRequest: AgendamentoRequest){
    fetch(this.url,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(agendamentoRequest)
    });
  }

  async deleteById(id: number){
    fetch(`${this.url}/${id}`,{
      method: 'DELETE',
    }).then(
      (response) => {
        console.log(response)
        if(!response.ok){
          throw new Error('Erro ao deletar agendamento')
        }
      }
    )
  }
}
