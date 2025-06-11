# 🏈 Sport Prediction App

A mobile app built with Expo and React Native to simulate live game predictions with polling and mock APIs.

## ✨ Features

- Expo Router for seamless navigation
- Tailwind CSS via NativeWind for styling
- Context API for theme & user state
- Live polling to simulate real-time updates
- Reusable components (`GameCard`, `Typography`)
- Support for light/dark themes
- Type-safe with TypeScript
- Optimized performance via FlatList & memoization

## 📦 Tech Stack

- Expo (React Native)
- TypeScript
- NativeWind (Tailwind)
- React Context API
- Expo Router
- React Native SVG

## 📱 Screens

- Dashboard with game list (filter by status)
- Game detail screen with prediction buttons
- Profile screen with user picks and stats

## 🧪 Local Setup

```bash
git clone git@github.com:smart0120/react-native-assessment.git
cd sports-prediction-app

# Install dependencies
npm install

# Start Expo dev server
npx expo start

📂 Project Structure
/app
  /(tabs)
    game/[id].tsx   # Game detail screen
    index.tsx       # Dashboard
  /components       # UI components
  /context          # Theme & user providers
  /hooks            # useGames, etc.
  /models           # TypeScript models
  /services         # Mock APIs
  /utils            # Mock DB
/global.css         # Tailwind entry
/metro.config.js    # Metro config with NativeWind + SVG support

🔮 Future Plans
Real backend with Firebase/Supabase
Prediction analytics
Admin dashboard to add matches
Leaderboards
```
