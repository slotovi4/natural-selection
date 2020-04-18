import { History } from 'history';
import { init, RematchRootState } from '@rematch/core';
import { selection, area, food, creature } from '../models';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';

const models = {
    selection,
    area,
    food,
    creature,
};

export const browserHistory: History = createBrowserHistory();

export const store = init({
    models,
    plugins: [],
    redux: {
        initialState: {},
        reducers: {
            router: connectRouter(browserHistory),
        },
        middlewares: [],
    },
});

export type Dispatch = typeof store.dispatch;
export type IRootState = RematchRootState<typeof models>;