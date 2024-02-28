import React, { useState } from 'react';

type AddTodoProps = {
  onConfirm: (value: string) => void;
};

const AddTodo: React.FC<AddTodoProps> = ({ onConfirm }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleConfirmClick = () => {
    if (inputValue.trim() === "") {
      alert("내용을 입력해주세요");
    } else {
      onConfirm(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <textarea
        className="w-full h-[70px] resize-none border border-black"
        placeholder="할 일을 입력하세요..."
        value={inputValue}
        onChange={handleInputChange}
      ></textarea>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleConfirmClick}
      >
        확인
      </button>
    </div>
  );
};

export default AddTodo;