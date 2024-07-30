import { Injectable } from '@angular/core';
import { Horario } from '../dados/horario-data';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  readonly url = 'http://localhost:8080/horario'
  horario!: Horario;

  constructor() {
    
  }

  async getHorarios(): Promise<Horario[]>{
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getHorarioById(id: string): Promise<Horario>{
    const data = await fetch(`${this.url}/${id}`);
    return await data.json();
  }

  async cadastrarHorario(horario: Horario){
    const token = localStorage.getItem('token');

    await fetch(this.url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(horario)
    }).then(
      (response) => {
        if(!response.ok){
          throw new Error('Erro ao cadastrar horario');
        }
      }
    );
  }

  async atualizarHorario(horario: Horario){
    fetch(this.url,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(horario)
    });
  }

  async deleteById(id: string){
    fetch(`${this.url}/${id}`,{
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
