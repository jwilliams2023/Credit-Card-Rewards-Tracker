# Credit Card Rewards Tracker

A web application built with React and firebase to help users track their progress towards meeting credit card goals. Users can input their spending target and monthly spend to visualize how long it will take to reach the target along with interactive radial progress bars.

## Features

- **Radial Progress Bars**: Visualize monthly progress towards reaching the credit card signup bonus.
- **Last Month Highlight**: The final month of progress is highlighted in green to indicate completion.
- **Dark Mode Toggle**: Switch between light and dark themes for a better user experience.
- **Real-Time Calculation**: Automatically updates the time required to reach the goal based on spending target and monthly spend.
- **Built with Vite and React**: Fast development environment and modern frontend framework.

## Live Demo

The application is deployed on Netlify. You can access it here:

**[Credit Card Rewards Tracker - Live Demo](https://ccrewards.netlify.app/)**

## Technologies Used

- **Vite**: For fast, modern development and build tooling.
- **React**: Used for building dynamic user interfaces and managing state.
- **Firebase**: Used to handle backend database functionalities, user authentication through OAuth, and data management using document-based Firestore.
- **Tailwind CSS + DaisyUI**: For responsive, customizable styling.

### Firebase Documentation
- Learn more about Firebase and its services: [Firebase Docs](https://firebase.google.com/docs)

## Getting Started

### Prerequisites

- Node.js and npm should be installed on your machine.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/Credit-Card-Rewards-Tracker.git
    ```

2. Navigate into the project directory:
    ```bash
    cd Credit-Card-Rewards-Tracker
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```

### Running the Application

1. Start the Vite development server:
    ```bash
    npm run dev
    ```

2. Open your browser and go to `http://localhost:3000` (or the port Vite outputs) to view the app.

## How to Use

1. Input your **Spending Target**
2. Input your **Monthly Spend**
3. The application will calculate how long it will take to reach your goal and display progress for each month in radial progress bars.
4. Toggle between **Dark Mode** and **Light Mode** for a customized user experience.
5. Add new cards to track multiple bonuses.

## In Progress

- **Credit Score Calculation**: Adding a feature to allow users to calculate and track their credit score as part of their financial planning.
- **UI/UX Improvements**: Enhancing the overall user interface to make navigation and user experience smoother and more intuitive.
- 

## Future Features

- **Simple Backend Database**: Implementing a persistent backend database using Firebase Firestore to store and track active signup bonuses across multiple credit cards. This will allow users to keep track of their progress over time, rather than relying solely on local storage. Additionally, user authentication through Google OAuth will enable secure access to user data.

## Documentation

- Vite documentation: [Vite Docs](https://vitejs.dev/guide/)
- React documentation: [React Docs](https://reactjs.org/docs/getting-started.html)
- Firebase documentation: [Firebase Docs](https://firebase.google.com/docs)
- Tailwind CSS + DaisyUI documentation: [DaisyUI Docs](https://daisyui.com/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
