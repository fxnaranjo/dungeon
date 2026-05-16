# 🏰 TOMAS-DUNGEON 🏰

A fun, colorful board game designed for young children (ages 4-8). Race to the finish line by rolling the dice and moving your character!

## 🎮 Game Features

- **1-4 Players**: Play alone or with friends on the same device
- **3 Fun Characters**: Choose from Giant Squid 🦑, Cad 🐱, or Milo the Dog 🐕
- **20 Colorful Squares**: A vibrant rainbow path to the goal
- **Easy Controls**: Large buttons and simple one-click gameplay
- **Exciting Animations**: Bouncing characters, rolling dice, and confetti celebrations!

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Run Locally

1. **Navigate to the client directory**:
   ```bash
   cd client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and go to:
   ```
   http://localhost:5173
   ```

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

1. **Build and run the container**:
   ```bash
   docker-compose up -d
   ```

2. **Access the game**:
   ```
   http://localhost:3000
   ```

3. **Stop the container**:
   ```bash
   docker-compose down
   ```

### Using Docker Directly

1. **Build the image**:
   ```bash
   docker build -t tomas-dungeon .
   ```

2. **Run the container**:
   ```bash
   docker run -d -p 3000:3000 --name tomas-dungeon-game tomas-dungeon
   ```

3. **Access the game**:
   ```
   http://localhost:3000
   ```

4. **Stop the container**:
   ```bash
   docker stop tomas-dungeon-game
   docker rm tomas-dungeon-game
   ```

## 🎯 How to Play

1. **Choose Number of Players**: Click on 1, 2, 3, or 4
2. **Enter Player Names**: Type each player's name
3. **Pick Characters**: Click on your favorite character
4. **Roll the Dice**: Click the big dice when it's your turn
5. **Move Your Character**: Watch your character bounce to the new square
6. **Reach the Goal**: First player to square 20 wins! 🏆

## 🎨 Kid-Friendly Design

- ✅ Large, colorful buttons (easy to click)
- ✅ Big, clear text (easy to read)
- ✅ Fun animations (keeps kids engaged)
- ✅ Simple one-click actions (no complex controls)
- ✅ Touch-friendly (works on tablets)
- ✅ Bright, cheerful colors
- ✅ No reading required (icons guide gameplay)

## 📁 Project Structure

```
tomas-dungeon/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # Game components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── styles/           # CSS files
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   └── package.json
├── Dockerfile                 # Docker configuration
├── docker-compose.yml         # Docker Compose setup
└── README.md                  # This file
```

## 🛠️ Technology Stack

- **Frontend**: React 18 + Vite
- **Styling**: CSS3 with animations
- **Containerization**: Docker
- **Server**: Serve (static file server)

## 🌐 Deploying to Cloud

### Deploy to any cloud platform that supports Docker:

1. **Build the Docker image**
2. **Push to a container registry** (Docker Hub, AWS ECR, etc.)
3. **Deploy to your cloud platform**:
   - AWS ECS/Fargate
   - Google Cloud Run
   - Azure Container Instances
   - DigitalOcean App Platform
   - Heroku Container Registry

### Example: Deploy to Cloud Run (Google Cloud)

```bash
# Build and tag the image
docker build -t gcr.io/YOUR-PROJECT-ID/tomas-dungeon .

# Push to Google Container Registry
docker push gcr.io/YOUR-PROJECT-ID/tomas-dungeon

# Deploy to Cloud Run
gcloud run deploy tomas-dungeon \
  --image gcr.io/YOUR-PROJECT-ID/tomas-dungeon \
  --platform managed \
  --port 3000 \
  --allow-unauthenticated
```

## 🎉 Features

- ✨ Colorful, animated game board
- 🎲 Interactive dice with rolling animation
- 🏃 Smooth character movement
- 🎊 Confetti celebration for winners
- 📱 Responsive design (works on all devices)
- 🎨 Kid-friendly interface
- 🚀 Fast and lightweight
- 🐳 Easy Docker deployment

## 📝 Game Rules

- Players take turns rolling the dice
- Move your character the number of squares shown on the dice
- First player to reach square 20 (the goal) wins
- Have fun! 🎉

## 🤝 Contributing

This is a fun project for kids! Feel free to:
- Add more characters
- Create different board layouts
- Add sound effects
- Implement power-ups or special squares

## 📄 License

This project is open source and available for educational purposes.

## 🎮 Enjoy the Game!

Have fun playing TOMAS-DUNGEON! Perfect for family game nights, classrooms, or just having fun with friends! 🎉

---

Made with ❤️ for kids who love games!