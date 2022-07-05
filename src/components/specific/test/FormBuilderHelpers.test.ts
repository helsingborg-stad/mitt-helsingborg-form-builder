import { computeMatrix, getStepstructureIds } from '../FormBuilderHelpers';

const stepStructure = [
  {
    children: [],
    group: '2f200411-9ea6-44a6-b207-7ccdaa5606ba',
    id: '5d29a0be-6b6a-444b-8f39-23dfe78b42a8',
    text: 'Fråga 1',
  },
  {
    children: [],
    group: '808963dd-8a82-4e7f-9bd7-8449a7b9650a',
    id: '2fd23656-7004-42e5-a68c-828659da574b',
    text: 'Fråga 2',
  },
  {
    children: [],
    group: '495913a7-b365-4e2a-8552-3a11036d345e',
    id: '652d65f2-1fd5-42a9-9442-ea05d8142ac2',
    text: 'Fråga 3',
  },
];

describe('computeMatrix', () => {
  const expectedMatrix = [
    ['none', 'next', 'none'],
    ['back', 'none', 'next'],
    ['none', 'back', 'none'],
  ];

  it('returns the death matrix', () => {
    const result = computeMatrix(stepStructure);

    expect(result).toEqual(expectedMatrix);
  });

  it('returns the death matrix with changed stepstructure', () => {
    const stepst = [
      {
        children: [],
        group: '808963dd-8a82-4e7f-9bd7-8449a7b9650a',
        id: '2fd23656-7004-42e5-a68c-828659da574b',
        text: 'Fråga 2',
      },
      {
        children: [],
        group: '2f200411-9ea6-44a6-b207-7ccdaa5606ba',
        id: '5d29a0be-6b6a-444b-8f39-23dfe78b42a8',
        text: 'Fråga 1',
      },
      {
        children: [],
        group: '495913a7-b365-4e2a-8552-3a11036d345e',
        id: '652d65f2-1fd5-42a9-9442-ea05d8142ac2',
        text: 'Fråga 3',
      },
    ];

    const result = computeMatrix(stepst);

    expect(result).toEqual(expectedMatrix);
  });
});

describe('getStepstructureIds', () => {
  it('flattens ids from stepstructure', () => {
    const stepst = [
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
    ];
    const result = getStepstructureIds(stepst);

    expect(result).toEqual(['1', '2', '3']);
  });

  it('flattens ids from stepstructure with children', () => {
    const stepst = [
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
    ];
    const result = getStepstructureIds(stepst);
    console.log('RESULT: ', result);

    expect(result).toEqual(['1', '2', '3', '4', '5', '6', '7']);
  });
});
