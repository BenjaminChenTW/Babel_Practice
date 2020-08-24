import artistArr from './artist.json';

const tempArr = [];

artistArr.forEach((artist, index) => {
  tempArr.push({
    start: index,
    end: index,
    description: artist.description,
  });
});
export default tempArr;
