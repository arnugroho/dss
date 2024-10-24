import React from 'react';
import { PushpinOutlined, PushpinFilled } from '@ant-design/icons';

const IconPinComponent: React.FC<any> = ({ isPinFilled }) => {
  return (
    <>
      {isPinFilled === true ? <PushpinFilled style={{ color: '#52c41a' }} /> : <PushpinOutlined />}
    </>
  );
};

export default IconPinComponent;
