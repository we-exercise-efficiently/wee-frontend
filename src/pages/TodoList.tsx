import Container from '../components/Container';
import Calender from "../components/Todo/Calendar";

export default function TodoList() {
  return (
    <>
      <Container>

        <section className='w-[1620px] mx-auto'>

          <h1 className="font-bold text-[48px] mt-[88px] mb-[77px] text-center">
            Today's WEE TO DO
          </h1>

          <div className='mb-[100px]'>
          <Calender />
          </div>
          

        </section>

      </Container>
    </>
  );
}