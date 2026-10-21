import { lazy } from 'react';
import { Switch, Route, Redirect } from 'wouter';
import Login from './pages/token-page/TokenPage';
import Menu from './pages/menu-page/MenuPage';
import ErrorHandling from './pages/ErrorHandlingPage/ErrorHandling';

// Using React.lazy to dynamically import the components
const ChatRoomListApp = lazy(() => import('./pages/chat-room-list/App'));
const ListWidgetUiApp = lazy(() => import('./pages/list-widget-ui/App'));
const SimpleMeetingApp = lazy(() => import('./pages/simple-meeting/App'));
const PopoutChatApp = lazy(() => import('./pages/popout-chat/App'));
const TabbedDashboardApp = lazy(() => import('./pages/tabbed-dashboard/App'));
const MeetingDevicesApp = lazy(() => import('./pages/meeting-devices/App'));

const AppRoutes = () => (
  <Switch>
    <Route path="/"><Login /></Route>
    <Route path="/menu"><Menu /></Route>
    <Route path="/chat-room-list"><ChatRoomListApp /></Route>
    <Route path="/list-widget-ui"><ListWidgetUiApp /></Route>
    <Route path="/simple-meeting"><SimpleMeetingApp /></Route>
    <Route path="/meeting-devices"><MeetingDevicesApp /></Route>
    <Route path="/popout-chat"><PopoutChatApp /></Route>
    <Route path="/tabbed-dashboard"><TabbedDashboardApp /></Route>
    <Route path="/error-handling"><ErrorHandling /></Route>
    <Route><Redirect to="/menu" replace /></Route>
  </Switch>
);

export default AppRoutes;
