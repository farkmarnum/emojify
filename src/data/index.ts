import emojiData from './emoji-data.json';
import { commonWords, inappropriateEmojis } from './constants';

const isInappropriate = (str: string) =>
  inappropriateEmojis.some((emoji) => str.includes(emoji));

export const convert = ({
  input,
  density,
  shouldFilterEmojis,
}: {
  input: string;
  density: number;
  shouldFilterEmojis: boolean;
}) => {
  const words = input.replace(/\n/g, ' ').split(' ');
  const result = words
    .reduce((acc: string, wordRaw: string) => {
      const word = wordRaw.replace(/[^0-9a-zA-Z]/g, '').toLowerCase();

      const accNext = `${acc} ${wordRaw}`;

      const randomChoice = Math.random() * 100 <= density;
      const isTooCommon = commonWords.has(word);

      const emojiFilter = shouldFilterEmojis
        ? (option: string) => !isInappropriate(option)
        : () => true;

      const emojiOptions = Object.entries(
        emojiData[word as keyof typeof emojiData] || {},
      )
        .filter(([option]) => emojiFilter(option))
        .reduce(
          (arr, [option, frequency]) => [
            ...arr,
            ...[...Array(frequency)].fill(option),
          ],
          [] as string[],
        );

      if (isTooCommon || !randomChoice || emojiOptions.length === 0) {
        return accNext;
      }

      const emojis =
        emojiOptions[Math.floor(Math.random() * emojiOptions.length)];

      return `${accNext} ${emojis}`;
    }, '')
    .trim();

  return result;
};
