import { StepperActions, ListItem, Step } from '../../types/FormTypes';

export const recursiveDelete = (item: ListItem, stepId: string): ListItem[] => {
  if (stepId === item.id) {
    return item?.children || [];
  }
  if (item.children) {
    return [
      {
        id: item.id,
        group: item.group,
        text: item.text,
        children: item.children.flatMap((e) => recursiveDelete(e, stepId)),
      },
    ];
  }
  return [];
};

export const matchStepStructureOrder = (stepStructures: ListItem[], steps: Step[]): Step[] => {
  const stepStructureIds = getStepstructureIds(stepStructures);

  const newStepsOrder: Step[] = [];

  stepStructureIds.forEach((structureId: string) => {
    const step = steps.find(({ id }) => structureId === id);

    if (step !== undefined) {
      newStepsOrder.push(step);
    }
  });
  return newStepsOrder;
};

export const getStepstructureIds = (stepStructure: ListItem[]): string[] => {
  const ids: string[] = [];

  stepStructure.forEach((childStepStructure) => {
    ids.push(childStepStructure.id);
    ids.push(...getStepstructureIds(childStepStructure.children ?? []));
  });

  return ids;
};

export const computeMatrix = (stepStruct: ListItem[]): StepperActions[][] => {
  const stepStuctureIds = getStepstructureIds(stepStruct);
  const indices: Record<string, number> = stepStuctureIds.reduce((res: Record<string, number>, current, index) => {
    res[current] = index;
    return res;
  }, {});
  const emptyMatrix = [...Array(stepStuctureIds.length)].map((e) => Array(stepStuctureIds.length).fill('none'));

  const getDownIndices = (item: ListItem) => {
    if (item.children) {
      const downIndices: number[] = [];
      const children = item.children;
      children.forEach((child, index) => {
        if (index === 0 || child.group !== children[index - 1].group) {
          downIndices.push(indices[child.id]);
        }
      });
      return downIndices;
    }
    return [];
  };
  const getUpIndices = (item: ListItem) => {
    if (item.children) return item.children.map((child) => indices[child.id]);
    return [];
  };

  const recursiveBuild = (stepStruct: ListItem[], matrix: StepperActions[][], currentLevel: number) => {
    stepStruct.forEach((currentStep, index) => {
      const currentStepIndex = indices[currentStep.id];
      if (currentLevel === 0) {
        if (index > 0) {
          const backIndex = indices[stepStruct[index - 1].id];
          matrix[currentStepIndex][backIndex] = 'back';
        }
        if (index < stepStruct.length - 1) {
          const nextIndex = indices[stepStruct[index + 1].id];
          matrix[currentStepIndex][nextIndex] = 'next';
        }
      }
      if (currentLevel > 0) {
        if (index > 0 && currentStep.group === stepStruct[index - 1].group) {
          const backIndex = indices[stepStruct[index - 1].id];
          matrix[currentStepIndex][backIndex] = 'back';
        }
        if (index < stepStruct.length - 1 && currentStep.group === stepStruct[index + 1].group) {
          const nextIndex = indices[stepStruct[index + 1].id];
          matrix[currentStepIndex][nextIndex] = 'next';
        }
      }

      getDownIndices(currentStep).forEach((n) => {
        matrix[currentStepIndex][n] = 'down';
      });
      getUpIndices(currentStep).forEach((n) => {
        matrix[n][currentStepIndex] = 'up';
      });
      if (currentStep.children) {
        recursiveBuild(currentStep.children, matrix, currentLevel + 1);
      }
    });
    return matrix;
  };
  return recursiveBuild(stepStruct, emptyMatrix, 0);
};
