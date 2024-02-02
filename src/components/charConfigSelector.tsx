import { ChildrenProps } from '../types/componentTypes';
import { CharConfig, Characteristic, CharacteristicList } from '../types/types';
import imgSuccess from '../res/success.png';
import imgFail from '../res/fail.png';
import { useMemo } from 'react';
import { SetUtil } from '../util/setUtil';

type Props = {
    selected: CharConfig[];
    onChange: (selected: CharConfig[]) => void;
};

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
    return (
        <div
            style={{
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflow: 'auto',
                paddingBottom: '10px',
            }}
        >
            <Header>Zero shared characteristics</Header>
            <Card config={[]} {...props} />
            <Header>One shared characteristic</Header>
            {CharacteristicList.map((char) => (
                <Card key={char} config={[char]} {...props} />
            ))}
            <Header>Two shared characteristics</Header>
            {twoSharedConfigs.map((config, idx) => (
                <Card key={idx} config={config} {...props} />
            ))}
            <Header>Three shared characteristics</Header>
            {threeSharedConfigs.map((config, idx) => (
                <Card key={idx} config={config} {...props} />
            ))}
        </div>
    );
}

function Header({ children }: ChildrenProps) {
    return (
        <div
            style={{
                fontWeight: 'bold',
                marginLeft: '5px',
                marginTop: '5px',
            }}
        >
            {children}
        </div>
    );
}

type CardProps = {
    config: CharConfig;
    selected: CharConfig[];
    onChange: (selectedList: CharConfig[]) => void;
};

function Card({ config, selected, onChange }: CardProps) {
    const selectedIdx = useMemo(() => {
        const cur = SetUtil.serializeCharConfig(config);
        const list = selected.map((config) =>
            SetUtil.serializeCharConfig(config),
        );
        return list.indexOf(cur);
    }, [config, selected]);
    return (
        <div
            className="noselect"
            style={{
                border: '1px solid black',
                width: '190px',
                boxSizing: 'border-box',
                marginTop: '5px',
                padding: '2px 0 2px 4px',
                backgroundColor: selectedIdx >= 0 ? '#bcf7cc' : '#ffcdcc',
                cursor: 'pointer',
            }}
            onClick={() => {
                const newList = selected.slice();
                if (selectedIdx >= 0) {
                    newList.splice(selectedIdx, 1);
                } else {
                    newList.push(config);
                }
                onChange(newList);
            }}
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
        </div>
    );
}

type CardPartProps = ChildrenProps & {
    included: boolean;
    marginRight: number;
};

function CardPart({ included, marginRight, children }: CardPartProps) {
    return (
        <div
            style={{
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
                style={{
                    position: 'absolute',
                    right: `${marginRight}px`,
                }}
                alt=""
            />
        </div>
    );
}
