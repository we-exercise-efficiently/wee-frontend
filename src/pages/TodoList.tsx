import Container from '../components/Container';

export default function TodoList() {
  return (
    <>
      <Container>
        <h2 className="font-bold text-red-700 text-3xl">TODO-LIST!</h2>
        {
          <div className="font-thin text-blue-700 text-1xl">
            <p>text</p>
          </div>
        }
      </Container>
    </>
  );
}