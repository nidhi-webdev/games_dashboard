import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GameModel } from '../../Model/dashboard.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './game-detail-dialog.html',
  styleUrl: './game-detail-dialog.scss'
})
export class GameDetailDialog {
  timeValue = '';
  category = '';
  isFavorite = false;

  constructor(
    public dialogRef: MatDialogRef<GameDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: GameModel
  ) {
    // Checking localStorage for favorite state
    const favoriteKey = 'favoriteGames';
    const fav = localStorage.getItem(favoriteKey);
    if (fav) {
      const favIds = new Set<string>(JSON.parse(fav));
      this.isFavorite = favIds.has(this.data.id);
    }
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  onSubmit() {
    console.log('Time:', this.timeValue, 'Category:', this.category, 'Game:', this.data.title);
    this.dialogRef.close();
  }

  getPolledColor(polled: number): string {
    if (polled < 5) return '#c40434';
    if (polled < 15) return '#c44b0e';
    if (polled < 30) return '#12c4bb';
    if (polled < 50) return '#1262c4';
    return '#0414c4';
  }
}
