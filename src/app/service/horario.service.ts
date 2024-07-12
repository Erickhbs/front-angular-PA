import { Injectable } from '@angular/core';
import { HorarioRequest, HorarioResponse } from '../dados/horario-data';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  readonly url = 'http://localhost:8080/horario/'
  horarioResponse!: HorarioResponse;

  constructor() { }

  async getHorarios(): Promise<HorarioResponse[]>{
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getHorarioById(id: number): Promise<HorarioResponse>{
    const data = await fetch(`${this.url}${id}`);
    return await data.json();
  }

  async cadastrarHorario(horario: HorarioRequest){
    await fetch(this.url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(horario)
    }).then(
      (response) => {
        if(!response.ok){
          throw new Error('Erro ao cadastrar horario');
        }
      }
    );
    //this.router.navigate(['']);
  }

  async atualizarHorario(horario: HorarioRequest){
    fetch(this.url,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(horario)
    });
  }

  async deleteById(id: number){
    fetch(`${this.url}${id}`,{
      method: 'DELETE',
    }).then(
      (response) => {
        console.log(response)
        if(!response.ok){
          throw new Error('Erro ao deletar horario')
        }
      }
    )
  }
}
