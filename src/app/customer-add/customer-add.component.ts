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
      email: ['', Validators.compose([Validators.required, Validators.email])],
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
      (value: any) => {
        if (value.length >= 8 && !isNaN(value)) {
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
      (value: any) => {
        if (value.length >= 8 && !isNaN(value)) {
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
  adicionarcustomer(form) {
    console.log(form.controls)
    const obj = new customer();
    obj.nome = form.controls['nomecustomer'].value;
    obj.email = form.controls['email'].value;
    obj.endereco = [];
    const endereco1 = {
      cep: form.controls['cep1'].value,
      logradouro: form.controls['logradouro1'].value,
      complemento: form.controls['complemento1'].value,
      bairro: form.controls['bairro1'].value,
      localidade: form.controls['localidade1'].value,
      uf: form.controls['uf1'].value
    }
    obj.endereco.push(endereco1);
    const endereco2 = {
      cep: form.controls['cep2'].value,
      logradouro: form.controls['logradouro2'].value,
      complemento: form.controls['complemento2'].value,
      bairro: form.controls['bairro2'].value,
      localidade: form.controls['localidade2'].value,
      uf: form.controls['uf2'].value
    }
    obj.endereco.push(endereco2);
    this.customerService.adicionarcustomer(obj);
  }

  ngOnInit() {
  }
}
