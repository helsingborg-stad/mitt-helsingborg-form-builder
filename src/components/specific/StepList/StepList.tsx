import React, { useEffect, useState } from 'react';
import { Step } from '../../../types/FormTypes';
import Nestable, { Item } from 'react-nestable';
import { Typography } from '@material-ui/core';
import { PlusOne as PlusIcon, Minimize, PlusOne } from '@material-ui/icons';

interface Props {
  steps?: Step[];
  count?: number;
  deleteStep: (id: string) => void;
}
interface ListItem {
  id: string;
  text: string;
  children?: ListItem[];
}
const emptyList: ListItem[] = [];

const StepList: React.FC<Props> = ({ steps, deleteStep }: Props) => {
  const [localSteps, setLocalSteps] = useState(emptyList);

  useEffect(() => {
    if (steps)
      setLocalSteps(
        steps.map((step) => {
          return { id: step.id || '', text: step.title };
        }),
      );
    else setLocalSteps(emptyList);
  }, [steps]);
  // const testSteps: Item[] = [
  //   { id: '1', text: 'Just a test for now' },
  //   { id: '2', text: 'Second thing' },
  //   { id: '3', text: 'Third' },
  // ];

  const renderItem = ({ item, collapseIcon }: { item: Item; collapseIcon: React.ReactNode }) => {
    return (
      <div>
        {collapseIcon}
        <Typography variant="h4">{item.text}</Typography>
      </div>
    );
  };
  const renderCollapseIcon = ({ isCollapsed }: { isCollapsed: boolean }) => (isCollapsed ? <PlusOne /> : <Minimize />);

  return (
    <div>
      <Nestable
        items={localSteps}
        renderItem={renderItem}
        maxDepth={2}
        renderCollapseIcon={renderCollapseIcon}
        onChange={(items) => {
          setLocalSteps(items);
        }}
      />
      <pre>{JSON.stringify(localSteps, null, 2)}</pre>
    </div>
  );
};

export default StepList;
