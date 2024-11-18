import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.less'
})
export class RecipeDetailComponent implements OnInit {

  public recipeData: any;
  currentUrl: string = '';

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.recipeData = navigation.extras.state as { title: string, date: string };
    }
  }

  ngOnInit() {

    this.currentUrl = window.location.href;

    if (this.recipeData) {
      console.log('Données de la recette:', this.recipeData);
    } else {
      console.log('Aucune donnée de recette disponible');
      // Ici, vous pourriez appeler un service pour charger les données de la recette
      // this.loadRecipeData(this.slug);
    }
  }

  goBack() {
    this.location.back();
  }

  getImagePath(recipeId: number, imageNumber: number): string {
    return `../../../assets/recipes/${recipeId}-${imageNumber}.jpg`;
  }

  onImageError(event: any, imageNumber: number) {
    if (imageNumber === 1) {
      event.target.src = '../../../assets/food.png';
    } else {
      event.target.style.display = 'none';
    }
  }

}