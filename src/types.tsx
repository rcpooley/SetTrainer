export type TCard = {
    color: CardColor;
    number: CardNumber;
    filling: CardFilling;
    shape: CardShape;
};

export enum CardColor {
    Red = 1,
    Green = 2,
    Purple = 3,
}

export enum CardNumber {
    One = 1,
    Two = 2,
    Three = 3,
}

export enum CardFilling {
    Empty = 1,
    Lines = 2,
    Filled = 3,
}

export enum CardShape {
    Diamond = 1,
    Oval = 2,
    Squigle = 3,
}
