import React from 'react';
import { Step } from '../../../types/FormTypes';
import Nestable, { Item } from 'react-nestable';
import { Typography } from '@material-ui/core';
import { PlusOne as PlusIcon, Minimize, PlusOne } from '@material-ui/icons';

interface Props {
  steps: Step[];
  count?: number;
  deleteStep: (id: string) => void;
}
const StepList: React.FC<Props> = ({ steps, deleteStep }: Props) => {
  const testSteps: Item[] = [
    { id: '1', text: 'Just a test for now' },
    { id: '2', text: 'Second thing' },
    { id: '3', text: 'Third' },
  ];

  const renderItem = ({ item }: { item: Item }) => {
    return (
      <div>
        <Typography variant="h4">{item.text}</Typography>
      </div>
    );
  };
  const renderCollapseIcon = ({ isCollapsed }: { isCollapsed: boolean }) => (isCollapsed ? <PlusOne /> : <Minimize />);

  return (
    <div>
      <Nestable items={testSteps} renderItem={renderItem} maxDepth={2} renderCollapseIcon={renderCollapseIcon} />
    </div>
  );
};

export default StepList;
