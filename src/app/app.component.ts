import { Component } from '@angular/core';
import { RecipesService } from 'src/shared/services/recipes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'veg';

  constructor(public recipesService: RecipesService) {}

  ngOnInit() {
    this.recipesService.loadRecipes().subscribe(
      () => {
        // Les recettes sont chargées, vous pouvez faire quelque chose ici si nécessaire
        console.log('Recettes chargées:', this.recipesService.recipes);
      },
      error => {
        console.error('Erreur lors du chargement des recettes:', error);
      }
    );
  }
}
