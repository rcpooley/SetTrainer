import { useMemo } from 'react';
import imgFail from '../res/fail.png';
import imgSuccess from '../res/success.png';
import { ChildrenProps, MaybeClassNameProps } from '../types/componentTypes';
import { CharConfig, Characteristic, CharacteristicList } from '../types/types';
import { SetUtil } from '../util/setUtil';
import { SelectableBox } from './selectableBox';

type Props = MaybeClassNameProps & {
    selected: CharConfig[];
    onChange: (selected: CharConfig[]) => void;
    centered?: boolean;
    allNone?: boolean;
};

const zeroSharedConfigs: CharConfig[] = [[]];
const oneSharedConfigs: CharConfig[] = CharacteristicList.map((char) => [char]);

export function CharConfigSelector(props: Props) {
    const twoSharedConfigs: CharConfig[] = useMemo(() => {
        const configs: CharConfig[] = [];
        for (let i = 0; i < CharacteristicList.length; i++) {
            for (let j = i + 1; j < CharacteristicList.length; j++) {
                configs.push([CharacteristicList[i], CharacteristicList[j]]);
            }
        }
        return configs;
    }, []);
    const threeSharedConfigs: CharConfig[] = useMemo(() => {
        const subtract = (char: Characteristic) => {
            const config = CharacteristicList.slice();
            config.splice(CharacteristicList.indexOf(char), 1);
            return config;
        };
        const configs: CharConfig[] = [];
        for (const char of CharacteristicList) {
            configs.push(subtract(char));
        }
        return configs;
    }, []);
    const allConfigs: CharConfig[] = useMemo(
        () =>
            zeroSharedConfigs
                .concat(oneSharedConfigs)
                .concat(twoSharedConfigs)
                .concat(threeSharedConfigs),
        [],
    );
    return (
        <div className={props.className}>
            <CardWrapper
                header="Zero shared characteristics"
                configs={zeroSharedConfigs}
                {...props}
            />
            <CardWrapper
                header="One shared characteristic"
                configs={oneSharedConfigs}
                {...props}
            />
            <CardWrapper
                header="Two shared characteristics"
                configs={twoSharedConfigs}
                {...props}
            />
            <CardWrapper
                header="Three shared characteristics"
                configs={threeSharedConfigs}
                {...props}
            />
        </div>
    );
}

type CardWrapperProps = Props & {
    header: string;
    configs: CharConfig[];
};

function CardWrapper({
    header,
    configs,
    centered,
    allNone,
    selected,
    onChange,
}: CardWrapperProps) {
    return (
        <>
            <div css={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <div
                    css={{
                        fontWeight: 'bold',
                        marginLeft: '5px',
                        marginTop: '10px',
                        marginBottom: '5px',
                    }}
                >
                    {header}
                </div>
                {allNone && (
                    <>
                        <button
                            className="btn btn-sm btn-primary"
                            onClick={() =>
                                onChange(
                                    SetUtil.toggleCharConfigs(
                                        selected,
                                        configs,
                                        true,
                                    ),
                                )
                            }
                        >
                            All
                        </button>
                        <button
                            className="btn btn-sm btn-secondary"
                            onClick={() =>
                                onChange(
                                    SetUtil.toggleCharConfigs(
                                        selected,
                                        configs,
                                        false,
                                    ),
                                )
                            }
                        >
                            None
                        </button>
                    </>
                )}
            </div>
            <div
                css={{
                    display: 'flex',
                    gap: '10px',
                    flexWrap: 'wrap',
                    marginLeft: '20px',
                    justifyContent: centered ? 'center' : undefined,
                }}
            >
                {configs.map((config, idx) => (
                    <Card
                        key={idx}
                        config={config}
                        selected={selected}
                        onChange={onChange}
                    />
                ))}
            </div>
        </>
    );
}

type CardProps = {
    config: CharConfig;
    selected: CharConfig[];
    onChange: (selectedList: CharConfig[]) => void;
};

function Card({ config, selected, onChange }: CardProps) {
    const selectedIdx = useMemo(
        () => SetUtil.getCharConfigIndex(selected, config),
        [config, selected],
    );
    return (
        <SelectableBox
            className="noselect"
            css={{
                width: '190px',
                boxSizing: 'border-box',
                padding: '2px 0 2px 4px',
            }}
            selected={selectedIdx >= 0}
            onClick={() => onChange(SetUtil.toggleCharConfig(selected, config))}
        >
            <div>
                <CardPart included={config.includes('color')} marginRight={15}>
                    Color
                </CardPart>
                <CardPart included={config.includes('number')} marginRight={5}>
                    Number
                </CardPart>
            </div>
            <div>
                <CardPart
                    included={config.includes('filling')}
                    marginRight={15}
                >
                    Filling
                </CardPart>
                <CardPart included={config.includes('shape')} marginRight={5}>
                    Shape
                </CardPart>
            </div>
        </SelectableBox>
    );
}

type CardPartProps = ChildrenProps & {
    included: boolean;
    marginRight: number;
};

function CardPart({ included, marginRight, children }: CardPartProps) {
    return (
        <div
            css={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                width: '50%',
                position: 'relative',
            }}
        >
            {children}
            <img
                src={included ? imgSuccess : imgFail}
                width="20px"
                height="20px"
                css={{
                    position: 'absolute',
                    right: `${marginRight}px`,
                }}
                alt=""
            />
        </div>
    );
}
