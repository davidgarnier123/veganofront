import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.less'
})
export class RecipeCardComponent {
  @Input() title: string = '';
  @Input() date: string = '';
  @Input() slug: string = '';
  @Input() recipe: object = {};


  constructor(private router: Router) {}

  ngOnInit() {
    if (!this.slug) {
      this.slug = this.createSlug(this.title);
    }
  }

  private createSlug(title: string): string {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  }

  navigateToRecipe() {
    this.router.navigate(['/recette', this.slug], {
      state: {
        recipe: this.recipe,
        date: this.date,
      }
    });
  }
}
