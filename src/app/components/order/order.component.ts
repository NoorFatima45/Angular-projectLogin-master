import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']  // Corrected from 'styleUrl' to 'styleUrls'
})
export class OrderComponent {
  orderSubmitted: boolean = false;  // Control visibility of order sections
  constructor(private cdr: ChangeDetectorRef) {}
  
  submitForm(event: Event) {
    event.preventDefault(); // Prevent the default form submission
    this.orderSubmitted = true;
    console.log(this.orderSubmitted);
  }
}
