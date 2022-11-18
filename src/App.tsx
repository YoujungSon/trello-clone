import styled from 'styled-components';

import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { toDoState } from './atom';

import Boards from './components/Boards';
import CreateBoard from './components/CreateBoard';

const Wrapper = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  height: 100vh;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  console.log(toDos);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;

    console.log('진짜임', destination, '그다음', source);
    if (!destination) return;

    if (source.droppableId === 'Boards') {
      setToDos((allBoards) => {
        const boardsList = Object.keys(allBoards);
        console.log('보드리스트', boardsList);
        const taskObj = boardsList[source.index];
        console.log('테스크오브젝', taskObj);
        boardsList.splice(source.index, 1);
        boardsList.splice(destination.index, 0, taskObj);
        console.log('수정후', boardsList);
        let boards = {};
        boardsList.map((board) => {
          boards = { ...boards, [board]: allBoards[board] };
        });
        return { ...boards };
      });
      return;
    } else {
      if (destination?.droppableId === source.droppableId) {
        // same board movement.
        setToDos((allBoards) => {
          const boardCopy = [...allBoards[source.droppableId]];
          const taskObj = boardCopy[source.index];
          boardCopy.splice(source.index, 1);
          boardCopy.splice(destination?.index, 0, taskObj);
          return { ...allBoards, [source.droppableId]: boardCopy };
        });
      }
      if (destination.droppableId !== source.droppableId) {
        // cross board movement.
        setToDos((allBoards) => {
          const sourceBoard = [...allBoards[source.droppableId]];
          const taskObj = sourceBoard[source.index];
          const destinationBoard = [...allBoards[destination.droppableId]];
          sourceBoard.splice(source.index, 1);
          destinationBoard.splice(destination?.index, 0, taskObj);
          return { ...allBoards, [source.droppableId]: sourceBoard, [destination.droppableId]: destinationBoard };
        });
      }
    }
  };
  return (
    <>
      <CreateBoard />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards />
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
