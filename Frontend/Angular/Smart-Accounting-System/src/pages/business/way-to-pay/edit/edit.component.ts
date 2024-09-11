import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent implements OnInit {
  public id = input.required<String>();

  constructor() {
    console.log(`Id ${this.id}`);
  }
  ngOnInit(): void {
    console.log(`Id ${this.id}`);
  }
}
