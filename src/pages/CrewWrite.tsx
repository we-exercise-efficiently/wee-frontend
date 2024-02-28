import React from 'react';
import Write from '../components/Write'; // Write 컴포넌트 import
import CrewExample from '../examples/CrewExample.json';

const CrewWrite: React.FC = () => {
  const saveToExample = (data: any) => {
    CrewExample.data.push(data);
    localStorage.setItem('CrewExample', JSON.stringify(CrewExample));
  };
    // Write 컴포넌트에서 사용할 navigateTo 값을 지정합니다.
  const navigateTo = '/community/crew';

  return (
    <div>
      {/* Write 컴포넌트를 CrewWrite 안에서 사용합니다. */}
      <Write navigateTo={navigateTo} saveToExample={saveToExample} />
    </div>
  );
};

export default CrewWrite;
