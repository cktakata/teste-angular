import { Component, OnInit } from '@angular/core';
import customer from '../customer';
import { customerService } from '../service/customer.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-get',
  templateUrl: './customer-get.component.html',
  styleUrls: ['./customer-get.component.css']
})
export class CustomerGetComponent implements OnInit {

  customers: customer[];

  constructor(private customerService: customerService) { }

  ngOnInit() {
    this.customerService
      .getcustomers()
      .subscribe((data: customer[]) => {
        this.customers = data;
      });
  }

}
