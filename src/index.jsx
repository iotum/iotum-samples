import React, { Suspense, lazy } from 'react';
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from './components/ReduxStore';
import Login from "./pages/token-page/TokenPage"
import Menu from "./pages/menu-page/MenuPage";
import ErrorHandling from './pages/ErrorHandlingPage/ErrorHandling';
import './navigation/MenuPageButtons/MenuPageButtons.css';

const createRouter = () => {
  // Using React.lazy to dynamically import the components
  const ChatRoomListApp = lazy(() => import("./pages/chat-room-list/App"));
  const ListWidgetUiApp = lazy(() => import('./pages/list-widget-ui/App'));
  const SimpleMeetingApp = lazy(() => import("./pages/simple-meeting/App"));
  const PopoutChatApp = lazy(() => import("./pages/popout-chat/App"));
  const TabbedDashboardApp = lazy(() => import("./pages/tabbed-dashboard/App"));
  const MeetingDevicesApp = lazy(() => import("./pages/meeting-devices/App"));

  return createBrowserRouter([
    {
      path: "/iotum-samples",
      element: <Login />,
    },
    {
      path: "/iotum-samples/menu",
      element: <Menu />,
    },
    {
      path: "/iotum-samples/chat-room-list",
      element: <ChatRoomListApp />
    },
    {
      path: "/iotum-samples/list-widget-ui",
      element: <ListWidgetUiApp />
    },
    {
      path: "/iotum-samples/simple-meeting",
      element: <SimpleMeetingApp />
    },
    {
      path: "/iotum-samples/meeting-devices",
      element: <MeetingDevicesApp />
    },
    {
      path: "/iotum-samples/popout-chat",
      element: <PopoutChatApp />
    },
    {
      path: "/iotum-samples/tabbed-dashboard",
      element: <TabbedDashboardApp />
    },
    {
      path: "/iotum-samples/error-handling",
      element: <ErrorHandling />
    },
  ]);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={createRouter()}/>
      </Suspense>
    </Provider>
  </React.StrictMode>
);
