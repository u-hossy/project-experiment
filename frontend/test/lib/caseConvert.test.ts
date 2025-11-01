import { expect, test } from "vitest";
import { toCamelCaseObject, toSnakeCaseObject } from "@/lib/caseConvert";

test("convert snake case object to camel case object", () => {
  const before = {
    id: 0,
    amount: 8000,
    paid_by: 0,
    paid_for: 1,
  };

  const after = {
    id: 0,
    amount: 8000,
    paidBy: 0,
    paidFor: 1,
  };

  expect(toCamelCaseObject(before)).toStrictEqual(after);
});

test("convert camel case object to snake case object", () => {
  const before = {
    id: 0,
    amount: 8000,
    paidBy: 0,
    paidFor: 1,
  };

  const after = {
    id: 0,
    amount: 8000,
    paid_by: 0,
    paid_for: 1,
  };

  expect(toSnakeCaseObject(before)).toStrictEqual(after);
});
