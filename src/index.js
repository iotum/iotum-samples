import React, { Suspense } from 'react';
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import store from './components/ReduxStore.js';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/token-page/TokenPage.js"
import Menu from "./pages/menu-page/MenuPage.js";
import ErrorHandling from './pages/ErrorHandlingPage/ErrorHandling.js';
import './navigation/MenuPageButtons/MenuPageButtons.css';

// Using React.lazy to dynamically import the components
const ChatRoomListApp = React.lazy(() => import("./pages/chat-room-list/App.js"));
const ListWidgetUiApp = React.lazy(() => import('./pages/list-widget-ui/App.js'));
const SimpleMeetingApp = React.lazy(() => import("./pages/simple-meeting/App.js"));
const PopoutChatApp = React.lazy(() => import("./pages/popout-chat/App.js"));
const TabbedDashboardApp = React.lazy(() => import("./pages/tabbed-dashboard/App.js"));
const MeetingDevicesApp = React.lazy(() => import("./pages/meeting-devices/App.js"));

const router = createBrowserRouter([
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router}/>
      </Suspense>
    </Provider>
  </React.StrictMode>
);
