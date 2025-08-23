import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { GameState } from './State/game.state';

@NgModule({
  imports: [NgxsModule.forRoot([GameState])],
  exports: [NgxsModule]
})
export class AppNgxsModule {}
