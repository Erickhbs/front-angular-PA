import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../dados/login-data';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly url = 'http://localhost:8080/auth/login';
  loginRequest!: LoginRequest;
  loginResponse!: LoginResponse;
  
  constructor() { }

  async logar(loginReq: LoginRequest): Promise<LoginResponse>{
    const data = await fetch(this.url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginReq)
    }).then(
      (response) => {
        if(!response.ok){
          throw new Error('Erro ao logar!');
        }

        return response;
      }
    );

    return await data.json();
  }
}
