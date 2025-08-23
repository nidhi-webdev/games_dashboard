import { Injectable } from "@angular/core";
import { GameModel } from "../Model/dashboard.model";
import { Action, Selector, State, StateContext } from "@ngxs/store";

export class SetGames {
    static readonly type = '[Game] Set';
    constructor(public games: GameModel[]) { }
}

export class SetFilter {
    static readonly type = '[Game] Set Filter';
    constructor(public filter: any) { }
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
    @Selector()
    static filteredGames(state: GameStateModel) {
        const { games, filter } = state;
        const filtered = games.filter(t =>
            (!filter.title || t.title.toLowerCase().includes(filter.title.toLowerCase().trim())) &&
            (!filter.year || t.release.year.toString() === filter.year) &&
            (!filter.minScore || t.metrics.score >= Number(filter.minScore)) &&
            (!filter.minPlayTime || Number(t.length.overall.average) >= Number(filter.minPlayTime)) &&
            (!filter.maxPlayTime || Number(t.length.overall.average) <= Number(filter.maxPlayTime))
        );
        return filtered;
    }

    @Action(SetGames)
    SetGames(ctx: StateContext<GameStateModel>, action: SetGames) {
        ctx.patchState({ games: action.games });
    }
    @Action(SetFilter)
    SetFilter(ctx: StateContext<GameStateModel>, action: SetFilter) {
        ctx.patchState({ filter: { ...ctx.getState().filter, ...action.filter } })
    }
}