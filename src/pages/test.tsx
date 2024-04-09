import { useState } from 'react';
import { CharConfigSelector } from '../components/charConfigSelector';
import { PageFrame } from '../components/pageFrame';
import { CharConfig } from '../types/types';

export function PageTest() {
    const [charConfigs, setCharConfigs] = useState<CharConfig[]>([]);
    const [numPerCharConfigStr, setNumPerCharConfigStr] =
        useState<string>('10');
    const numPerCharConfig = parseInt(numPerCharConfigStr);
    const valid = !isNaN(numPerCharConfig);
    return (
        <PageFrame>
            <div css={{ height: '100%', display: 'flex' }}>
                <CharConfigSelector
                    selected={charConfigs}
                    onChange={setCharConfigs}
                />
                <div
                    css={{
                        flexGrow: 1,
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}
                >
                    <div>
                        <label>
                            Number of questions per characteristic config
                        </label>
                        <div className="form-group">
                            <input
                                type="text"
                                className={`form-control ${
                                    !valid ? 'is-invalid' : ''
                                }`}
                                placeholder="Number of questions per characteristic config"
                                value={numPerCharConfigStr}
                                onChange={(e) =>
                                    setNumPerCharConfigStr(e.target.value)
                                }
                            />
                            <div className="invalid-feedback">
                                Not a valid number.
                            </div>
                        </div>
                    </div>
                    <div>
                        Number of selected characteristic configs:{' '}
                        <strong>{charConfigs.length}</strong>
                    </div>
                    <div>
                        Total number of questions:{' '}
                        <strong>
                            {valid
                                ? charConfigs.length * numPerCharConfig
                                : '?'}
                        </strong>
                    </div>
                </div>
            </div>
        </PageFrame>
    );
}
