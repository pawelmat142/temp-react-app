# My React Firebase App

This project is a simple web application built with React and Tailwind CSS, featuring a login screen that utilizes Firebase Authentication. 

## Table of Contents

- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [License](#license)

## Technologies Used

- React
- Tailwind CSS
- Firebase Authentication
- TypeScript

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone https://github.com/yourusername/my-react-firebase-app.git
   cd my-react-firebase-app
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure Firebase:**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Add a web app to your project and copy the Firebase configuration.
   - Replace the configuration in `src/firebase/config.ts` with your Firebase project details.

4. **Run the application:**
   ```
   npm start
   ```

5. **Open your browser:**
   - Navigate to `http://localhost:3000` to view the application.

## Usage

- The application features a login form where users can enter their credentials to authenticate using Firebase.
- Upon successful login, users will be redirected to the main application interface.

## License

This project is licensed under the MIT License.