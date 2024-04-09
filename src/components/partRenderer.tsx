import { CardColor, CardFilling, CardShape, TCard } from '../types/types';

const COLOR_MAP: Record<CardColor, string> = {
    [CardColor.Green]: '#008002',
    [CardColor.Red]: '#ff0101',
    [CardColor.Purple]: '#800080',
};

export const SVG_SHAPE_ID_MAP: Record<CardShape, string> = {
    [CardShape.Diamond]: 'diamond',
    [CardShape.Squiggle]: 'squiggle',
    [CardShape.Oval]: 'oval',
};

export const MASK_STRIPE_ID = 'mask-stripe';

type Props = {
    card: Pick<TCard, 'color' | 'filling' | 'shape'>;
};

/**
 * Renderers all parts of a card except for number: shape, color, filling
 */
export function PartRenderer({ card }: Props) {
    const color = COLOR_MAP[card.color];
    const fill = card.filling === CardFilling.Empty ? 'transparent' : color;
    const shapeID = `#${SVG_SHAPE_ID_MAP[card.shape]}`;
    const mask =
        card.filling === CardFilling.Lines ? `url(#${MASK_STRIPE_ID})` : '';
    return (
        <>
            <svg
                width="39"
                height="78"
                viewBox="0 0 200 400"
                css={{ margin: '3px' }}
            >
                <use href={shapeID} fill={fill} mask={mask}></use>
                <use
                    href={shapeID}
                    stroke={color}
                    fill="none"
                    strokeWidth="18"
                ></use>
            </svg>
        </>
    );
}
