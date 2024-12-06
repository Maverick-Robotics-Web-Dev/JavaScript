import { Component } from '@angular/core';
import { ListComponent } from '@shared/components/list';

@Component({
  selector: 'comp-branch-offices-list',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './branch-offices-list.component.html',
  styleUrl: './branch-offices-list.component.scss',
})
export class BranchOfficesListComponent {
  public data = [
    {
      name: 'Sant Extreanet Solution',
      description: 'HTML, JS, ReactJS',
      price: '$2,790',
      paid: 'Paid',
      deposit: '$520',
      condition: 'Rejected',
      agent: 'Bradly Beal',
      position: 'Insurance',
      status: 'Approved',
    },
    {
      name: 'Telegram Development',
      description: 'C#, ASP.NET, MS SQL',
      price: '$4,790',
      paid: 'Paid',
      deposit: '$240',
      condition: 'Rejected',
      agent: 'Chris Thompson',
      position: 'NBA Player',
      status: 'In Progress',
    },
    {
      name: 'Payroll Application',
      description: 'PHP, Laravel, VueJS',
      price: '$4,390',
      paid: 'Paid',
      deposit: '$593',
      condition: 'Rejected',
      agent: 'Zoey McGee',
      position: 'Ruby Developer',
      status: 'Success',
    },
    {
      name: 'HR Management System',
      description: 'Python, PostgreSQL, ReactJS',
      price: '$7,990',
      paid: 'Paid',
      deposit: '$980',
      condition: 'Rejected',
      agent: 'Brandon Ingram',
      position: 'Insurance',
      status: 'Rejected',
    },
    {
      name: 'Telegram Mobile',
      description: 'HTML, JS, ReactJS',
      price: '$5,790',
      paid: 'Paid',
      deposit: '$750',
      condition: 'Rejected',
      agent: 'Natali Trump',
      position: 'Insurance',
      status: 'Warning',
    },
  ];
}
