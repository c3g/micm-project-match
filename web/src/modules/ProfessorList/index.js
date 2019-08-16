import ProfessorList from './professorList.container';
import reducer from './professorList.reducer';
import saga from './professorList.sagas';

export const professorListReducer = reducer;
export const professorListSaga = saga;

export default ProfessorList;
