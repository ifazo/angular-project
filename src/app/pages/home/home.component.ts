import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { FeatureProductsComponent } from "../../components/feature-products/feature-products.component";
import { FeatureCategoryComponent } from "../../components/feature-category/feature-category.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, CarouselComponent, FeatureProductsComponent, FeatureCategoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
