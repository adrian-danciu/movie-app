# MovieApp

MovieApp is a modern web application built using React with Vite, designed to provide a seamless experience for movie enthusiasts to explore, favorite, and manage movies. The application integrates Firebase for authentication and data storage, allowing users to register, login, update their profile, and maintain a list of favorite movies.

<img width="1755" alt="image" src="https://github.com/adrian-danciu/technical-assignment/assets/100218355/4e206788-0549-4e20-a58b-ffa8df564ad1">

## Features

- **User Authentication**: Users can register, log in, and log out. The application handles user authentication using Firebase, including features like password updates and session management.
- **Movie Browsing**: Users can browse movies listed as popular, upcoming, or based on specific queries.
- **Favorites Management**: Users can add or remove movies from their favorites list, which is accessible via their user profile.
- **Responsive Design**: Built with mobile and desktop compatibility in mind, ensuring a smooth user experience across all devices.
- **Dynamic Routing**: Utilizes React Router for navigation and dynamic URL handling, enhancing the browsing experience.

## Technical Stack

- **React**
- **Vite**
- **Firebase**
- **TailwindCss**


## Prerequisites

- Node.js (v18)
- npm (Node Package Manager)

## Setup Instructions

1. **Clone the Repository**

2. **Install Dependencies**
   Ensure that you are using Node.js version 18. You can use nvm (Node Version Manager) to manage multiple Node.js versions.

3. **Environment Variables**
   Create a .env file in the project root directory and fill it with the necessary Firebase configuration keys:
   
   VITE_API_KEY=your_api_key_here
   VITE_AUTH_DOMAIN=your_auth_domain_here
   VITE_PROJECT_ID=your_project_id_here
   VITE_STORAGE_BUCKET=your_storage_bucket_here
   VITE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
   VITE_APP_ID=your_app_id_here

4. **Start the development server**
    Run in the terminal the command "npm run dev" and the server will start on http:/localhost:5173

5. **App Flow**
**Registration and Login**: Users start by registering an account or logging in. They can update their passwords through their profile settings.
**Browsing Movies**: users can browse movies.
**Managing Favorites**: Users can add movies to their favorites list or remove them, which updates in real-time. Only registered users can use the favorites feature. 
