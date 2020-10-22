import { files } from "./constant/fileMapping";
import { getImagePath } from "./utils";
import fs from "fs";

import axios from "axios";

const apiRes = JSON.parse(fs.readFileSync("./apiCache.json")) || {};
const fullData = {};

Promise.all(
  Object.keys(files).map((exhibitionId) => {
    return new Promise((resolve, reject) => {
      let { creationIsJson, creation, curator, name } = files[exhibitionId];
      let creationJson = null;
      if (creationIsJson) {
        creationJson = require(`./assets/exhibition_${name}/creation.json`)
          .Creation;
      }
      files[exhibitionId].creationList = creation.map((aCreation, index) => {
        let file = creationIsJson
          ? creationJson[index]
          : Array.isArray(aCreation)
          ? require(`./assets${aCreation[0]}`).default
          : require(`./assets${aCreation}`).default;
        let imageObj = creationIsJson ? creationJson[index] : null;
        let imageList = Array.isArray(aCreation) ? aCreation : [aCreation];
        return {
          ...file,
          imgPath: imageList.map((aImage) => getImagePath(imageObj, aImage)),
        };
      });

      files[
        exhibitionId
      ].artistDescription = require(`./assets/exhibition_${name}/artist`).default;
      files[exhibitionId].teamDescription = curator
        ? require(`./assets${curator}`).default
        : [];
      if (!Array.isArray(files[exhibitionId].teamDescription))
        files[exhibitionId].teamDescription = [
          files[exhibitionId].teamDescription,
        ];

      delete files[exhibitionId].creation;
      delete files[exhibitionId].creationIsJson;
      delete files[exhibitionId].curator;

      if (!apiRes[exhibitionId]) {
        axios
          .get(`https://artogo.tw/api/exhibition?url=${exhibitionId}`)
          .then((res) => {
            apiRes[exhibitionId] = res.data;
            fullData[exhibitionId] = {
              alias: exhibitionId,
              ...files[exhibitionId],
              ...apiRes[exhibitionId],
            };
            console.log(`Fetch: ${exhibitionId}`);
            resolve();
          })
          .catch((err) => {
            console.error(err);
            reject();
          });
      } else {
        fullData[exhibitionId] = {
          alias: exhibitionId,
          ...files[exhibitionId],
          ...apiRes[exhibitionId],
        };
        resolve();
      }
    });
  })
).then((data) => {
  fs.writeFileSync("./exhibition.json", JSON.stringify(files));
  fs.writeFileSync("./apiCache.json", JSON.stringify(apiRes));
  console.log("Done raw.");

  const formatted = {};
  Object.values(fullData).forEach((anExhibition) => {
    const artist = anExhibition.artistDescription.map((anArtist) => {
      let media = anExhibition.artist
        .slice(anArtist.start, anArtist.end)
        .map((aMedia) => ({
          type: "photo",
          url: `https://media.artogo.tw${aMedia}.jpg`,
        }));
      let formatted_artist = {
        name: "name",
        description: anArtist.description,
        tag: null,
        media,
        hyperlink: [],
      };
      return formatted_artist;
    });

    formatted[anExhibition.alias] = {
      alias: anExhibition.alias,
      name_zh: anExhibition.title,
      name_en: "TEST",
      key_vision: `https://media.artogo.tw${anExhibition.kv[0]}.jpg`,
      curator: anExhibition.artist_name,
      tag: [],
      category: [],
      intro: {
        full_name: anExhibition.full_name || anExhibition.name,
        curator: anExhibition.artist_name,
        duration: `${anExhibition.start_date} ~ ${anExhibition.end_date}`,
        open_hour: "open_hour",
        venue: anExhibition.venues
          .map(
            (aVenue) => aVenue.name + (aVenue.space ? `｜${aVenue.space}` : "")
          )
          .join("、"),
        address: anExhibition.venues.map((aVenue) => aVenue.address).join("、"),
        description: anExhibition.description,
        sound: [],
        youtube: anExhibition.youtube.filter((aLink) => aLink !== ""),
        hyperlink: anExhibition.hyper_link
          ? [
              {
                name: anExhibition.hyper_link.text,
                url: anExhibition.hyper_link.link,
              },
            ]
          : anExhibition.kv_all
          ? anExhibition.kv_all.hyperlinks
            ? anExhibition.kv_all.hyperlinks
            : []
          : [],
      },
      creation: anExhibition.creationList.map((aCreation, index) => {
        let media = (aCreation.video ? [aCreation.video] : []).concat(
          aCreation.imgPath
            ? aCreation.imgPath.map((aImg) => ({
                type: "photo",
                url: aImg,
              }))
            : []
        );
        if (aCreation.video)
          media.unshift({
            type: "video",
            url: aCreation.video,
          });
        return {
          index: index + 1,
          title: aCreation.title,
          creator: aCreation.creator,
          description: aCreation.description,
          media_thumb: media.length > 0 ? media[0].url : null,
          media,
          sound: aCreation.audio
            ? [
                {
                  type: "file",
                  url: `https://media.artogo.tw/exhibition_${anExhibition.alias}/${aCreation.audio}`,
                },
              ]
            : [],
          tag: null,
          category: [],
          hyperlink: aCreation.hyperlinks
            ? aCreation.hyperlinks.map((aLink) => ({
                name: aLink.text,
                url: aLink.link,
              }))
            : [],
        };
      }),
      about: {
        artist,
        curator: anExhibition.teamDescription.map((aTeam) => ({
          name: "name",
          description: aTeam.description,
          tag: null,
          media:
            aTeam.image && aTeam.image !== ""
              ? [
                  {
                    type: "photo",
                    url: `https://media.artogo.tw${aTeam.image}.jpg`,
                  },
                ]
              : [],
          hyperlink: [],
        })),
      },
    };
  });
  fs.writeFileSync("./formatted.json", JSON.stringify(formatted));
  console.log("Done format.");
});
