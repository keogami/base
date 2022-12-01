import { Base } from "./main.ts";

Deno.test("That encode and decode are inverse operations", async _t => {
  const base = new Base("01");
  const check = (i: number) => {
    return {
      correct: base.decode(base.encode(i)) === i,
      i,
    };
  };

  const all: Promise<ReturnType<typeof check>>[] = [];
  for (let i = 0; i < 2 ** 16; i++) {
    all.push(new Promise((res) => res(check(i))));
  }

  const bad = (await Promise.all(all)).filter(({ correct }) => !correct);
  if (bad.length === 0) return;

  bad.slice(0, 8).map(({ i }) =>
    console.log(`encode and decode are not inverse for ${i}`)
  );

  if (bad.length > 8) {
    console.log("there were more errors than 8");
  }

  throw new Error("mau")
});
