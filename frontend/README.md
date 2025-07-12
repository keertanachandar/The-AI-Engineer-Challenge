# 🤖 AI Chat Frontend

A beautiful, modern React frontend for your AI chat application! This sleek interface connects seamlessly with your FastAPI backend to provide a smooth chatting experience with OpenAI's GPT models.

## ✨ Features

- **Real-time Streaming**: Watch AI responses appear in real-time as they're generated
- **Modern UI/UX**: Beautiful gradient design with glassmorphism effects
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Secure API Key Input**: Password field for safe API key entry
- **Customizable System Messages**: Set the AI's behavior and personality
- **Error Handling**: Graceful error display and recovery
- **Auto-scroll**: Messages automatically scroll to keep you in the conversation

## 🚀 Quick Start

### Prerequisites

Make sure you have Node.js installed (version 16 or higher). You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` and start chatting! 🎉

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

### Backend Integration

The frontend is configured to proxy API requests to your FastAPI backend running on `localhost:8000`. Make sure your backend is running before testing the frontend!

## 🎨 Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Lucide React** - Beautiful icons
- **CSS3** - Custom styling with modern effects

## 📱 Usage

1. **Enter your OpenAI API key** in the secure password field
2. **Customize the system message** to define the AI's behavior
3. **Type your message** and hit send (or press Enter)
4. **Watch the AI respond** in real-time streaming!

## 🔒 Security Notes

- Your API key is never stored locally - it's only used for API requests
- All communication with the backend is done through secure HTTP requests
- The interface uses password fields to keep your API key hidden

## 🛠️ Troubleshooting

**Frontend won't start?**
- Make sure Node.js is installed
- Try deleting `node_modules` and running `npm install` again

**Can't connect to backend?**
- Ensure your FastAPI backend is running on port 8000
- Check that CORS is properly configured in your backend

**API key not working?**
- Verify your OpenAI API key is valid
- Make sure you have sufficient credits in your OpenAI account

## 🎯 Next Steps

Ready to deploy? Build the production version with:
```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment to any static hosting service!

---

Happy chatting! 🤖✨