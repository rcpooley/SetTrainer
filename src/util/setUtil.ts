import {
    CardColors,
    CardFillings,
    CardNumbers,
    CardShapes,
    CharConfig,
    CharacteristicList,
    CharacteristicValues,
    TCard,
    TSet,
} from '../types/types';

export class SetUtil {
    static serializeCharConfig(config: CharConfig): string {
        const clone = config.slice();
        clone.sort();
        return clone.join(',');
    }

    static serializeCard(card: TCard): string {
        return [card.color, card.filling, card.number, card.shape].join(',');
    }

    static serializeSet(set: TSet): string {
        const cards = set.map((card) => this.serializeCard(card));
        cards.sort();
        return cards.join('|');
    }

    private static _cards: Record<string, TCard> | null = null;
    static getCards(): Record<string, TCard> {
        if (this._cards !== null) {
            return this._cards;
        }
        const cards: Record<string, TCard> = {};
        for (const color of CardColors) {
            for (const number of CardNumbers) {
                for (const filling of CardFillings) {
                    for (const shape of CardShapes) {
                        const card: TCard = {
                            color,
                            number,
                            filling,
                            shape,
                        };
                        cards[SetUtil.serializeCard(card)] = card;
                    }
                }
            }
        }
        this._cards = cards;
        return cards;
    }

    private static _charConfigSetMap: Record<string, TSet[]> = {};
    static getSetsForCharConfig(config: CharConfig): TSet[] {
        const serialized = this.serializeCharConfig(config);
        if (serialized in this._charConfigSetMap) {
            return this._charConfigSetMap[serialized];
        }
        // store in a map to dedup sets containing the same cards
        const setMap: Record<string, TSet> = {};
        const cards = this.getCards();
        for (const card1 of Object.values(cards)) {
            const nextCards = this.filterCardsMatching(card1, config);
            for (const card2 of nextCards) {
                const card3 = this.getThirdCard(card1, card2);
                const set = [card1, card2, card3];
                setMap[this.serializeSet(set)] = set;
            }
        }
        this._charConfigSetMap[serialized] = Object.values(setMap);
        return this._charConfigSetMap[serialized];
    }

    static filterCardsMatching(card: TCard, config: CharConfig): TCard[] {
        return Object.values(this.getCards()).filter((checkCard) => {
            for (const char of CharacteristicList) {
                const shouldMatch = config.includes(char);
                const doesMatch = checkCard[char] === card[char];
                if (shouldMatch !== doesMatch) {
                    return false;
                }
            }
            return true;
        });
    }

    static getThirdCard(card1: TCard, card2: TCard): TCard {
        const card: any = {};
        for (const char of CharacteristicList) {
            const c1 = card1[char];
            const c2 = card2[char];
            // matching characteristic
            if (c1 === c2) {
                card[char] = c1;
            }
            // not matching characteristic
            else {
                const curValues = [c1, c2];
                card[char] = CharacteristicValues.find(
                    (val) => !curValues.includes(val),
                );
            }
        }
        return card;
    }
}
