const createCountFormatter = ({
  few,
  one,
  two
}) => {
  const titles = [one, two, few];

  return (number) => {
    const cases = [2, 0, 1, 1, 1, 2];

    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  };
};

const formatMinutesCount = createCountFormatter({
  few: "минут",
  one: "минута",
  two: "минуты",
});

module.exports = {
  getNextHeadingLevel(currentLevel) {
    return parseInt(currentLevel, 10) + 1;
  },
  getReadingTime(text) {
    const wordsPerMinute = 200;
    const numberOfWords = text.split(/\s/g).length;
    return `${Math.ceil(numberOfWords / wordsPerMinute)} ${formatMinutesCount(Math.ceil(numberOfWords / wordsPerMinute))}`;
  }
};
