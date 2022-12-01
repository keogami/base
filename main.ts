class DecodeError extends Error {
  constructor(char: string) {
    super(`"${char}" is not found in the encoding map.`);
    this.name = "DecodeError";
  }
}

export class Base {
  #map: string;
  #len: number;
  #idx: Map<string, number>;

  constructor(map: string) {
    this.#len = map.length;
    this.#map = map;
    this.#idx = new Map(
      map.split("").map((val, idx) => [val, idx]),
    );
  }

  encode(num: number): string {
    return num < this.#len
      ? this.#map[num]
      : (this.encode(Math.floor(num / this.#len)) + this.#map[num % this.#len]);
  }

  decode(str: string): number {
    return str.split("").reverse().map((val, idx) => {
      const numval = this.#idx.get(val);
      if (typeof numval === "undefined") {
        throw new DecodeError(val);
      }

      return numval * (this.#len ** idx);
    }).reduce((a, b) => a + b);
  }
}
