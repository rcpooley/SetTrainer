import { useState } from 'react';
import { CharConfigSelector } from '../components/charConfigSelector';
import { Input } from '../components/input';
import { PageFrame } from '../components/pageFrame';
import { CharConfig } from '../types/types';

export function PageTest() {
    const [charConfigs, setCharConfigs] = useState<CharConfig[]>([]);
    const [numPerCharConfig, setNumPerCharConfig] = useState<number | null>(10);
    const [millisBetween, setMillisBetween] = useState<number | null>(1000);
    const valid = numPerCharConfig !== null && millisBetween !== null;
    return (
        <PageFrame>
            <div>
                Number of selected characteristic configs:{' '}
                <strong>{charConfigs.length}</strong>
            </div>
            <CharConfigSelector
                selected={charConfigs}
                onChange={setCharConfigs}
                allNone
            />
            <Input
                type="int"
                label="Number of questions per characteristic config"
                value={numPerCharConfig}
                onChange={setNumPerCharConfig}
                placeholder="Number of questions per characteristic config"
            />
            <Input
                type="int"
                label="Milliseconds between questions"
                value={millisBetween}
                onChange={setMillisBetween}
                placeholder="Milliseconds between questions"
            />
            <div>
                Total number of questions:{' '}
                <strong>
                    {numPerCharConfig !== null
                        ? charConfigs.length * numPerCharConfig
                        : '?'}
                </strong>
            </div>
            <div css={{ display: 'flex', justifyContent: 'center' }}>
                <button className="btn btn-primary" disabled={!valid}>
                    Begin
                </button>
            </div>
        </PageFrame>
    );
}
