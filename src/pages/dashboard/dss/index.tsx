import React, { useState } from 'react';
import ModulContainer from '@/components/Container/ModulContainer';
import BaseDss from "@/pages/dashboard/dss/components/BaseDss";

const ChartOfAccount: React.FC<any> = () => {
  const [display, setDisplay] = useState('List');
  return (
    <ModulContainer setDisplay={setDisplay}>
      <BaseDss display={display} />
    </ModulContainer>
  );
};

export default ChartOfAccount;
