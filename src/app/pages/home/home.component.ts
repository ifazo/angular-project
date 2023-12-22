import { Component } from '@angular/core';
import { CategoryOverviewComponent } from '../../components/category-overview/category-overview.component';
import { HeroComponent } from '../../components/hero/hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, CategoryOverviewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
