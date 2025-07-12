# 🚀 Deploying FastAPI to Vercel

This guide will walk you through deploying your FastAPI application to Vercel's serverless platform.

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI**: Install with `npm i -g vercel`
3. **Git Repository**: Your code should be in a Git repository

## 🔧 Configuration Files

### 1. Root `vercel.json` (Monorepo Setup)

```json
{
  "version": 2,
  "builds": [
    { "src": "frontend/package.json", "use": "@vercel/next" },
    { 
      "src": "api/app.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    { 
      "src": "/api/(.*)", 
      "dest": "api/app.py"
    },
    { 
      "src": "/(.*)", 
      "dest": "frontend/$1"
    }
  ]
}
```

### 2. API `vercel.json` (API-specific)

```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "app.py"
    },
    {
      "src": "/(.*)",
      "dest": "app.py"
    }
  ],
  "functions": {
    "app.py": {
      "maxDuration": 30
    }
  }
}
```

### 3. `requirements.txt`

```txt
fastapi==0.115.12
uvicorn==0.34.2
openai==1.77.0
pydantic==2.11.4
python-multipart==0.0.18
python-json-logger==2.0.7
```

## 🚀 Deployment Steps

### Option 1: Deploy via Vercel Dashboard

1. **Push to GitHub**: Ensure your code is in a GitHub repository
2. **Connect to Vercel**: 
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
3. **Configure Build Settings**:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (for monorepo) or `./api` (for API only)
   - **Build Command**: Leave empty (Vercel auto-detects)
   - **Output Directory**: Leave empty
4. **Environment Variables**: Add any required environment variables
5. **Deploy**: Click "Deploy"

### Option 2: Deploy via CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project root**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new
   - Set project name
   - Confirm deployment

### Option 3: Deploy API Only

If you want to deploy just the API:

```bash
cd api
vercel
```

## 🔧 Important FastAPI Modifications for Vercel

### 1. Add Root Endpoint

```python
@app.get("/")
async def root():
    return {"message": "OpenAI Chat API is running!"}
```

### 2. CORS Configuration

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 3. Streaming Response Handling

Vercel supports streaming responses, but with some limitations:

```python
@app.post("/api/chat")
async def chat(request: ChatRequest):
    # Your streaming logic here
    return StreamingResponse(generate(), media_type="text/plain")
```

## 🌐 Environment Variables

Set these in your Vercel dashboard:

- `OPENAI_API_KEY`: Your OpenAI API key (if you want to use a default)
- Any other environment variables your app needs

## 🔍 Testing Your Deployment

### 1. Health Check
```bash
curl https://your-app.vercel.app/api/health
```

### 2. Chat Endpoint
```bash
curl -X POST https://your-app.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "developer_message": "You are a helpful assistant.",
    "user_message": "Hello!",
    "api_key": "your-openai-api-key"
  }'
```

## 🛠️ Troubleshooting

### Common Issues

1. **Import Errors**: Make sure all dependencies are in `requirements.txt`
2. **CORS Errors**: Check that CORS middleware is properly configured
3. **Timeout Issues**: Increase `maxDuration` in `vercel.json`
4. **Route Not Found**: Verify route configuration in `vercel.json`

### Debug Commands

```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs

# Redeploy
vercel --prod
```

## 📱 Frontend Integration

After deploying your API, update your frontend's API base URL:

```typescript
// In frontend/src/api.ts
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-api.vercel.app/api'
  : '/api';
```

## 🎯 Best Practices

1. **Environment Variables**: Never commit API keys to Git
2. **Error Handling**: Implement proper error responses
3. **Logging**: Use structured logging for debugging
4. **Rate Limiting**: Consider implementing rate limiting
5. **Security**: Validate all inputs and sanitize outputs

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to your main branch. For other branches:

1. Push to a feature branch
2. Vercel creates a preview deployment
3. Test the preview URL
4. Merge to main for production deployment

## 📊 Monitoring

- **Vercel Dashboard**: Monitor deployments and performance
- **Function Logs**: View serverless function logs
- **Analytics**: Track usage and performance metrics

---

Your FastAPI app is now ready for Vercel deployment! 🚀 