import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import { Help } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
    },
    popper: {
      maxWidth: '300px',
    },
  }),
);

interface Props {
  text: string;
  style?: React.CSSProperties;
}

const HelpPopper: React.FC<Props> = ({ text, style }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;

  return (
    <div style={style}>
      <IconButton aria-describedby={id} type="button" onClick={handleClick}>
        <Help />
      </IconButton>
      <Popper id={id} open={open} anchorEl={anchorEl} placement="right" transition className={classes.popper}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <div className={classes.paper}>{text}</div>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default HelpPopper;
