import { TCard } from '../types/types';
import { PartRenderer } from './partRenderer';

type Props = {
    card: TCard;
    selected?: boolean;
    onClick?: () => void;
};

export function CardRenderer({ card, selected, onClick }: Props) {
    return (
        <div
            css={{
                width: `183px`,
                height: `109px`,
                border: '1px solid rgba(0, 0, 0, 0.87)',
                margin: '7px',
                borderRadius: '7px',
                display: 'inline-flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: selected
                    ? '0px 0px 5px 3px #4b9e9e !important'
                    : undefined,
                cursor: onClick == null ? undefined : 'pointer',
                ':hover':
                    onClick == null
                        ? undefined
                        : {
                              boxShadow: '0px 0px 5px 3px #bbb',
                          },
            }}
            onClick={onClick}
        >
            {new Array(card.number).fill(null).map((_, idx) => (
                <PartRenderer key={idx} card={card} />
            ))}
        </div>
    );
}
