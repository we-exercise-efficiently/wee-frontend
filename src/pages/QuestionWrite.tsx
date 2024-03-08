import React from 'react';
import Write from '../components/Write';
import { postQuestion } from '../apis/apis';

const QuestionWrite: React.FC = () => {
  const saveToExample = (data: any) => {
    postQuestion(data.questionId, data.userId, data.title, data.contents, data.like, data.createDate, data.viewCnt, data.commentCnt, data.type, data.status)
    .then(response => {
      console.log('Data added to QuestionExample.json:', response.data);
    })
    .catch(error => {
      console.error('Error adding data to QuestionExample.json:', error);
    });
  };
    // Write 컴포넌트에서 사용할 navigateTo 값을 지정.
  const navigateTo = '/community/question';

  return (
    <div>
      <Write navigateTo={navigateTo} saveToExample={saveToExample} />
    </div>
  );
};

export default QuestionWrite;
