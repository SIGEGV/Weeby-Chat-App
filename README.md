# Weeby Chat App
Welcome to Weeby Chat App! This is a full-stack chat application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack.

# Features
- Real-time messaging: Chat instantly with other users in real-time.
- User authentication: Securely sign up and log in to access the chat features.
- Group chat: Create and join group chats with multiple participants.
- Typing indicators: See when other users are typing a message.
# Demo
Check out the live demo: https://weeby.netlify.app

# Screenshots





# Technologies Used
- Frontend: React.js, Socket.IO, Chakra UI, Firebase
- Backend: Node.js, Express.js, MongoDB
- Deployment: Netlify (Frontend), Render (Backend)
# Installation
To run this project locally, follow these steps:

1. Clone the repository:
    - https://github.com/SIGEGV/sociopedia
    - Navigate to the project directory:

2. Install dependencies(Frontend):
    - npm install
    - npm start

3. Install dependencies(Backend):
    - npm install
    - nodemon server.js

4. Setting up Backend:
     -In server.js go to line 36 and change it to app.use(cors()) and on line 74 update origin with your frontend local host url.
     -In Backend  go to the .env file and set your Own environment variables.

6. Setting up Frontend:
    - Go to package.json and update the value of proxy to the local host url  of your backend.
    - frontend/src/components/SingleChats  go to line 12 and update your  ENDPOINT to the backend local host.

7. Deployment
This project is deployed using Netlify for the frontend and Render for the backend. Automatic deployments are triggered on each commit to the main branch.

Contributing
Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

License
This project is licensed under the GNU GENERAL PUBLIC LICENSE - see the LICENSE file for details.

