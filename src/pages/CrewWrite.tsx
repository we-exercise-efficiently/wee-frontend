import React from 'react';
import Write from '../components/Write'; // Write 컴포넌트 import
import { postCrew } from '../apis/apis';

const CrewWrite: React.FC = () => {
  const saveToExample = (data: any) => {
    postCrew(data.userId, data.title, data.contents, data.like, data.createDate, data.viewCnt, data.commentCnt, data.startDate, data.endDate, data.location, data.type, data.headcount, data.status)
    .then(response => {
      console.log('Data added to CrewExample.json:', response.data);
    })
    .catch(error => {
      console.error('Error adding data to CrewExample.json:', error);
    });
    // CrewExample.data.push(data);
    // localStorage.setItem('CrewExample', JSON.stringify(CrewExample));
  };
    // Write 컴포넌트에서 사용할 navigateTo 값을 지정합니다.
  const navigateTo = '/community/crew';

  // Write 컴포넌트에서 사용할 데이터를 수집합니다.
  const handleSubmit = (formData: any) => {
    // saveToExample 함수를 호출하여 크루 모집방에 데이터를 저장합니다.
    saveToExample(formData);
  };

  return (
    <div>
      {/* Write 컴포넌트를 CrewWrite 안에서 사용합니다. */}
      <Write navigateTo={navigateTo} saveToExample={handleSubmit}/>
    </div>
  );
};

export default CrewWrite;
