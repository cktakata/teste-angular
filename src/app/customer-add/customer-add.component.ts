import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { customerService } from '../service/customer.service';

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
      endereco1: ['', Validators.required],
      logradouro: [''],
      complemento: [''],
      bairro: [''],
      localidade: [''],
      uf: ['']
    });

    this.adicionarcustomerForm.controls['endereco1'].valueChanges.subscribe(
      (value: string) => {
        if (value.length >= 8) {
          this.customerService.getCep(value).subscribe((data: any) => {
            this.adicionarcustomerForm.controls['logradouro'].setValue(data.logradouro);
            this.adicionarcustomerForm.controls['complemento'].setValue(data.complemento);
            this.adicionarcustomerForm.controls['bairro'].setValue(data.bairro);
            this.adicionarcustomerForm.controls['localidade'].setValue(data.localidade);
            this.adicionarcustomerForm.controls['uf'].setValue(data.uf);
          });
        }
      }
    );
  }

  /**
   * Método responsável por adicionar um novo 'Customer' com ação do btn 'Add':
   */
  adicionarcustomer(nomecustomer, cargo, numeroIdentificador) {
    this.customerService.adicionarcustomer(nomecustomer, cargo, numeroIdentificador);
  }

  ngOnInit() {
  }
}
