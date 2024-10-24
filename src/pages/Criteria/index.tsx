import React, { useState } from 'react';
import ModulContainer from '@/components/Container/ModulContainer';
import BaseCriteria from "@/pages/Criteria/components/BaseCriteria";

const ChartOfAccount: React.FC<any> = () => {
  const [display, setDisplay] = useState('List');
  return (
    <ModulContainer setDisplay={setDisplay}>
      <BaseCriteria display={display} />
    </ModulContainer>
  );
};

export default ChartOfAccount;
