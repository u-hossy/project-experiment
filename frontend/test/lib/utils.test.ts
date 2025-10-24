import { expect, test } from "vitest";
import { cn } from "@/lib/utils";

test("two className can be marged", () => {
  expect(cn(["aaa", "bbb"])).toBe("aaa bbb");
});

test("three className can be marged", () => {
  expect(cn(["aaa", "bbb", "ccc"])).toBe("aaa bbb ccc");
});
