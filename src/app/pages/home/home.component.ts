import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
