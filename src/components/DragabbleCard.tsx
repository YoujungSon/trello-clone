import React, { memo } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;
interface IDrabbleCardProps {
  toDo: string;
  index: number;
}
function DragabbleCard({ toDo, index }: IDrabbleCardProps) {
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic) => (
        <Card ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default memo(DragabbleCard);
