import React, { memo } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => (props.isDragging ? '#74b9ff' : props.theme.cardColor)};
  box-shadow: ${(props) => (props.isDragging ? '0px 2px 5px rgba(0,0,0,0.05)' : 'none')};
`;
interface IDrabbleCardProps {
  toDo: string;
  index: number;
}
function DragabbleCard({ toDo, index }: IDrabbleCardProps) {
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default memo(DragabbleCard);
