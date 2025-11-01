function toCamelCase(s: string) {
  return s
    .split("_")
    .map((v, i) => {
      if (i === 0) {
        return v.toLowerCase();
      }
      return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
    })
    .join("");
}

function toCamelCaseObject(o: Record<string, unknown>) {
  const result: Record<string, unknown> = {};
  Object.keys(o).forEach((k) => {
    result[toCamelCase(k)] = o[k];
  });
  return result;
}

function toSnakeCase(s: string) {
  return s
    .split(/(?=[A-Z])/)
    .join("_")
    .toLowerCase();
}

function toSnakeCaseObject(o: Record<string, unknown>) {
  const result: Record<string, unknown> = {};
  Object.keys(o).forEach((k) => {
    result[toSnakeCase(k)] = o[k];
  });
  return result;
}

export { toCamelCaseObject, toSnakeCaseObject };
