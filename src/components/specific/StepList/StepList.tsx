import React, { useEffect } from 'react';
import { Step, ListItem } from '../../../types/FormTypes';
// import Nestable, { Item } from 'react-nestable';
import { Item } from 'react-nestable';
import Nestable from '../../../nestable/Nestable';
import { Button, createStyles, IconButton, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { ExpandMore, ExpandLess, Clear, FileCopy } from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginTop: theme.spacing(2),
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    selected: {
      backgroundColor: 'white',
      color: 'black',
    },
    table: {
      display: 'table',
      tableLayout: 'fixed',
      width: '100%',
    },
    row: {
      display: 'table-row',
    },
    col: {
      display: 'table-cell',
      minWidth: '32px',
    },
    colCenter: {
      display: 'table-cell',
      whiteSpace: 'nowrap',
      width: '75%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  }),
);
interface Props {
  steps: Step[];
  count?: number;
  deleteStep: (id: string) => void;
  copyStep: (id: string) => void;
  addStep: () => void;
  selectedStepId: string;
  selectStep: (id: string) => void;
  stepStructure: ListItem[];
  setStepStructure: (items: ListItem[] | ((prevState: ListItem[]) => ListItem[])) => void;
  onStepStructureOrderChange: (items: ListItem[]) => void;
}

const StepList: React.FC<Props> = ({
  steps,
  deleteStep,
  copyStep,
  addStep,
  selectedStepId,
  selectStep,
  stepStructure,
  setStepStructure,
  onStepStructureOrderChange,
}: Props) => {
  const classes = useStyles();

  useEffect(() => {
    const recursiveReplace = (titles: Record<string, string>, item: ListItem): ListItem => {
      return {
        id: item.id,
        text: titles[item.id] || 'Unnamed',
        children: item?.children ? item.children.map((i) => recursiveReplace(titles, i)) : [],
        group: item.group,
      };
    };

    if (steps && stepStructure.length === 0) {
      setStepStructure(
        steps.map((step) => {
          return { id: step.id || '', text: step.title !== '' ? step.title : 'Unnamed', group: uuidv4() };
        }),
      );
    } else {
      const titles = steps.reduce((acc: Record<string, string>, curr: Step) => {
        acc[curr.id] = curr.title === '' ? 'Unnamed' : curr.title;
        return acc;
      }, {});
      const newStepStruct = stepStructure.map((s) => recursiveReplace(titles, s));
      setStepStructure(newStepStruct);
    }
  }, [steps]);

  const toggleSelection = (item: Item) => () => {
    selectStep(item.id);
  };
  const renderItem = ({ item, collapseIcon }: { item: Item; collapseIcon: React.ReactNode }) => {
    return (
      <div>
        <Paper
          style={{
            height: '34px',
            paddingLeft: '8px',
            paddingRight: '8px',
            borderBottomLeftRadius: '0px',
            borderTopLeftRadius: '0px',
          }}
          className={selectedStepId === item.id ? classes.selected : ''}
        >
          <div className={classes.table}>
            <div className={classes.row}>
              <span className={classes.col}>{collapseIcon}</span>
              <span onClick={toggleSelection(item)} className={classes.colCenter}>
                <Typography style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>{item.text}</Typography>
              </span>
              <div className={`${classes.col}`} style={{ width: 30 }}>
                <IconButton color="primary" onClick={() => copyStep(item.id)}>
                  <FileCopy fontSize="small" />
                </IconButton>
              </div>
              <div className={`${classes.col}`} style={{ width: 30 }}>
                <IconButton color="secondary" onClick={() => deleteStep(item.id)}>
                  <Clear fontSize="small" />
                </IconButton>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    );
  };
  const renderCollapseIcon = ({ isCollapsed }: { isCollapsed: boolean }) =>
    isCollapsed ? <ExpandMore /> : <ExpandLess />;

  return (
    <div>
      <Paper
        className={selectedStepId === '' ? classes.selected : ''}
        style={{ minHeight: '40px' }}
        onClick={() => selectStep('')}
      >
        <Typography style={{ paddingTop: '8px', paddingLeft: '5px' }}>Form data</Typography>
      </Paper>
      <Typography variant="h6">Steps</Typography>
      <Nestable
        items={stepStructure}
        renderItem={renderItem}
        maxDepth={3}
        renderCollapseIcon={renderCollapseIcon}
        onChange={onStepStructureOrderChange}
        collapsed
      />
      <Button className={classes.button} variant="contained" color="primary" onClick={addStep}>
        Add step
      </Button>
    </div>
  );
};

export default StepList;
