import { useState } from 'react';
import './App.css';
import { CharConfigSelector } from './charConfigSelector';
import { Navbar } from './navbar';
import { CharConfig } from './types/types';

function App() {
    const [charConfigs, setCharConfigs] = useState<CharConfig[]>([]);
    return (
        <div className="App">
            <Navbar />
            <div
                className="content"
                style={{ display: 'flex', overflow: 'auto' }}
            >
                <CharConfigSelector
                    selected={charConfigs}
                    onChange={setCharConfigs}
                />
                <div style={{ borderLeft: '1px solid black', flexGrow: 1 }}>
                    sets
                </div>
            </div>
        </div>
    );
}

export default App;
