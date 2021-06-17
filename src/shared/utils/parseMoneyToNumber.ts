const parseMoneyToNumber = (value: string): number => {
  const replaceValues = [
    ['R$', ''],
    [',', '.'],
  ];

  const parsedValue = value.toLowerCase().trim();

  return Number(
    replaceValues.reduce(
      (acc, [search, replace]) => acc.replace(search.toLowerCase(), replace),
      parsedValue,
    ),
  );
};

export { parseMoneyToNumber };
