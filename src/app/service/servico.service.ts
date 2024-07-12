import { Injectable } from '@angular/core';
import { ServicoRequest, ServicoResponse } from '../dados/servico-data';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  readonly url = 'http://localhost:8080/servico/'
  servicoResponse!: ServicoResponse;

  constructor() { }

  async getServico(): Promise<ServicoResponse[]>{
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getServicoById(id: number): Promise<ServicoResponse>{
    const data = await fetch(`${this.url}${id}`);
    return await data.json();
  }

  async cadastrarServico(servico: ServicoRequest){
    await fetch(this.url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(servico)
    }).then(
      (response) => {
        if(!response.ok){
          throw new Error('Erro ao cadastrar Servico');
        }
      }
    );
    //this.router.navigate(['']);
  }

  async atualizarServico(servico: ServicoRequest){
    fetch(this.url,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(servico)
    });
  }

  async deleteById(id: number){
    fetch(`${this.url}${id}`,{
      method: 'DELETE',
    }).then(
      (response) => {
        console.log(response)
        if(!response.ok){
          throw new Error('Erro ao deletar serviço')
        }
      }
    )
  }
}