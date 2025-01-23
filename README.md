# Chat App - Real-time Chat with CometChat

This is a React chat application that enables users to chat with each other in real-time using CometChat.

**Features:**

* Login and logout functionality
* User list to view and select chat conversations
* Real-time chat with message sending and receiving
* Text and media message support (images, videos, and files)

**Getting Started**

1.  **Prerequisites:**

    * Node.js and npm (or yarn) installed on your system.
    * A CometChat Pro account and project created ([https://www.cometchat.com/](https://www.google.com/url?sa=E&source=gmail&q=https://www.cometchat.com/)).

2.  **Installation:**

    Clone this repository:

    ```bash
    git clone https://github.com/Omchaudhary2004/Chatapp.git
    ```

    Navigate to the project directory:

    ```bash
    cd chat-app
    ```

    Install dependencies:

    ```bash
    npm install
    ```

3.  **Configuration:**

    Create a file named `constants.js` in the project src directory and add the following environment variables:

    ```
    APP_ID: "From Comet Chat"
    REGION: "in", 
    AUTH_KEY: "From commet chat"
    ```

    Replace the placeholders with your actual CometChat App ID and Region.

4.  **Running the App:**

    Start the development server:

    ```bash
    npm start
    ```

    The app will be accessible at http://localhost:3000 by default.

**Tech Stack**

* React
* CometChat SDK
* JavaScript (ES6+)

**Project Structure**

chat-app/
├── components/
│   ├── ChatList.js
│   ├── Header.js
│   ├── LoginModal.js
│   ├── MessageInput.js
│   └── MessageList.js
├── hooks/
│   └── useCometChat.js
├── .env  # Environment variables
└── App.js


**Explanation of Key Components**

* `App.js`: The main application component that manages the overall chat app UI and state.
* `components`: This directory contains reusable React components for different parts of the chat UI (header, chat list, message list, message input, login modal).
* `hooks`: This directory contains custom React hooks for interacting with CometChat functionalities (e.g., user management, chat list fetching, message sending).
* `constants.js`: This file stores sensitive environment variables like CometChat App ID and Region.

**Deployment**

You can deploy this chat application to any platform that supports React applications. Refer to the CometChat documentation for server-side integration and deployment considerations specific to their platform.

**Further Development**

This is a basic chat application built with CometChat. You can extend it with additional features such as:

* Group chat functionality
* Private messaging
* File sharing options
* Chat history search
* User presence indicators
* Chat themes and customization


