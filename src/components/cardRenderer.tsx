import { TCard } from '../types/types';
import { PartRenderer } from './partRenderer';
import { SelectableBox } from './selectableBox';

type Props = {
    card: TCard;
    selected?: boolean;
    onClick?: () => void;
};

export function CardRenderer({ card, selected, onClick }: Props) {
    return (
        <SelectableBox
            css={{
                width: `183px`,
                height: `109px`,
                margin: '7px',
                display: 'inline-flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {new Array(card.number).fill(null).map((_, idx) => (
                <PartRenderer key={idx} card={card} />
            ))}
        </SelectableBox>
    );
}
