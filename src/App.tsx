import { useMemo, useState } from 'react';
import './App.css';
import { CharConfigSelector } from './components/charConfigSelector';
import { Navbar } from './navbar';
import { CharConfig, TSet } from './types/types';
import { SetUtil } from './setUtil/setUtil';
import { SetRenderer } from './components/setRenderer';
import { Util } from './util';

function App() {
    const [charConfigs, setCharConfigs] = useState<CharConfig[]>([]);
    const [collapse, setCollapse] = useState<boolean>(false);
    const sets: TSet[] = useMemo(() => {
        let sets: TSet[] = [];
        for (const config of charConfigs) {
            sets = sets.concat(SetUtil.getSetsForCharConfig(config));
        }
        return sets;
    }, [charConfigs]);
    return (
        <div className="App">
            <Navbar />
            <div
                className="content"
                style={{ display: 'flex', overflow: 'auto' }}
            >
                {!collapse && (
                    <CharConfigSelector
                        selected={charConfigs}
                        onChange={setCharConfigs}
                    />
                )}
                <div
                    style={{
                        borderLeft: '1px solid black',
                        flexGrow: 1,
                        overflow: 'auto',
                        paddingLeft: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}
                >
                    <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
                        {sets.length} set{Util.plural(sets.length)}
                    </div>
                    {sets.map((set) => (
                        <SetRenderer set={set} />
                    ))}
                    <div
                        style={{
                            position: 'fixed',
                            bottom: '3px',
                            cursor: 'pointer',
                            border: '1px solid black',
                            width: '25px',
                            height: '25px',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                        onClick={() => setCollapse(!collapse)}
                    >
                        <span style={{ position: 'relative', top: '-2px' }}>
                            {collapse ? '>' : '<'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
