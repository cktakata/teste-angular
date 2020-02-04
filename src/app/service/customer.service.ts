import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class customerService {

  // ==> Uri da api (Back-End)
  uri = 'http://localhost:8000/api';
  viacep = 'https://viacep.com.br/ws/'

  constructor(private http: HttpClient) { }

  // Método responsável por adicionar um novo 'Customer' btn 'Add':
  adicionarcustomer(nomecustomer, email, obj) {
    const objcustomer = {
      customer: {
        name: nomecustomer,
        email
      },
      addressList: obj
    };
    console.log(objcustomer);

    // ==> (POST - URL no Back-End:): http://localhost:8000/api/customers
    this
      .http
      .post(`${this.uri}/customers`, objcustomer)
      .subscribe(res => console.log('Feito'));
  }

  /**
   * Método responsável por selecionar todos os 'Customers'
   */
  getcustomers() {
    // ==> (GET - Url no Back-End): http://localhost:8000/api/customers
    return this
      .http
      .get(`${this.uri}/customers`);
  }

  /**
   * Método responsável por \localizar endereço
   */
  getCep(cep) {
    // ==> (GET - Url no Back-End): https://viacep.com.br/ws/01001000/json/unicode/
    return this
      .http
      .get(`${this.viacep}${cep}/json/unicode/`);
  }
}
