import { TSet } from '../types/types';
import { CardRenderer } from './cardRenderer';

type Props = {
    set: TSet;
};

export function SetRenderer({ set }: Props) {
    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <CardRenderer card={set[0]} />
            <CardRenderer card={set[1]} />
            <CardRenderer card={set[2]} />
        </div>
    );
}
