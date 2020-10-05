import { UndoableAction } from './undoable';
import PostcardActions from './postcardActions';

type Action = UndoableAction<PostcardActions>;

export default Action;
