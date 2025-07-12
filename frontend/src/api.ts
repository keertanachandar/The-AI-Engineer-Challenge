import { ChatRequest } from './types';

// Configure API base URL for different environments
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export class ChatAPI {
  static async sendMessage(request: ChatRequest): Promise<ReadableStream<Uint8Array>> {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return response.body!;
  }

  static async healthCheck(): Promise<{ status: string }> {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.status}`);
    }
    return response.json();
  }
} 