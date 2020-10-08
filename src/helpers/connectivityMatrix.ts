import { ListItem, Step } from '../types/FormTypes';

export type ConnectivityMatrixNavigationActionsTypes = 'next' | 'back' | 'up' | 'down' | 'none';
export type ConnectivityMatrix = ConnectivityMatrixNavigationActionsTypes[][];

/**
 * Function for finding related steps, based on items generated from the library react-nestable.
 * @param nestableListItem - items generated from the library react-nestable.
 * @param stepIndexes - object with step ids as keys and step indexes as values.
 */
function findRelatedStepIndexes(nestableListItem: ListItem, stepIndexes: Record<string, number>) {
  if (nestableListItem.children) {
    return nestableListItem.children.map((nestableListItemChild) => stepIndexes[nestableListItemChild.id]);
  }
  return [];
}

/**
 * Function for connecting two steps in the connectivity matrix with a navigation action.
 * @param matrix - a 2 dimensional array.
 * @param navigationAction - the navigation action that should be inserted.
 * @param firstIndex - index of the first item to connect in the matrix.
 * @param secondIndex - index of the second item to connect in the matrix.
 * @returns - a connectivity matrix.
 */
function addNavigationActionInConnectivityMatrix(
  matrix: ConnectivityMatrix,
  navigationAction: ConnectivityMatrixNavigationActionsTypes,
  firstIndex: number,
  secondIndex: number,
) {
  matrix[firstIndex][secondIndex] = navigationAction;
  return matrix;
}

/**
 * Funtion for recursivley inserting navigation actions into a connectivty matrix,
 * this is done by matching the step indexes with the data (listItems) recieved from the library react-nestable.
 * @param stepIndexes - object with step ids as keys and step indexes as value.
 * @param nestableListItems - object of list items returned from the library react-nestable.
 * @param matrix - a 2 dimensional array.
 * @param currentLevel - a number representing what level a step is in.
 * @returns a connectivity matrix.
 */
function insertNavigationActionsInConnectivityMatrix(
  stepIndexes: Record<string, number>,
  nestableListItems: ListItem[],
  matrix: ConnectivityMatrix,
  currentLevel = 0,
) {
  nestableListItems.forEach((listItem, index) => {
    const currentStepIndex = stepIndexes[listItem.id];
    if (currentLevel === 0) {
      if (index > 0) {
        const backIndex = stepIndexes[nestableListItems[index - 1].id];
        matrix = addNavigationActionInConnectivityMatrix(matrix, 'back', currentStepIndex, backIndex);
      }

      if (index < nestableListItems.length - 1) {
        const nextIndex = stepIndexes[nestableListItems[index + 1].id];
        matrix = addNavigationActionInConnectivityMatrix(matrix, 'next', currentStepIndex, nextIndex);
      }
    }

    const relatedStepIndexes = findRelatedStepIndexes(listItem, stepIndexes);

    relatedStepIndexes.forEach((relatedStepIndex) => {
      matrix = addNavigationActionInConnectivityMatrix(matrix, 'down', currentStepIndex, relatedStepIndex);
      matrix = addNavigationActionInConnectivityMatrix(matrix, 'up', relatedStepIndex, currentStepIndex);
    });

    if (listItem.children) {
      insertNavigationActionsInConnectivityMatrix(stepIndexes, listItem.children, matrix, currentLevel + 1);
    }
  });
  return matrix;
}

/**
 * Function to generate a connectivity matrix that is used to define the connection between steps in a form.
 * The connectivity matrix is used to determine the navigation from one step to another in a form.
 * @param listItems - array of list items returned from the library react-nestable.
 * @param steps - array of steps in a form.
 * @returns a connectivity matrix.
 */
export function generateNavigationConnectivityMatrix(nestableListItems: ListItem[], steps: Step[]): ConnectivityMatrix {
  const stepIndexes: Record<string, number> = steps.reduce((object: Record<string, number>, step, stepIndex) => {
    object[step.id] = stepIndex;
    return object;
  }, {});

  // Creates an empty 2 dimensional array (matrix) based on the number of steps passed,
  // where all values are set to a string with the value of 'none'.
  const emptyMatrix = [...Array(steps.length)].map(() => Array(steps.length).fill('none'));

  const matrix = insertNavigationActionsInConnectivityMatrix(stepIndexes, nestableListItems, emptyMatrix);
  console.log(matrix);
  return matrix;
}
