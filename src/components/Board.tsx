import { Droppable, Draggable } from 'react-beautiful-dnd';
import DragabbleCard from './DragabbleCard';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { IToDo, toDoState } from '../atom';
import { useSetRecoilState } from 'recoil';

const Wrapper = styled.div`
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  font-size: 18px;
`;
const Delbutton = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
`;
interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}
const Area = styled.div<IAreaProps>`
  flex-grow: 1;
  background-color: ${(props) =>
    props.isDraggingOver ? '#dfe6e9' : props.isDraggingFromThis ? '#b2bec3' : 'transparent'};
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Button = styled.button`
  background-color: #74b9ff;
  border: 0;
  border-radius: 3px;
  cursor: pointer;
`;
const Input = styled.input`
  border: 0;
  padding: 10px 10px;
  border-radius: 5px;
`;

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
  index: number;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId, index }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue('toDo', '');
  };

  const onDelete = () => {
    setToDos((oldToDos) => {
      const newToDos = { ...oldToDos };
      delete newToDos[boardId];
      return newToDos;
    });
  };

  return (
    <Draggable draggableId={boardId} index={index}>
      {(provided) => (
        <Wrapper key={index} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Header>
            <Title>{boardId}</Title>
            <Delbutton onClick={onDelete}>x</Delbutton>
          </Header>
          <Form onSubmit={handleSubmit(onValid)}>
            <Input {...register('toDo', { required: true })} type='text' placeholder={`Add task on ${boardId}`} />
            <Button>add</Button>
          </Form>
          <Droppable droppableId={boardId}>
            {(magic, info) => (
              <Area
                isDraggingOver={info.isDraggingOver}
                isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                ref={magic.innerRef}
                {...magic.droppableProps}
              >
                {toDos.map((toDo, index) => (
                  <DragabbleCard key={toDo.id} boardId={boardId} index={index} toDoId={toDo.id} toDoText={toDo.text} />
                ))}
              </Area>
            )}
          </Droppable>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default Board;
