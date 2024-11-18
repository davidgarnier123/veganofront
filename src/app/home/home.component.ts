import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCardComponent } from "../recipe-card/recipe-card.component";
import { RouterModule } from '@angular/router';
import { RecipesService } from 'src/shared/services/recipes.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {
  constructor(public recipesService: RecipesService) {}


}