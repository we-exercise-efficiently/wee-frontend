import { useState } from 'react';
import moment, { Moment } from 'moment';
import 'moment/locale/ko';

import Diary from "./Diary";
import List from "./List";

export default function Calendar() {
    const [currentMonth, setCurrentMonth] = useState<Moment>(moment());
    const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
    const [toggle, setToggle] = useState(false);

  const generateCalendar = () => {
    const startOfWeek = currentMonth.clone().startOf('month').startOf('week');
    // const endOfWeek = currentMonth.clone().endOf('month').endOf('week');
    const calendar = [];
    let week = startOfWeek.clone();
    
    // 6주(42일)로 고정
    for (let i = 0; i < 6; i++) {
      calendar.push(
        Array(7)
          .fill(0)
          .map(() => {
            const currentWeek = week.clone();
            week.add(1, 'day');
            return currentWeek;
          })
      );
    }
  
    return calendar;
  };

  const calendar = generateCalendar();

  
  const renderCalendar = () => {
    return calendar.map((week, index) => (
      <div className="grid grid-cols-7 gap-x-[48px] gap-y-[20px]" key={index}>
        {week.map((day) => (
          <div
            className={`w-[51px] h-[51px] mb-[28px] flex items-center justify-center cursor-pointer 
              ${day.isSame(selectedDate, 'day') ? 'text-[#D1FD0A]' : ''}
              ${!day.isSame(currentMonth, 'month') ? 'text-gray-400' : ''}`}
            key={day.format('YYYY-MM-DD')}
            onClick={() => handleDateClick(day)}
          >
            {day.format('D')}
          </div>
        ))}
      </div>
    ));
  };

  const handleDateClick = (day: Moment) => {
    // 클릭한 날짜를 상태에 저장
    setSelectedDate(day);
    // 여기에서 클릭한 날짜에 따른 리스트를 표시하도록 로직 추가
    // 예: setSelectedList(fetchListForDate(day));
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
  };

  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, 'month'));
  };

  const handleToggleChange = () => {
    setToggle(!toggle);
  };

  //
  
  return (
    <div className='w-[1620px] h-[688px] justify-between inline-flex'>

      {/* 달력 영역 */}
      <div className='w-[782px] h-[688px] px-[69px] rounded-[24px] grid place-items-center bg-[#040F15] text-white'>
            
        {/* 달력 탑 */}
        <div className="w-full h-[137px] text-xl flex items-center justify-between">

          <div className='flex items-center'>
            {/* 이전 버튼 */}
            <button onClick={goToPreviousMonth} className="w-[9px] h-[31px]">
              &lt;
            </button>
            {/* 달, 년도 */}
            <h2 className="text-[#D1FD0A] text-[50px] text-xl font-semibold mx-[5px] w-[270px] text-center">
             {currentMonth.format('YYYY')} {currentMonth.format('MMM').toUpperCase()} 
            </h2>
            {/* 다음 버튼 */}
            <button onClick={goToNextMonth} className="w-[9px] h-[31px]">
                &gt;
            </button>
          </div>
          
          
          {/* toggle button */}
          <div className='w-fit h-fit flex'> 
              <input
                className="h-[20px] w-[40px] appearance-none rounded-[50px] bg-[#363636] transition-[background-color_0.2s,transform_0.2s]
                before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] 
                after:absolute after:z-[2] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-[#D1FD0A] 
                after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] 
                checked:bg-[#363636] checked:after:absolute checked:after:z-[2] checked:after:ml-[20px] checked:after:h-5 checked:after:w-5
                checked:after:bg-[#D1FD0A] checked:after:content-[''] hover:cursor-pointer"
                type="checkbox"
                role="switch"
                id="toggle"
                checked={toggle} // 토글 상태 반영
                onChange={handleToggleChange} // 토글 상태 변경 이벤트 처리
                />
          </div>
         
        </div>
        
        {/* 요일 */}
        <div>
          <div className="flex justify-between py-[20px] w-full text-center">
            <div className="w-[50px]">Mon</div>
            <div className="w-[50px]">Tue</div>
            <div className="w-[50px]">Wed</div>
            <div className="w-[50px]">Thu</div>
            <div className="w-[50px]">Fri</div>
            <div className="w-[50px] text-[#D1FD0A]">Sat</div>
            <div className="w-[50px] text-[#D1FD0A]">Sun</div>
          </div>
          <div className="h-[487px]">{renderCalendar()}</div>
        </div>
        
      </div>


      <div className='w-[782px] h-[688px]'>

        
        {toggle ? <Diary /> : <List />} {/* 토글 상태에 따라 Diary 컴포넌트를 표시하거나 숨김 */}

      </div>
    </div>

    
  );
}
