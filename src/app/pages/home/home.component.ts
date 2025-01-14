import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { FeatureProductsComponent } from "../../components/feature-products/feature-products.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, FeatureProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
