const titleCase = (name: string): string => {
  const splitNames = name.toLowerCase().split(" ");
  const standardizedNames = splitNames.map((name) => {
    const newName = name.charAt(0).toUpperCase() + name.slice(1);
    return newName.trim();
  });
  const standardizedName = standardizedNames.join(" ");

  return standardizedName;
};

export default titleCase;
