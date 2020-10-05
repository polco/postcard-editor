import postcardReducer, { State as PostcardState } from './postcardReducer';
import undoable, { UndoableState } from './undoable';

export type State = UndoableState<PostcardState>;

export default undoable(postcardReducer);
