import React from 'react';
import { ListItem } from '../../../types/FormTypes';
import { Item } from 'react-nestable';
import Nestable from '../../../nestable/Nestable';
import { Button, createStyles, IconButton, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { ExpandMore, ExpandLess, Clear, FileCopy } from '@material-ui/icons';

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
  count?: number;
  deleteStep: (id: string) => void;
  copyStep: (id: string) => void;
  addStep: () => void;
  selectedStepId: string;
  selectStep: (id: string) => void;
  stepStructure: ListItem[];
  onStepStructureOrderChange: (items: ListItem[]) => void;
}

const StepList: React.FC<Props> = ({
  stepStructure,
  selectedStepId,
  deleteStep,
  copyStep,
  addStep,
  selectStep,
  onStepStructureOrderChange,
}: Props) => {
  const classes = useStyles();

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
