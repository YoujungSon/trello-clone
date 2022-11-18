import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { IToDo, toDoState } from '../atom';

const Wrapper = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  padding: 20px 0;
`;
const Form = styled.form`
  display: grid;
  gap: 10px;
  width: 100%;
  grid-template-columns: 2fr 1fr;
`;
const Button = styled.button`
  background-color: #74b9ff;
  border: 0;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
`;
const Input = styled.input`
  border: 0;
  padding: 10px 10px;
  border-radius: 5px;
`;
interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

function CreateBoard() {
  const setBoards = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IBoardProps>();

  const onValid = ({ boardId }: IBoardProps) => {
    setBoards((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [],
      };
    });
    setValue('boardId', '');
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input {...register('boardId', { required: true })} type='text' placeholder={`Add board`} />
        <Button>add</Button>
      </Form>
    </Wrapper>
  );
}

export default CreateBoard;
