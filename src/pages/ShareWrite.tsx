import React from 'react';
import Write from '../components/Write';
import { postShare } from '../apis/apis';

const ShareWrite: React.FC = () => {
  const saveToExample = (data: any) => {
    postShare(data.shareId, data.userId, data.title, data.contents, data.like, data.createDate, data.viewCnt, data.commentCnt)
    .then(response => {
      console.log('Data added to ShareExample.json:', response.data);
    })
    .catch(error => {
      console.error('Error adding data to ShareExample.json:', error);
    });
  };
    // Write 컴포넌트에서 사용할 navigateTo 값을 지정.
  const navigateTo = '/community/share';

  return (
    <div>
      <Write navigateTo={navigateTo} saveToExample={saveToExample} />
    </div>
  );
};

export default ShareWrite;
