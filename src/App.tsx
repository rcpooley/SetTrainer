import { useMemo, useState } from 'react';
import { CharConfigSelector } from './components/charConfigSelector';
import { SetRenderer } from './components/setRenderer';
import { Navbar } from './navbar';
import { CharConfig, TSet } from './types/types';
import { SetUtil } from './util/setUtil';
import { Util } from './util/util';

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
        <div
            css={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Navbar />
            <div css={{ display: 'flex', overflow: 'auto', flexGrow: 1 }}>
                {!collapse && (
                    <CharConfigSelector
                        selected={charConfigs}
                        onChange={setCharConfigs}
                    />
                )}
                <div
                    css={{
                        borderLeft: '1px solid black',
                        flexGrow: 1,
                        overflow: 'auto',
                        paddingLeft: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}
                >
                    <div css={{ fontWeight: 'bold', fontSize: '20px' }}>
                        {sets.length} set{Util.plural(sets.length)}
                    </div>
                    {sets.map((set) => (
                        <SetRenderer set={set} />
                    ))}
                    <div
                        css={{
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
                        <span css={{ position: 'relative', top: '-2px' }}>
                            {collapse ? '>' : '<'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
