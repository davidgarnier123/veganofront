import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private apiUrl = 'http://localhost:3000/api/recipes';
  public recipes: any[] = [];

  constructor(private http: HttpClient) { }

  loadRecipes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(recipes => {
        this.recipes = recipes;
      })
    );
  }

  getRecipes(): any[] {
    return this.recipes;
  }

  addRecipe(recipe: any): void {
    this.recipes.push(recipe);
  }

}