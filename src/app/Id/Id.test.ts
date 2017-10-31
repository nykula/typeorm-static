import { Id } from "./Id";

describe("Id", () => {
  it("returns unique id", () => {
    const id = Id();
    const id1 = Id();
    const id2 = Id();

    console.assert(id !== id1);
    console.assert(id !== id2);
    console.assert(id2 !== id);
  });
});
