import { HttpClient } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { GameModel } from '../Model/dashboard.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashboardUrl: string = "https://static-media.api.mobilitysuite.de/2/6d324658-bf8b-4a69-8b07-61be1feb0eb3.json";
  dashboardSignal!: Signal<GameModel[]>;

  constructor(private http: HttpClient) {
    this.dashboardSignal = toSignal(this.http.get<GameModel[]>(this.dashboardUrl), { initialValue: [] })
  }
}

