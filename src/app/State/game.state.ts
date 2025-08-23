// import { filter } from "rxjs";
import { Injectable } from "@angular/core";
import { GameModel } from "../Model/dashboard.model";
import { Action, Selector, State, StateContext } from "@ngxs/store";
// import { Title } from "@angular/platform-browser";

export class SetGames {
    static readonly type = '[Game] Set';
    constructor(public games: GameModel[]) {}
} 

export class SetFilter {
    static readonly type = '[Game] Set Filter';
    constructor(public filter: any) {}
}

export interface GameStateModel {
    games: GameModel[];
    filter: {
        title: string;
        year: string;
        minScore: string;
        minPlayTime: string;
        maxPlayTime: string;
    };
}

@State<GameStateModel>({
    name: 'game',
    defaults: {
        games: [],
        filter: {
            title: '',
            year: '',
            minScore: '',
            minPlayTime: '',
            maxPlayTime: ''
        }
    }
})
@Injectable()
export class GameState {
    @Selector()
    static games(state: GameStateModel) {
        return state.games;
    }
    @Selector()
    static filter(state: GameStateModel) {
        return state.filter;
    }

    @Action(SetGames)
    SetGames(ctx: StateContext<GameStateModel>, action: SetGames) {
        ctx.patchState({ games: action.games });
    }
    @Action(SetFilter)
    SetFilter(ctx: StateContext<GameStateModel>, action: SetFilter) {
        ctx.patchState({ filter: {...ctx.getState().filter, ...action.filter }})
    }
}