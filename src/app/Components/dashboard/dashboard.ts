import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
// import { DashboardService } from '../../Service/dashboard-service';
import { GameModel } from '../../Model/dashboard.model';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { GameDetailDialog } from '../game-detail-dialog/game-detail-dialog';
import { Select, Store } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { GameState, SetFilter, SetGames } from '../../State/game.state';
import { Observable } from 'rxjs';
// import { Store, Select } from '@ngxs/store';
// import 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard  implements OnInit {
  private favoriteKey = 'favoriteGames';
  favoriteIds = new Set<string>();
  private store = inject(Store);
  private http = inject(HttpClient);

  constructor(private dialog: MatDialog) {
    this.loadFavorites();
  }

  toggleFavorite(id: string) {
    if (this.favoriteIds.has(id)) {
      this.favoriteIds.delete(id);
    } else {
      this.favoriteIds.add(id);
    }
    this.saveFavorites();
  }

  isFavorite(id: string): boolean {
    return this.favoriteIds.has(id);
  }

  private loadFavorites() {
    const fav = localStorage.getItem(this.favoriteKey);
    if (fav) {
      this.favoriteIds = new Set(JSON.parse(fav));
    }
  }

  private saveFavorites() {
    localStorage.setItem(this.favoriteKey, JSON.stringify(Array.from(this.favoriteIds)));
  }



  //open Modal
  openGameDetail(item: GameModel) {
    this.dialog.open(GameDetailDialog, {
      data: item,
      // width: '500px'
    });
  }

  getPolledColor(polled: number): string {
    if (polled < 5) return '#c40434';
    if (polled < 15) return '#c44b0e';
    if (polled < 30) return '#12c4bb';
    if (polled < 50) return '#1262c4';
    return '#0414c4';
  }

  // Use store.select instead of @Select for standalone components
  games$ = this.store.select(GameState.filteredGames);
  filter$ = this.store.select(GameState.filter);

  ngOnInit() {
    this.http.get<GameModel[]>('https://static-media.api.mobilitysuite.de/2/6d324658-bf8b-4a69-8b07-61be1feb0eb3.json').subscribe(games => {
      this.store.dispatch(new SetGames(games));
    });
  }

  updateFilter(filter: Partial<any>) {
    this.store.dispatch(new SetFilter(filter));
  }
}
