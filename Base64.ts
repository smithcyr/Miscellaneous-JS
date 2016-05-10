export class Base64 {
    private static b64chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    private static b64pos: number[] = [18, 12, 6, 0];
    private static b64and: number[] = Base64.b64pos.map(v => 63 << v);

    static encode(input: string): string {
        let length = input.length;
        let count: number;
        let encoded: number[] = [];
        let b64string: string = "";
        for (let index = 0; index < length; index++) {
            if (!(index % 3)) {
                count = 0;
            }
            count <<= 8;
            count |= input.charCodeAt(index);
            if (index % 3 === 2) {
                 encoded.push(count);
            }
        }
        encoded.forEach((value: number) => {
            for (let i = 0; i < 4; i++) {
                b64string += Base64.b64chars[(value & Base64.b64and[i]) >> Base64.b64pos[i]];
            }
        });
        let extra: number = length % 3;
        if (extra) {
            count <<= 24 - 8 * extra;
            for (let i = 0; i < extra + 1; i++) {
                b64string += Base64.b64chars[(count & Base64.b64and[i]) >> Base64.b64pos[i]];
            }
            for (let i = 0; i < 3 - extra; i++) {
                b64string += "=";
            }
        }
        return b64string;
    }

    private static asciiPos: number[] = [16, 8, 0];
    private static asciiAnd: number[] = Base64.asciiPos.map(v => 255 << v);
    private static b64hash: {} = Base64.b64chars.split("").reduce((prev: {[index: number]: string}, current: string, index: number) => {prev[current] = index; return prev; }, {});

    static decode(input: string): string {
        let offset = Number(input[input.length - 1] === "=") + Number(input[input.length - 2] === "=");
        let inputWithoutOffset: string = input.replace(/=/g, "");
        let count: number = 0;
        let decoded: number[] = [];
        let asciiString: string = "";
        let length: number = inputWithoutOffset.length;
        for (let index: number = 0; index < length; index++) {
            if (!(index % 4)) {
                count = 0;
            }
            count <<= 6;
            count |= Base64.b64hash[inputWithoutOffset[index]];
            if (index % 4 === 3) {
                decoded.push(count);
            }
        }
        if (offset) {
            decoded.push(count << (offset * 6));
        }
        let decodedLength = decoded.length - 1;
        decoded.forEach((value, index) => {
            asciiString += String.fromCharCode.apply(null,
                (decodedLength === index ? Base64.asciiPos.slice(0, 3 - offset) : Base64.asciiPos)
                .map((bit, bitIndex) => (value & Base64.asciiAnd[bitIndex]) >> bit));
        });
        return asciiString;
    }
}