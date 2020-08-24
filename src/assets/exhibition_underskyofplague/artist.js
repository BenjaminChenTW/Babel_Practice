import artistArr from './artist.json';

const tempArr = [];

artistArr.forEach((artist) => {
  tempArr.push({
    start: 0,
    end: 0,
    description: `藝術家｜\n\n${artist.name}\n\n藝術家介紹\n\n${artist.description}`,
  });
});
export default tempArr;
