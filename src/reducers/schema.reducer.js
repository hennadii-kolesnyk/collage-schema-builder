import { SET_ITEMS, NEW_STATE } from '../actions/schema.actions';
import { Map } from 'immutable';

export default function schema(state = {}, action) {

    let nextState = Map(state);

    switch (action.type) {
        case NEW_STATE:
            return Map(action.state).toJS();
        case SET_ITEMS:
            return nextState.set('items', action.items).toJS();
        default:
            return nextState.toJS();
    }
}