import React, { useState } from 'react';
import './App.scss';
import { getTokens } from './service/getTokens'
import { getIcons } from './service/getIcons'
import { Tokens } from './Tokens'

function App() {

  const [figmaApiKey, setToken] = useState('50143-4b363922-284f-4848-ad10-aa2f162635b5');
  const [figmaId, setFigmaId] = useState('EkIFVk7H8mg8gbTuGdZFVE');
  const [data, setData] = useState({});
  const [icons, setIcons] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const data = await getTokens(figmaApiKey, figmaId)
      const icons = await getIcons(figmaApiKey, figmaId)

      setData(data)
      setIcons(icons)
      setLoading(false)
    }
    catch (err) {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <label htmlFor="token">Figma Token</label>
            <input type="text" name="token" id="token" placeholder="Digite o seu token"
              onChange={e => setToken(e.target.value)}
              value={figmaApiKey}
            />
          </div>

          <div className="form-input">
            <label htmlFor="figmaId">Figma ID</label>
            <input type="text" name="figmaId" id="figmaId" placeholder="Digite o seu ID"
              onChange={e => setFigmaId(e.target.value)}
              value={figmaId}
            />
          </div>
          <div className="form-submit">
            <input type="submit" value={loading ? '...' : 'ENVIAR'} />
          </div>
        </form>
      </div>

      <div className="tokens-container">
        <Tokens tokens={data} icons={icons} />
      </div>
    </>
  );
}

export default App;
