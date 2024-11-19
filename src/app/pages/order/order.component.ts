import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  orders: any[] = [];

  openedMenuId: number | null = null;

  toggleMenu(orderId: number) {
    this.openedMenuId = this.openedMenuId === orderId ? null : orderId;
  }

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.api.getOrders().subscribe({
      next: (data: any) => {
        this.orders = data;
        console.log(this.orders);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Orders fetched successfully.');
      },
    });
  }
}
