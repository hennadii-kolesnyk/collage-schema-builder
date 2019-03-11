export const UNDO = 'UNDO';
export const REDO = 'REDO';

export default {
    undo: () => {
        return {
            type: UNDO
        }
    },
    redo: () => {
        return {
            type: REDO
        };
    }
}