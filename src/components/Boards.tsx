import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { toDoState } from '../atom';
import Board from './Board';
import { Droppable } from 'react-beautiful-dnd';

const Wrapper = styled.div`
  display: grid;
  gap: 10px;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
`;
function Boards() {
  const toDos = useRecoilValue(toDoState);
  return (
    <Droppable droppableId='Boards' direction='horizontal' type='BOARD'>
      {(provided, snapshot) => (
        <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
          {Object.keys(toDos).map((boardId, index) => (
            <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} index={index} />
          ))}
          {provided.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
}

export default Boards;
