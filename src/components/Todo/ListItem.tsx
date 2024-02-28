import React from "react";

type TodoListProps = {
  id: number;
  content: string;
};

const TodoListItem : React.FC<TodoListProps> = ({
  id,
  content,
}) => {
  return (
    <>
      {/* 리스트 */}
      <div id="ListContainer" className="mb-[30px] flex justify-between items-center" key={id}>
          
          {/* 리스트 아이콘 */}
          <div className="w-[34px] h-[34px] border-[2.5px] border-[#FF008A] rounded-full"></div>
          {/* 리스트 내용 */}
          <p className="w-[573px] text-[18px] overflow-hidden whitespace-nowrap">
              {content}
          </p>
      </div>        
    </>
  );
}

export default TodoListItem;