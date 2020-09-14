import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Notification } from '../../contexts/NotificationsContext';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Props {
  notifications: Notification[];
  removeNotification: (id: number) => void;
}

const Notifications: React.FC<Props> = ({ notifications, removeNotification }) => {
  return (
    <div>
      {notifications.map((n) => {
        return (
          <Snackbar key={n.id} open={true} autoHideDuration={6000} onClose={() => removeNotification(n.id)}>
            <Alert onClose={() => removeNotification(n.id)} severity={n.severity}>
              {n.message}
            </Alert>
          </Snackbar>
        );
      })}
    </div>
  );
};

export default Notifications;
