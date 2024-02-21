import React, { useState, useEffect } from 'react';
import PlusImg from '../../assets/Todo/Plus.svg';
import TodoListItem from './ListItem';
import { getTodo } from "../../apis/apis";
import AddTodo from './AddTodo';

export default function List() {
  type TodoData = {
    id: number;
    content: string;
  };

  const [showTextarea, setShowTextarea] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [todoData, setTodoData] = useState<TodoData[]>([]); // 타입 정의 수정

  useEffect(() => {
    getTodo()
      .then((response) => {
        console.log(response);
        const todos = Array.isArray(response) ? response : []; // response가 배열이 아니면 빈 배열 반환
        setTodoData(todos);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);
  

  const handleAddClick = () => {
    setShowTextarea(true);
  };

  return (
    <>
      <div className='h-full grid content-between'>
        <div className="w-[783px] h-[586px] px-[68px] py-[33px] bg-[#FAFAFA] rounded-[24px]">
          <div className='mb-[33px]'>
            <div className='w-[174px] h-[42px] rounded-[50px] bg-[#D1FD0A] flex items-center justify-center'>
              <p>AI 추천 루틴</p>
            </div>
            <div className='mt-[33px] mb-[28px]'></div>
            <div className='border-[1px] border-black'></div>
          </div>

          <div id='ListItemArea' className='border border-red-500'>
            {todoData.map((todo) => (
              <TodoListItem key={todo.id} id={todo.id} content={todo.content} />
            ))}
          </div>
        </div>

        {showTextarea ? (
          <AddTodo onConfirm={(value) => {
            setShowTextarea(false);
            setTodoData((prevTodos) => [...prevTodos, { id: Date.now(), content: value }]);
          }} />
        ) : (
          <div className="w-[70px] h-[70px] mx-auto cursor-pointer" onClick={handleAddClick}>
            <img src={PlusImg} alt="할 일 추가하기" />
          </div>
        )}
      </div>
    </>
  );
}