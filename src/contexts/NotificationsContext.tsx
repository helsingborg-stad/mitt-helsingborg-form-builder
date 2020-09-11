import React, { useReducer } from 'react';
import { createPortal } from 'react-dom';
import Notifications from '../components/general/NotificationsComponent';

type Severity = "success" | "info" | "warning" | "error" | undefined;

export interface Notification {
    id: number;
    autoHideDuration: number;
    severity: Severity;
    message: string;
}
const initialState: Notification[] = [] 
type ReducerAction = 
    { type: 'ADD', payload: Omit<Notification,"id"> } 
    | { type: 'REMOVE', payload: {id: number}} 
    | { type: 'REMOVE_ALL' }

export const notificationReducer = (state: Notification[], action: ReducerAction): Notification[] => {
    switch(action.type) {
        case 'ADD':
            const n: Notification = {
                id: (new Date()).valueOf(),
                ...action.payload
            } ;
            return [...state, n ];
        case 'REMOVE':
            return state.filter(t => t.id !== action.payload.id); 
        case 'REMOVE_ALL':
            return initialState;
        default:
            return state;
    }
}


interface Props {
  children: React.ReactNode;
}

interface NotificationContextType {
    showNotification: (message: string, severity: Severity) => void;
    removeNotification: (id: number) => void;
    clearAll: () => void;
}
const defaultVal = {
    showNotification: (m: string, severity: Severity) => {},
    removeNotification: (id: number) => {},
    clearAll: () => {},
}

const NotificationContext = React.createContext<NotificationContextType>(defaultVal);

export const NotificationProvider: React.FC<Props> = ({ children }: Props) => {
  const [notifications, dispatch] = useReducer(notificationReducer, initialState);

  const showNotification = (message: string, severity: Severity ) => {
      dispatch({type:'ADD', payload:{autoHideDuration: 6000, message, severity}});
  }

  const removeNotification = (id: number) => {
      dispatch({type:'REMOVE', payload:{id}});
  }
  const clearAll = () => { 
    dispatch({type:'REMOVE_ALL'});
  }
  return (
    <NotificationContext.Provider value={ {showNotification, removeNotification, clearAll} }>
      {children}

      {createPortal(<Notifications notifications={notifications} removeNotification={removeNotification} />, document.body)}
    </NotificationContext.Provider>
  );
};
export default NotificationContext;
