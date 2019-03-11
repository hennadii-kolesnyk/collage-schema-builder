import { combineReducers } from 'redux';
import undoable from './undoable.reducer';
import schema from './schema.reducer';

const undoableSchema = undoable(schema);

const rootReducer = combineReducers({
    undoableSchema
});

export default rootReducer;