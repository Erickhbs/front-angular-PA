import { Injectable } from '@angular/core';
import { DiaSemana } from '../dados/dia-semana-data';

@Injectable({
  providedIn: 'root'
})
export class DiaSemanaService {
  readonly url = 'http://localhost:8080/dia/'
  diaSemana!: DiaSemana;

  constructor() { }

  async getDias(): Promise<DiaSemana[]>{
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getDiaById(id: number): Promise<DiaSemana>{
    const data = await fetch(`${this.url}${id}`);
    return await data.json();
  }

  async cadastrarDia(diaSemana: DiaSemana){
    const token = localStorage.getItem('token');

    await fetch(this.url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(diaSemana)
    }).then(
      (response) => {
        if(!response.ok){
          throw new Error('Erro ao cadastrar dia');
        }
      }
    );
    //this.router.navigate(['']);
  }

  async atualizarDia(diaSemana: DiaSemana){
    fetch(this.url,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(diaSemana)
    });
  }

  async deleteById(id: number){
    fetch(`${this.url}${id}`,{
      method: 'DELETE',
    }).then(
      (response) => {
        console.log(response)
        if(!response.ok){
          throw new Error('Erro ao deletar dia')
        }
      }
    )
  }
}
