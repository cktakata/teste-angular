/**
 * Arquivo: src/app/customer.ts
 * Data: 04/02/2020
 * Descrição: arquivo responsável pelo modelo de classe 'customer'
 * Autor: Carlos Takata
 */

interface Address {
  cep: String;
  logradouro: String;
  complemento: String;
  bairro: String;
  localidade: String;
  uf: String;
}
export default class customer {
  nome: String;
  email: String;
  endereco: Address[];
}
