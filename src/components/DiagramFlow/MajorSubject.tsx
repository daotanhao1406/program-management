import { memo, useEffect, useState } from 'react';
import { useRequestWithState } from '../../hooks/useRequest';
import { notification } from 'antd';
import { Handle, Position } from 'reactflow';

function SubjectDetails() {
  const { request, loading } = useRequestWithState();
  const [subjectDetails, setSubjectDetails] = useState<any[]>([]);
  const loadData = async () => {
    await request('/subjectCombination/get/659d5f49b969c9e88ea889d4')
      .then((res) => {
        setSubjectDetails(res?.data.listSubjectDetails);
      })
      .catch((err) =>
        notification.error({
          message: `Load failed`,
          description: err.message,
        })
      );
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {subjectDetails.map((subject: any, index: number) => {
        return (
          <div style={{ marginLeft: 24 }} key={subject.id}>
            <span className="custom-node__label">{subject.title}: </span>
            <span>
              {subject.theoryCredits + subject.practiseCredits},{' '}
              {subject.theoryCredits}, {subject.practiseCredits}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function MajorSubject({ id, data }: { id: any; data: any }) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <div className="react-flow__node-custom">
        <div className="custom-node__header">
          <strong>{data?.label}</strong>
        </div>
        <div
          className="custom-note__body"
          style={{ padding: '8px 16px 8px 16px', flexDirection: 'row' }}
        >
          <SubjectDetails />
        </div>
      </div>
    </>
  );
}

export default memo(MajorSubject);
