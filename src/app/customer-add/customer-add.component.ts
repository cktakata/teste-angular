import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { customerService } from '../service/customer.service';
import customer from '../domain/customer';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})

export class CustomerAddComponent implements OnInit {

  adicionarcustomerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private customerService: customerService) {
    this.createForm();
  }

  /**
   * Método responsável por tratar as validações do Form que criará um novo Funcionário:
   */
  createForm() {
    this.adicionarcustomerForm = this.formBuilder.group({
      nomecustomer: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      cep1: ['', Validators.required],
      logradouro1: [''],
      complemento1: [''],
      bairro1: [''],
      localidade1: [''],
      uf1: [''],
      cep2: ['', Validators.required],
      logradouro2: [''],
      complemento2: [''],
      bairro2: [''],
      localidade2: [''],
      uf2: ['']
    });

    this.adicionarcustomerForm.controls['cep1'].valueChanges.subscribe(
      (value: string) => {
        if (value.length >= 8) {
          this.customerService.getCep(value).subscribe((data: any) => {
            this.adicionarcustomerForm.controls['logradouro1'].setValue(data.logradouro);
            this.adicionarcustomerForm.controls['complemento1'].setValue(data.complemento);
            this.adicionarcustomerForm.controls['bairro1'].setValue(data.bairro);
            this.adicionarcustomerForm.controls['localidade1'].setValue(data.localidade);
            this.adicionarcustomerForm.controls['uf1'].setValue(data.uf);
          });
        }
      }
    );

    this.adicionarcustomerForm.controls['cep2'].valueChanges.subscribe(
      (value: string) => {
        if (value.length >= 8) {
          this.customerService.getCep(value).subscribe((data: any) => {
            this.adicionarcustomerForm.controls['logradouro2'].setValue(data.logradouro);
            this.adicionarcustomerForm.controls['complemento2'].setValue(data.complemento);
            this.adicionarcustomerForm.controls['bairro2'].setValue(data.bairro);
            this.adicionarcustomerForm.controls['localidade2'].setValue(data.localidade);
            this.adicionarcustomerForm.controls['uf2'].setValue(data.uf);
          });
        }
      }
    );

  }

  /**
   * Método responsável por adicionar um novo 'Customer' com ação do btn 'Add':
   */
  // tslint:disable-next-line: max-line-length
  adicionarcustomer(nomecustomer, email, cep1, logradouro1, complemento1, bairro1, localidade1, uf1, cep2, logradouro2, complemento2, bairro2, localidade2, uf2, ) {
    const obj = new customer();
    obj.nome = nomecustomer;
    obj.email = email;
    const endereco1 = {
      cep: cep1,
      logradouro: logradouro1,
      complemento: complemento1,
      bairro: bairro1,
      localidade: localidade1,
      uf: uf1
    };
    obj.endereco.push(endereco1);
    const endereco2 = {
      cep: cep2,
      logradouro: logradouro2,
      complemento: complemento2,
      bairro: bairro2,
      localidade: localidade2,
      uf: uf2
    };
    obj.endereco.push(endereco2);
    this.customerService.adicionarcustomer(nomecustomer, email, obj);
  }

  ngOnInit() {
  }
}
