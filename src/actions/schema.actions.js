export const SET_ITEMS = 'SET_ITEMS';
export const NEW_STATE = 'NEW_STATE';

export default {
    setItems: (items) => {
        return {
            type: SET_ITEMS,
            items: items
        };
    },
    initState: (state) => {
        return {
            type: NEW_STATE,
            state: state
        }
    }
}