import "source-map-support/register";
import * as assert from "assert";
import { Id } from "./id";
const id = Id();
const id1 = Id();
const id2 = Id();
assert(id !== id1 && id !== id2 && id2 !== id, "returns unique id");
