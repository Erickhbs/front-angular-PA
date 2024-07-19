import { Injectable } from '@angular/core';
import { Register } from '../dados/register-data';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  readonly url = 'http://localhost:8080/auth/register';
  
  constructor() { }

  async register(register: Register){
    await fetch(this.url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(register)
    }).then(
      (response) => {
        if(!response.ok){
          throw new Error('Erro ao logar!');
        }
      }
    );
  }
}