import { TCard } from '../types';
import allCards from './allcards.png';

const COL_STARTS = [30, 133, 235, 338, 441, 543, 646, 749, 851];
const ROW_STARTS = [15, 72, 130, 187, 245, 302, 360, 417, 475];
const CARD_WIDTH = 90;
const CARD_HEIGHT = 50;
const IMG_WIDTH = 970;
const SCALE = 2;

type Props = {
    card: TCard;
};

export function CardRenderer({ card }: Props) {
    const col = (card.shape - 1) * 3 + card.number - 1;
    const row = (card.color - 1) * 3 + card.filling - 1;
    return (
        <div
            style={{
                width: `${CARD_WIDTH * SCALE}px`,
                height: `${CARD_HEIGHT * SCALE}px`,
                overflow: 'hidden',
                border: '1px solid black',
            }}
        >
            <img
                src={allCards}
                style={{
                    transform: `translate(-${COL_STARTS[col] * SCALE + 5}px, -${ROW_STARTS[row] * SCALE}px)`,
                    width: `${IMG_WIDTH * SCALE}px`,
                }}
                alt=""
            />
        </div>
    );
}
