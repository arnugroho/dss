import React, { useState } from 'react';
import ModulContainer from '@/components/Container/ModulContainer';
import BaseCriteriaAhp from "@/pages/ahp/Criteria/components/BaseCriteriaAhp";

const ChartOfAccount: React.FC<any> = () => {
  const [display, setDisplay] = useState('List');
  return (
    <ModulContainer setDisplay={setDisplay}>
      <BaseCriteriaAhp display={display} />
    </ModulContainer>
  );
};

export default ChartOfAccount;
