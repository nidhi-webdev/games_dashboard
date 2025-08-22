import { CommonModule } from '@angular/common';
import { Component, computed, Signal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService } from '../../Service/dashboard-service';
import { GameModel } from '../../Model/dashboard.model';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { GameDetailDialog } from '../game-detail-dialog/game-detail-dialog';

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
export class Dashboard {
  dashboard: Signal<GameModel[]>;
  private favoriteKey = 'favoriteGames';
  favoriteIds = new Set<string>();
  searchTitle = signal('');
  searchYear = signal('');

  constructor(private dashboardservice: DashboardService, private dialog: MatDialog) {
    this.dashboard = this.dashboardservice.dashboardSignal;
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

  // search 
  filterGames = computed(() => {
    const item = this.searchTitle().toLowerCase().trim();
    const year = this.searchYear();
    return this.dashboard().filter(t =>
      (!item || t.title.toLowerCase().includes(item)) &&
      (!year || t.release.year.toString() === year)
    );
  });

  //open Modal
  openGameDetail(item: GameModel) {
    this.dialog.open(GameDetailDialog, {
      data: item,
      // width: '500px'
    });
  }
}
