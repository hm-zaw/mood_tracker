# Mood Tracker 😔➡️😊

A simple and intuitive web application to track your daily moods. Keep a record of your emotional well-being and visualize your mood changes over time.

## ✨ Features

* **Daily Mood Logging:** Easily add your mood for the current day.
* **Mood History:** View your previously recorded moods.
* **Persistent Storage:** Your mood records are securely stored and accessible anytime.
* **User-Friendly Interface:** A clean and straightforward design for easy navigation.

## 🚀 Tech Stack

* **Frontend Framework:** [Next.js](https://nextjs.org/)
* **Backend/Database:** [Firebase](https://firebase.google.com/) (Firestore for database, Authentication for user management)
* **Styling:** TailwindCss

## ⚙️ Installation & Setup

Follow these steps to get a local copy of the project up and running on your machine.

### Prerequisites

Make sure you have the following installed:

* Node.js (LTS version recommended)
* npm or yarn

### Steps

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/hm-zaw/mood_tracker.git](https://github.com/hm-zaw/mood_tracker.git)
    cd mood_tracker
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # OR
    yarn install
    ```

3.  **Set up Firebase Project:**
    * Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
    * Enable **Firestore Database** and **Authentication** (e.g., Email/Password provider).
    * Register a new web app within your Firebase project to get your configuration details.

4.  **Configure Environment Variables:**
    Create a `.env.local` file in the root of your project and add your Firebase configuration details:

    ```
    NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
    NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=YOUR_FIREBASE_MEASUREMENT_ID # Optional
    ```
    *Replace `YOUR_FIREBASE_...` with your actual Firebase project credentials.*

5.  **Run the development server:**
    ```bash
    npm run dev
    # OR
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Demo Link: [https://moodoshii.netlify,app](https://moodoshii.netlify.app)
![image](https://github.com/user-attachments/assets/795b016c-12f4-40e2-bb16-89523b88e385)

Created by HMZ 🩷
