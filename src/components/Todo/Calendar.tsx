import { useState } from 'react';
import moment, { Moment } from 'moment';
import 'moment/locale/ko';

export default function Calendar() {
    const [currentMonth, setCurrentMonth] = useState<Moment>(moment());
    const [selectedDate, setSelectedDate] = useState<Moment | null>(null); // Moment 타입 또는 null

  const generateCalendar = () => {
    const startOfWeek = currentMonth.clone().startOf('month').startOf('week');
    const endOfWeek = currentMonth.clone().endOf('month').endOf('week');
    const calendar = [];
    let week = startOfWeek.clone();

    while (week.isBefore(endOfWeek)) {
      calendar.push(
        Array(7)
          .fill(0)
          .map(() => week.add(1, 'day').clone())
      );
    }

    return calendar;
  };

  const calendar = generateCalendar();

  const renderCalendar = () => {
    return calendar.map((week, index) => (
      <tr className="border border-sky-500" key={index}>
        {week.map((day) => (
          <td
            className={`py-[28px] text-center ${day.isSame(selectedDate, 'day') ? 'bg-sky-500 text-white' : ''}`}
            key={day.format('YYYY-MM-DD')}
            onClick={() => handleDateClick(day)}
          >
            {day.format('D')}
          </td>
        ))}
      </tr>
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

  //
  
  return (
    <div className='w-[1620px] h-[688px] border border-sky-500 justify-between inline-flex'>

      {/* 달력 영역(이전, 다음 버튼 포함) */}
      <div className='w-[782px] h-[688px] border border-red-500 inline-flex justify-between items-center'>

        {/* 이전 버튼 */}
        <button onClick={goToPreviousMonth} className="border border-sky-500 w-[88px] h-[88px] rounded-[50px]">
          &lt;
        </button>

        {/* 달력 영역 */}
        <div className='border border-pink-500 h-full'>
            
            {/* 달력 탑 */}
            <div className="text-xl font-semibold border border-sky-500 flex items-center">
    
                {/* 달, 년도 */}
                <h2 className="text-xl font-semibold pl-[25px] py-[52px] w-full border border-sky-500">
                  {currentMonth.format('MMMM YYYY')}
                </h2>
    
                {/* toggle button */}
                <div className='border border-sky-500 w-fit h-fit flex ml-[-80px]'> 
                    <input
                      className="h-[20px] w-[40px] appearance-none rounded-[50px] bg-blue-300 transition-[background-color_0.2s,transform_0.2s]
                      before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] 
                      after:absolute after:z-[2] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-blue-500 
                      after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] 
                      checked:bg-red-300 checked:after:absolute checked:after:z-[2] checked:after:ml-[20px] checked:after:h-5 checked:after:w-5
                      checked:after:bg-red-500 checked:after:content-[''] hover:cursor-pointer"
                      type="checkbox"
                      role="switch"
                      id="toggle" />
                </div>
             
            </div>

          
          {/* 요일 */}
          <div>
            <table className="w-[600px]">
              <thead>
                <tr>
                  <th className="w-[100px] py-[20px]">Mon</th>
                  <th className="w-[100px] py-[20px]">Tue</th>
                  <th className="w-[100px] py-[20px]">Wed</th>
                  <th className="w-[100px] py-[20px]">Thu</th>
                  <th className="w-[100px] py-[20px]">Fri</th>
                  <th className="w-[100px] py-[20px] text-sky-500">Sat</th>
                  <th className="w-[100px] py-[20px] text-sky-500">Sun</th>
                </tr>
              </thead>
              <tbody className='content-between'>{renderCalendar()}</tbody>
            </table>
          </div>
        </div>

        {/* 다음 버튼 */}
        <button onClick={goToNextMonth} className="w-[88px] h-[88px] rounded-[50px] border border-sky-500">
            &gt;
        </button>
      </div>


      <div className='w-[782px] h-[688px] border border-red-500'>

        <div className='text-center border border-sky-500 w-full h-1/2 inline-flex'>

            <div className='text-center border border-sky-500 w-1/2 h-full'>
                이미지 1
            </div>
            <div className='text-center border border-sky-500 w-1/2 h-full'>
                이미지 2
            </div>
        </div>

        <textarea name="" id=""  
        className='text-left border border-pink-500 w-full h-[200px] px-[10px] py-[5px]'>
        </textarea>
        
        <button className='text-center border border-pink-500 px-[10px] h-[30px]'>수정하기</button>

      </div>
    </div>

    
  );
}
