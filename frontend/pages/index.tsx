import { useState } from 'react';

export default function Home() {
  const [developerMessage, setDeveloperMessage] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [response, setResponse] = useState('');
  const [apiKey, setApiKey] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResponse('');
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ developer_message: developerMessage, user_message: userMessage, api_key: apiKey })
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
    <div style={{ padding: '2rem', backgroundColor: '#1a1a2e', minHeight: '100vh', color: '#f0f0f0' }}>
      <h1 style={{ color: '#64ffda' }}>AI Engineer Challenge</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 600 }}>
        <textarea placeholder="Developer message" value={developerMessage} onChange={(e) => setDeveloperMessage(e.target.value)} required style={{ minHeight: '80px' }} />
        <textarea placeholder="User message" value={userMessage} onChange={(e) => setUserMessage(e.target.value)} required style={{ minHeight: '80px' }} />
        <input type="password" placeholder="OpenAI API Key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} required />
        <button type="submit" style={{ backgroundColor: '#64ffda', color: '#1a1a2e', padding: '0.5rem', border: 'none', cursor: 'pointer' }}>Send</button>
      </form>
      {response && (
        <div style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
          <h2 style={{ color: '#64ffda' }}>Response</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
