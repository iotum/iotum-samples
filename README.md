# iotum Sample Apps

## Overview
Explore the capabilities of iotum SDK products through this sample application. 

Access the app here: [iotum Sample Apps](https://iotum.github.io/iotum-samples/). 

### Below is a brief description of each sample:

- **Tabbed dashboard**: [View Sample](https://github.com/iotum/iotum-samples/tree/main/src/pages/tabbed-dashboard)

   This sample shows how to integrate one or more of iotum's features into your application using tabs. The user lands on the 'parent' application page, which would be a home or calling page, and this has additional tabs for 'Meetings', 'Team Chat', 'Drive', and 'Contacts'. The iotum applications sit inside tabs to look and feel like part of the parent app. When a user clicks on 'Team Chat' for example, our widget renders.

- **Chat room list**: [View Sample](https://github.com/iotum/iotum-samples/tree/main/src/pages/chat-room-list)

   In this sample, the 'Team Chat' navigation will show as a strip in a narrow sidebar. Users can then select an individual chat 'room' (channel or DM) that will open in a floating window inside their application. The size and location of each floating window can be customized and the sidebar can be hidden or shown as required. This is a very flexible way of integrating the chat widget into another application.

- **Simple Meeting**: [View Sample](https://github.com/iotum/iotum-samples/tree/main/src/pages/simple-meeting)

   This sample is an example of one of our most common integrations. This meeting widget can be used for almost any kind of application, from telehealth to a standard video call. The developer initiates a meeting for the user inside a container that can be controlled in a myriad of ways. This could be a floating window, in a tab, or a particular section of the page. The size, shape, and location are fully customizable.

- **List widget**: [View Sample](https://github.com/iotum/iotum-samples/tree/main/src/pages/list-widget-ui)

   In this sample, the parent application is in full control of how the user gets to the chat room. The user will perhaps see a list of contacts with a chat icon next to each name instead of seeing the 'Team Chat' sidebar UI. After clicking on that icon, a container will open with the chat conversation displayed. This container could be a floating window or could fill a large section of the window. The size, shape, and location are fully customizable. This is useful if you want to control how a user gets into a specific chat room with different people.

- **Popout chat**: [View Sample](https://github.com/iotum/iotum-samples/tree/main/src/pages/popout-chat)

   This sample shows two distinct options. The first is that a user can access 'Team Chat' via a button that could be located anywhere on the parent application and have the unread message count synced so that they know if there are new messages to read. The second is that this shows how the widget can pop out into another tab or window where that is the desired user experience.

   This app also shows how the parent app can display the number of unread messages and keep it up to date. This unread message badge could be added to a button or tab in the parent app.

- **Devices in Meeting**: [View Sample](https://github.com/iotum/iotum-samples/tree/main/src/pages/popout-chat)

   This sample shows how to manage media devices in meeting widget from the host page.


## Getting Started with the Application

### Logging In:
1. **Choosing the Domain**:
   - Select your desired domain.

2. **Entering SSO Token and Host ID**:
   - Input your SSO token and host ID.
   - Click on `Submit` to proceed.

3. **Entering the Access Code**:
   - For the Simple Meeting Sample App, an access code is required. The access code is the conference number found in the `Meet` dashboard.  
    
4. **Using the Application**:
   - Once logged in, you're ready to explore the various features of the iotum product suite through the Menu page.

> **Note:** For guidance on retrieving the SSO Token and Host ID via Postman, refer to the project's [Postman Documentation](https://github.com/iotum/iotum-samples/wiki/Get-SSO-Token-and-Host-ID-from-Postman).

### Running a Sample App Locally:
1. Modify your system's hosts file, map your dev domain to `127.0.0.1`.
   - The default domain is `localhost.callbridge.com`
   - You can set your own domain in [.env file](https://github.com/iotum/iotum-samples/tree/main/.env)
   - The domain must be whitelisted to be allowed the widget domain.
   - HTTPS is required for widget to work.

2. Install [Node.js](https://nodejs.org/en).

3. On Windows, install [Git](https://git-scm.com/downloads).
4. Clone the repository: `git clone https://github.com/iotum/iotum-samples.git`.
5. Run `npm install` in the terminal or Git Bash.
6. Start the web app with `npm start`.

## Publishing a Sample App to GitHub Pages 
- The Sample App utilizes a GitHub Actions Workflow script for automatic build and deployment. Pushing changes to the main branch will automatically update the GitHub Pages site.
