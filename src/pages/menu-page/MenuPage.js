// Menu.js
import React from 'react';
import './MenuPage.css';
import MenuPageButton from '../../navigation/MenuPageButtons/MenuPageButton.js';
import TokenButton from '../../navigation/TokenButton/TokenButton.js';
import useGuardedRoute from '../../components/hooks/useGuardedRoute.js';

const Menu = () => {
  const isAuthenticated = useGuardedRoute();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="menu-container">
      <h1>iotum Sample Apps</h1>
      <menu>
        <li>
          <MenuPageButton text="Tabbed Dashboard" path="/iotum-samples/tabbed-dashboard" />
          <p>
            This sample shows how to integrate one or more of iotum’s features into your application using tabs. The user lands on the ‘parent’ application page, which would be a home or calling page, and this has three additional tabs for ‘Team Chat’, ‘Drive’, and ‘Contacts’. The iotum applications sit inside tabs to look and feel like part of the parent app. When a user clicks on ‘Team Chat’ for example, our widget renders.
          </p>
        </li>
        <li>
          <MenuPageButton text="Chat Room List" path="/iotum-samples/chat-room-list" />
          <p>
            In this sample, the ‘Team Chat’ navigation will show as a strip in a narrow sidebar. Users can then select an individual chat ‘room’ (channel or DM) that will open in a floating window inside their application. The size and location of each floating window can be customized and the sidebar can be hidden or shown as required. This is a very flexible way of integrating the chat widget into another application.
          </p>
        </li>
        <li>
          <MenuPageButton text="Simple Meeting" path="/iotum-samples/simple-meeting" />
          <p>
            This sample is an example of one of our most common integrations. This meeting widget can be used for almost any kind of application, from telehealth to a standard video call. The developer initiates a meeting for the user inside a container that can be controlled in a myriad of ways. This could be a floating window, in a tab, or a particular section of the page. The size, shape, and location are fully customizable.
          </p>
        </li>
        <li>
          <MenuPageButton text="Chat Room List UI" path="/iotum-samples/list-widget-ui" />
          <p>
            In this sample, the parent application is in full control of how the user gets to the chat room. The user will perhaps see a list of contacts with a chat icon next to each name instead of seeing the ‘Team Chat’ sidebar UI. After clicking on that icon, a container will open with the chat conversation displayed. This container could be a floating window or could fill a large section of the window. The size, shape, and location are fully customizable. This is useful if you want to control how a user gets into a specific chat room with different people.
          </p>
        </li>
        <li>
          <MenuPageButton text="Popout Chat" path="/iotum-samples/popout-chat" />
          <p>
            This sample shows two distinct options. The first is that a user can access ‘Team Chat’ via a button that could be located anywhere on the parent application and have the unread message count synced so that they know if there are new messages to read. The second is that this shows how the widget can pop out into another tab or window where that is the desired user experience. This app also shows how the parent app can display the number of unread messages and keep it up to date.  This unread message badge could be added to a button or tab in the parent app.
          </p>
        </li>
        <li>
          <MenuPageButton text="Devices in Meeting" path="/iotum-samples/meeting-devices" />
          <p>
            This sample manages the media devices in meeting widget from the host page.
          </p>
        </li>
      </menu>
      <TokenButton position="left" />
    </div>
  );
};

export default Menu;
