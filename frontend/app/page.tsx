"use client";
import { useState } from 'react';

export default function Home() {
  const [developerMessage, setDeveloperMessage] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [apiKey, setApiKey] = useState(''); // Add this line
  const [response, setResponse] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResponse('');
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ developer_message: developerMessage, user_message: userMessage })
    });
    if (!res.body) return;
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      setResponse((prev) => prev + decoder.decode(value));
    }
  }

  return (
    <div className="container">
      <h1>AI Engineer Challenge</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Developer message"
          value={developerMessage}
          onChange={(e) => setDeveloperMessage(e.target.value)}
          required
          style={{ minHeight: '80px' }}
        />
        <textarea
          placeholder="User message"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          required
          style={{ minHeight: '80px' }}
        />
        <input
          type="password"
          placeholder="OpenAI API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
      {response && (
        <div className="response">
          <h2>Response:</h2>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
}