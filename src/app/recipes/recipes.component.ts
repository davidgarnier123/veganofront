import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeCardComponent } from "../recipe-card/recipe-card.component";
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RecipesService } from 'src/shared/services/recipes.service';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    CommonModule,
    RecipeCardComponent,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.less'
})
export class RecipesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ingredients = new FormControl([]);
  searchControl = new FormControl('');
  ingredientsList: string[] = ['Tomato', 'Onion', 'Lettuce', 'Cheese', 'Bacon', 'Mushroom', 'Pickle'];
  filteredIngredientsList: string[] = this.ingredientsList;

  pagedRecipes: any[] = [];
  pageSize = 15;
  pageSizeOptions: number[] = [15, 30, 50];

  constructor(public _recipesService: RecipesService) {}

  ngOnInit() {
    this._recipesService.loadRecipes().subscribe(() => {
      this.updatePagedRecipes();
    });

    this.searchControl.valueChanges.subscribe(() => {
      this.filterIngredients(this.searchControl.value);
      this.updatePagedRecipes();
    });

    this.ingredients.valueChanges.subscribe(() => {
      this.updatePagedRecipes();
    });
  }

  filterIngredients(searchTerm: string | null) {
    if (!searchTerm) {
      this.filteredIngredientsList = this.ingredientsList;
    } else {
      this.filteredIngredientsList = this.ingredientsList.filter(ingredient =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  updatePagedRecipes() {
    let filteredRecipes = this._recipesService.recipes;
    
    // Appliquer la recherche
    const searchTerm = this.searchControl.value?.toLowerCase();
    if (searchTerm) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.titre.toLowerCase().includes(searchTerm)
      );
    }

    // Appliquer le filtre d'ingrédients
    const selectedIngredients = this.ingredients.value;
    if (selectedIngredients && selectedIngredients.length > 0) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        selectedIngredients.every(ing => recipe.ingredients.includes(ing))
      );
    }

    // Mettre à jour les recettes paginées
    this.pagedRecipes = filteredRecipes.slice(0, this.pageSize);
    
    // Mettre à jour le paginator
    if (this.paginator) {
      this.paginator.length = filteredRecipes.length;
      this.paginator.pageIndex = 0;
    }
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this._recipesService.recipes.length) {
      endIndex = this._recipesService.recipes.length;
    }
    this.pagedRecipes = this._recipesService.recipes.slice(startIndex, endIndex);
  }
}