export class Util {
    static plural(n: number): string {
        return n === 1 ? '' : 's';
    }

    static classes(
        ...elements: Array<string | null | undefined | boolean>
    ): string {
        return elements.filter((el) => typeof el === 'string').join(' ');
    }
}
