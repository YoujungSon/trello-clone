import React, { memo } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { toDoState } from '../atom';

const Button = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
`;

const Card = styled.div<{ isDragging: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 15px 10px;
  background-color: ${(props) => (props.isDragging ? '#74b9ff' : props.theme.cardColor)};
  box-shadow: ${(props) => (props.isDragging ? '0px 2px 5px rgba(0,0,0,0.05)' : 'none')};
`;

interface IDrabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

function DragabbleCard({ toDoId, toDoText, index, boardId }: IDrabbleCardProps) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onClick = () => {
    setToDos((oldToDos) => {
      const newList = oldToDos[boardId].filter((toDo) => toDo.id !== toDoId);
      return { ...oldToDos, [boardId]: newList };
    });
  };

  return (
    <Draggable key={toDoId} draggableId={toDoId + ''} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
          <Button onClick={onClick}>x</Button>
        </Card>
      )}
    </Draggable>
  );
}

export default memo(DragabbleCard);
