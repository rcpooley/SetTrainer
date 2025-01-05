import { useMemo, useState } from 'react';
import { CharConfigSelector } from '../components/charConfigSelector';
import { PageFrame } from '../components/pageFrame';
import { SetRenderer } from '../components/setRenderer';
import { CharConfig, TSet } from '../types/types';
import { SetUtil } from '../util/setUtil';
import { Util } from '../util/util';

export function PageExplorer() {
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
        <PageFrame>
            <div css={{ display: 'flex', height: '100%' }}>
                {!collapse && (
                    <CharConfigSelector
                        selected={charConfigs}
                        onChange={setCharConfigs}
                        css={{
                            width: '300px',
                            overflow: 'auto',
                            paddingBottom: '10px',
                        }}
                        centered
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
                    {sets.map((set, idx) => (
                        <SetRenderer key={idx} set={set} />
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
        </PageFrame>
    );
}
