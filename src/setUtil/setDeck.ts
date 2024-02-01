import {
    CardColors,
    CardFillings,
    CardNumbers,
    CardShapes,
    TCard,
} from '../types/types';
import { SetUtil } from './setUtil';

export class SetDeck {
    private cards: Record<string, TCard>;

    constructor() {
        this.cards = this.initCards();
    }

    private initCards(): Record<string, TCard> {
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
        return cards;
    }
}
