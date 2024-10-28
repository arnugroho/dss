import React, { useState } from 'react';
import ModulContainer from '@/components/Container/ModulContainer';
import BaseAlternative from "@/pages/Alternative/components/BaseAlternative";

const ChartOfAccount: React.FC<any> = () => {
  const [display, setDisplay] = useState('List');
  return (
    <ModulContainer setDisplay={setDisplay}>
      <BaseAlternative display={display} />
    </ModulContainer>
  );
};

export default ChartOfAccount;
