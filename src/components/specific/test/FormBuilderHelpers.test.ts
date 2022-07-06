import { computeMatrix, getStepstructureIds, matchStepStructureOrder } from '../FormBuilderHelpers';

import { ListItem, Step } from '../../../types/FormTypes';

function makeSteps(ids: string[]) {
  return ids.map((id) => ({ id }));
}

describe('computeMatrix', () => {
  const expectedMatrix = [
    ['none', 'next', 'none'],
    ['back', 'none', 'next'],
    ['none', 'back', 'none'],
  ];

  it('returns the death matrix', () => {
    const stepStructure = ([
      {
        children: [],
        id: '5d29a0be-6b6a-444b-8f39-23dfe78b42a8',
        text: 'Fråga 1',
      },
      {
        children: [],
        id: '2fd23656-7004-42e5-a68c-828659da574b',
        text: 'Fråga 2',
      },
      {
        children: [],
        id: '652d65f2-1fd5-42a9-9442-ea05d8142ac2',
        text: 'Fråga 3',
      },
    ] as unknown) as ListItem[];

    const result = computeMatrix(stepStructure);

    expect(result).toEqual(expectedMatrix);
  });

  it('returns the death matrix with changed stepStructure order', () => {
    const stepStructure = ([
      {
        children: [],
        id: '2fd23656-7004-42e5-a68c-828659da574b',
        text: 'Fråga 2',
      },
      {
        children: [],
        id: '5d29a0be-6b6a-444b-8f39-23dfe78b42a8',
        text: 'Fråga 1',
      },
      {
        children: [],
        id: '652d65f2-1fd5-42a9-9442-ea05d8142ac2',
        text: 'Fråga 3',
      },
    ] as unknown) as ListItem[];

    const result = computeMatrix(stepStructure);

    expect(result).toEqual(expectedMatrix);
  });
});

describe('getStepstructureIds', () => {
  it('flattens ids from stepstructure', () => {
    const stepStructure = ([
      {
        children: [],
        id: '1',
      },
      {
        children: [],
        id: '2',
      },
      {
        children: [],
        id: '3',
      },
    ] as unknown) as ListItem[];
    const result = getStepstructureIds(stepStructure);

    expect(result).toEqual(['1', '2', '3']);
  });

  it('flattens ids from stepstructure with children', () => {
    const stepStructure = ([
      {
        children: [
          {
            id: '2',
            children: [
              {
                id: '3',
                children: [],
              },
            ],
          },
        ],
        id: '1',
      },
      {
        children: [],
        id: '4',
      },
      {
        children: [
          {
            id: '6',
            children: [
              {
                id: '7',
                children: [],
              },
            ],
          },
        ],
        id: '5',
      },
    ] as unknown) as ListItem[];
    const result = getStepstructureIds(stepStructure);

    expect(result).toEqual(['1', '2', '3', '4', '5', '6', '7']);
  });
});

describe('matchStepStructureOrder', () => {
  it('matches flattened stepStructure ids order in steps', () => {
    const stepStructure = ([
      {
        children: [],
        id: '1',
      },
      {
        children: [],
        id: '2',
      },
      {
        children: [],
        id: '3',
      },
    ] as unknown) as ListItem[];

    const steps = makeSteps(['2', '3', '1']) as Step[];

    const result = matchStepStructureOrder(stepStructure, steps);

    expect(result).toEqual(makeSteps(['1', '2', '3']));
  });

  it('matches flattened stepStructure ids order (with children) in steps', () => {
    const stepStructure = ([
      {
        children: [
          {
            id: '2',
          },
        ],
        id: '1',
      },
      {
        children: [],
        id: '3',
      },
      {
        children: [
          {
            id: '5',
          },
        ],
        id: '4',
      },
    ] as unknown) as ListItem[];

    const steps = makeSteps(['1', '4', '2', '3', '5']) as Step[];

    const result = matchStepStructureOrder(stepStructure, steps);

    expect(result).toEqual(makeSteps(['1', '2', '3', '4', '5']));
  });
});
