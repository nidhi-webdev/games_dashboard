import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { NgxsModule } from '@ngxs/store';
import { GameState } from './app/game.state'; // Make sure to import your GameState

bootstrapApplication(App, appConfig, {
  providers: [
    importProvidersFrom(NgxsModule.forRoot([GameState]))
  ]
})
  .catch((err) => console.error(err));
})
  .catch((err) => console.error(err));
