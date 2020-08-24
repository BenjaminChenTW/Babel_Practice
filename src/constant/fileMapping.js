const Url = require('url');

const getCreationNumber = (i) => (i < 10 ? `00${i}` : i < 100 ? `0${i}` : i);

const filesNameCreator = (type, name, amount = 1, multiIndex = [], multiAmount = []) => {
  switch (type) {
    case 'artist': {
      if (amount === 0) return [];
      let files = [];
      for (let i = 1; i <= amount; i++) {
        files.push(`/exhibition_${name}/artist_${name}_${i}`);
      }
      return files;
    }
    case 'creation': {
      let files = [];
      for (let i = 1; i <= amount; i++) {
        if (multiIndex.indexOf(i) === -1)
          files.push(`/exhibition_${name}/creation_${getCreationNumber(i)}`);
        else {
          files.push([`/exhibition_${name}/creation_${getCreationNumber(i)}`]);
          for (let j = 1; j <= multiAmount[multiIndex.indexOf(i)]; j++) {
            files[i - 1].push(`/exhibition_${name}/creation_${getCreationNumber(i)}_${j}`);
          }
        }
      }
      return files;
    }
    case 'curator': {
      let files = [];
      files.push(`/exhibition_${name}/curator_${name}`);
      return files;
    }
    case 'kv': {
      let files = [];
      files.push(`/exhibition_${name}/exhibition_kv_${name}`);
      return files;
    }
    case 'kv_info': {
      let files = [];
      files.push(require(`../assets/exhibition_${name}/exhibition_kv_${name}`).default.info);
      return files;
    }
    case 'kv_description': {
      let files = [];
      files.push(require(`../assets/exhibition_${name}/exhibition_kv_${name}`).default.description);
      return files;
    }
    case 'main': {
      let files = [];
      files.push(`/exhibition_${name}/main_card_${name}`);
      return files;
    }
    case 'banner': {
      let files = [];
      files.push(`/exhibition_${name}/banner_${name}`);
      return files;
    }
    case 'youtube': {
      let files = [];
      files = [...require(`../assets/exhibition_${name}/youtube`).default];
      return files;
    }
    case 'website': {
      let files = [];
      const links = [...require(`../assets/exhibition_${name}/website`).default];
      for (let i = 0; i < links.length; i += 1) {
        let url = Url.parse(links[i], true);
        if (url.hostname === 'my.matterport.com') {
          Object.assign(url.query, {
            lang: 'en',
          });
          url.search = undefined;
        }
        links[i] = Url.format(url);
      }
      files = links;
      return files;
    }
    default:
      return;
  }
};

const files = {
  dodo: {
    name: 'dodo',
    title: '逝者如渡渡',
    artist_name: '陳聖文',
    artist: filesNameCreator('artist', 'dodo', 3),
    creation: filesNameCreator('creation', 'dodo', 37, [37], [3]),
    curator: filesNameCreator('curator', 'dodo'),
    kv: filesNameCreator('kv', 'dodo'),
    kv_info: filesNameCreator('kv_info', 'dodo'),
    kv_description: filesNameCreator('kv_description', 'dodo'),
    main: filesNameCreator('main', 'dodo'),
    banner: filesNameCreator('banner', 'dodo'),
    youtube: filesNameCreator('youtube', 'dodo'),
    website: filesNameCreator('website', 'dodo'),
  },
  asavessel: {
    name: 'asavessel',
    title: '作為容器',
    artist_name: '林煜崚、林煜崇、何昕祐、簡智忠',
    artist: filesNameCreator('artist', 'asavessel', 4),
    creation: filesNameCreator('creation', 'asavessel', 4),
    // curator: filesNameCreator("curator", "asavessel"),
    kv: filesNameCreator('kv', 'asavessel'),
    kv_info: filesNameCreator('kv_info', 'asavessel'),
    kv_description: filesNameCreator('kv_description', 'asavessel'),
    main: filesNameCreator('main', 'asavessel'),
    banner: filesNameCreator('banner', 'asavessel'),
    youtube: filesNameCreator('youtube', 'asavessel'),
    website: filesNameCreator('website', 'asavessel'),
  },
  todaughters: {
    name: 'todaughters',
    title: '《一場自私の個展：致女兒s》',
    artist_name: '鄧婉暉（Phoebe）',
    artist: filesNameCreator('artist', 'todaughters', 1),
    creation: filesNameCreator('creation', 'todaughters', 6),
    curator: filesNameCreator('curator', 'todaughters'),
    kv: filesNameCreator('kv', 'todaughters'),
    kv_info: filesNameCreator('kv_info', 'todaughters'),
    kv_description: filesNameCreator('kv_description', 'todaughters'),
    main: filesNameCreator('main', 'todaughters'),
    banner: filesNameCreator('banner', 'todaughters'),
    youtube: filesNameCreator('youtube', 'todaughters'),
    website: filesNameCreator('website', 'todaughters'),
  },
  treeandgoldfish: {
    name: 'treeandgoldfish',
    title: '樹與金魚',
    artist_name: '陳鏘旭、馬維婷',
    artist: filesNameCreator('artist', 'treeandgoldfish', 2),
    creation: filesNameCreator('creation', 'treeandgoldfish', 18),
    curator: filesNameCreator('curator', 'treeandgoldfish'),
    kv: filesNameCreator('kv', 'treeandgoldfish'),
    kv_info: filesNameCreator('kv_info', 'treeandgoldfish'),
    kv_description: filesNameCreator('kv_description', 'treeandgoldfish'),
    main: filesNameCreator('main', 'treeandgoldfish'),
    banner: filesNameCreator('banner', 'treeandgoldfish'),
    youtube: filesNameCreator('youtube', 'treeandgoldfish'),
    website: filesNameCreator('website', 'treeandgoldfish'),
  },
  simpledrawing: {
    name: 'simpledrawing',
    title: '簡單素描',
    artist_name: '吳宣翰 Hsuan Han WU',
    artist: filesNameCreator('artist', 'simpledrawing', 4),
    creation: filesNameCreator('creation', 'simpledrawing', 23),
    curator: filesNameCreator('curator', 'simpledrawing'),
    kv: filesNameCreator('kv', 'simpledrawing'),
    kv_info: filesNameCreator('kv_info', 'simpledrawing'),
    kv_description: filesNameCreator('kv_description', 'simpledrawing'),
    main: filesNameCreator('main', 'simpledrawing'),
    banner: filesNameCreator('banner', 'simpledrawing'),
    youtube: filesNameCreator('youtube', 'simpledrawing'),
    website: filesNameCreator('website', 'simpledrawing'),
  },
  planx: {
    name: 'planx',
    title: '逃亡計劃 Escape PLAN X',
    artist_name: '逃亡計劃 Escape PLAN X',
    artist: filesNameCreator('artist', 'planx', 0),
    creation: filesNameCreator('creation', 'planx', 0),
    curator: filesNameCreator('curator', 'planx'),
    kv: filesNameCreator('kv', 'planx'),
    kv_info: filesNameCreator('kv_info', 'planx'),
    kv_description: filesNameCreator('kv_description', 'planx'),
    main: filesNameCreator('main', 'planx'),
    banner: filesNameCreator('banner', 'planx'),
    youtube: filesNameCreator('youtube', 'planx'),
    website: filesNameCreator('website', 'planx'),
  },
  FujiBrontosaurus: {
    name: 'FujiBrontosaurus',
    title: '富士山雷龍與動物達磨改造展',
    artist_name: '富士山雷龍與動物達磨改造展',
    artist: filesNameCreator('artist', 'FujiBrontosaurus', 0),
    creation: filesNameCreator('creation', 'FujiBrontosaurus', 338),
    curator: filesNameCreator('curator', 'FujiBrontosaurus'),
    kv: filesNameCreator('kv', 'FujiBrontosaurus'),
    kv_info: filesNameCreator('kv_info', 'FujiBrontosaurus'),
    kv_description: filesNameCreator('kv_description', 'FujiBrontosaurus'),
    main: filesNameCreator('main', 'FujiBrontosaurus'),
    banner: filesNameCreator('banner', 'FujiBrontosaurus'),
    youtube: filesNameCreator('youtube', 'FujiBrontosaurus'),
    website: filesNameCreator('website', 'FujiBrontosaurus'),
    creationIsJson: true,
  },
  teacherday2019: {
    name: 'teacherday2019',
    title: '憶起教師節',
    artist_name: '憶起教師節',
    artist: filesNameCreator('artist', 'teacherday2019', 0),
    creation: filesNameCreator('creation', 'teacherday2019', 6),
    curator: filesNameCreator('curator', 'teacherday2019'),
    kv: filesNameCreator('kv', 'teacherday2019'),
    kv_info: filesNameCreator('kv_info', 'teacherday2019'),
    kv_description: filesNameCreator('kv_description', 'teacherday2019'),
    main: filesNameCreator('main', 'teacherday2019'),
    banner: filesNameCreator('banner', 'teacherday2019'),
    youtube: filesNameCreator('youtube', 'teacherday2019'),
    website: filesNameCreator('website', 'teacherday2019'),
    creationIsJson: true,
  },
  IfCanBeRe: {
    name: 'IfCanBeRe',
    title: '如果____可以重來',
    artist_name: 'Benedict Yu',
    artist: filesNameCreator('artist', 'IfCanBeRe', 1),
    creation: filesNameCreator(
      'creation',
      'IfCanBeRe',
      57,
      [1, 9, 10, 13, 14, 15, 16, 19, 20, 23, 24, 25, 27, 29, 32, 34, 35, 36, 39, 43, 48, 53],
      [7, 6, 6, 1, 1, 1, 1, 1, 2, 1, 3, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ),
    curator: filesNameCreator('curator', 'IfCanBeRe'),
    kv: filesNameCreator('kv', 'IfCanBeRe'),
    kv_info: filesNameCreator('kv_info', 'IfCanBeRe'),
    kv_description: filesNameCreator('kv_description', 'IfCanBeRe'),
    main: filesNameCreator('main', 'IfCanBeRe'),
    banner: filesNameCreator('banner', 'IfCanBeRe'),
    youtube: filesNameCreator('youtube', 'IfCanBeRe'),
    website: filesNameCreator('website', 'IfCanBeRe'),
    creationIsJson: true,
    hyper_link: {
      link: 'https://bit.ly/if____canbere-____',
      text: '展覽介紹',
    },
    teamSetting: {
      isUpsideDown: true,
      artistTitle: '藝術家&策展人',
      curatorTitle: '駐村空間與協助展出',
    },
  },
  meme: {
    name: 'meme',
    title: '初階迷因檢定 Meme Proficiency Test: Beginner',
    artist_name: '國立臺北藝術大學新媒體藝術學系105級',
    artist: filesNameCreator('artist', 'meme', 37),
    creation: filesNameCreator(
      'creation',
      'meme',
      12,
      [1, 2, 4, 5, 7, 9, 12],
      [1, 1, 1, 1, 1, 1, 1]
    ),
    curator: filesNameCreator('curator', 'meme'),
    kv: filesNameCreator('kv', 'meme'),
    kv_info: filesNameCreator('kv_info', 'meme'),
    kv_description: filesNameCreator('kv_description', 'meme'),
    main: filesNameCreator('main', 'meme'),
    banner: filesNameCreator('banner', 'meme'),
    youtube: filesNameCreator('youtube', 'meme'),
    website: filesNameCreator('website', 'meme'),
    creationIsJson: true,
    hyper_link: {
      link: 'https://www.facebook.com/109427027199076/videos/2833338010045765/',
      text: '展覽介紹',
    },
  },
  siaoliam: {
    name: 'siaoliam',
    title: '少年做眠夢 [Siao Liam, ze ming mang]',
    artist_name: '國立臺南藝術大學材質創作與設計系第十一屆畢籌會',
    artist: filesNameCreator('artist', 'siaoliam', 49),
    creation: filesNameCreator(
      'creation',
      'siaoliam',
      49,
      [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        49,
      ],
      [
        2,
        4,
        4,
        4,
        4,
        4,
        4,
        6,
        4,
        4,
        4,
        2,
        4,
        4,
        3,
        3,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        3,
        4,
        4,
        4,
        4,
        2,
        4,
        4,
        4,
        4,
        4,
        3,
        2,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        3,
        2,
      ]
    ),
    curator: filesNameCreator('curator', 'siaoliam'),
    kv: filesNameCreator('kv', 'siaoliam'),
    kv_info: filesNameCreator('kv_info', 'siaoliam'),
    kv_description: filesNameCreator('kv_description', 'siaoliam'),
    main: filesNameCreator('main', 'siaoliam'),
    banner: filesNameCreator('banner', 'siaoliam'),
    youtube: filesNameCreator('youtube', 'siaoliam'),
    website: filesNameCreator('website', 'siaoliam'),
    creationIsJson: true,
  },
  visiblesecrets: {
    name: 'visiblesecrets',
    title:
      '看得見的秘密- 視覺音樂的秘境探索  Visible Secrets: Exploring the Secret World of Visual Music',
    artist_name: '藝術銀行',
    artist: filesNameCreator('artist', 'visiblesecrets', 0),
    creation: filesNameCreator('creation', 'visiblesecrets', 16),
    curator: filesNameCreator('curator', 'visiblesecrets'),
    kv: filesNameCreator('kv', 'visiblesecrets'),
    kv_info: filesNameCreator('kv_info', 'visiblesecrets'),
    kv_description: filesNameCreator('kv_description', 'visiblesecrets'),
    main: filesNameCreator('main', 'visiblesecrets'),
    banner: filesNameCreator('banner', 'visiblesecrets'),
    youtube: filesNameCreator('youtube', 'visiblesecrets'),
    website: filesNameCreator('website', 'visiblesecrets'),
    creationIsJson: true,
    teamSetting: {
      artistTitle: '參展藝術家',
    },
  },
  shoutouttotheworld: {
    name: 'shoutouttotheworld',
    title: '噪物者',
    artist_name: '淡江大學大眾傳播學系第34屆',
    artist: filesNameCreator('artist', 'shoutouttotheworld', 0),
    creation: filesNameCreator(
      'creation',
      'shoutouttotheworld',
      11,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      [2, 2, 3, 3, 2, 3, 3, 3, 3, 3, 3]
    ),
    curator: filesNameCreator('curator', 'shoutouttotheworld'),
    kv: filesNameCreator('kv', 'shoutouttotheworld'),
    kv_info: filesNameCreator('kv_info', 'shoutouttotheworld'),
    kv_description: filesNameCreator('kv_description', 'shoutouttotheworld'),
    main: filesNameCreator('main', 'shoutouttotheworld'),
    banner: filesNameCreator('banner', 'shoutouttotheworld'),
    youtube: filesNameCreator('youtube', 'shoutouttotheworld'),
    website: filesNameCreator('website', 'shoutouttotheworld'),
    creationIsJson: true,
  },
  noneedtobepersonal: {
    name: 'noneedtobepersonal',
    title: '沒有必要搞得很私人',
    artist_name: '東海大學美術系',
    artist: filesNameCreator('artist', 'noneedtobepersonal', 41),
    creation: filesNameCreator('creation', 'noneedtobepersonal', 55),
    curator: filesNameCreator('curator', 'noneedtobepersonal'),
    kv: filesNameCreator('kv', 'noneedtobepersonal'),
    kv_info: filesNameCreator('kv_info', 'noneedtobepersonal'),
    kv_description: filesNameCreator('kv_description', 'noneedtobepersonal'),
    main: filesNameCreator('main', 'noneedtobepersonal'),
    banner: filesNameCreator('banner', 'noneedtobepersonal'),
    youtube: filesNameCreator('youtube', 'noneedtobepersonal'),
    website: filesNameCreator('website', 'noneedtobepersonal'),
    creationIsJson: true,
  },
  hetdialog: {
    name: 'hetdialog',
    title: '異質對話',
    artist_name: '國立清華大學藝術與設計學系109',
    artist: filesNameCreator('artist', 'hetdialog', 41),
    creation: filesNameCreator(
      'creation',
      'hetdialog',
      36,
      [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
      ],
      [
        8,
        4,
        8,
        6,
        7,
        4,
        3,
        4,
        6,
        4,
        4,
        7,
        5,
        3,
        2,
        4,
        1,
        4,
        2,
        6,
        6,
        6,
        5,
        1,
        1,
        2,
        4,
        2,
        1,
        7,
        4,
        1,
        4,
        3,
        4,
        6,
      ]
    ),
    curator: filesNameCreator('curator', 'hetdialog'),
    kv: filesNameCreator('kv', 'hetdialog'),
    kv_info: filesNameCreator('kv_info', 'hetdialog'),
    kv_description: filesNameCreator('kv_description', 'hetdialog'),
    main: filesNameCreator('main', 'hetdialog'),
    banner: filesNameCreator('banner', 'hetdialog'),
    youtube: filesNameCreator('youtube', 'hetdialog'),
    website: filesNameCreator('website', 'hetdialog'),
    creationIsJson: true,
  },
  outofsignalrange: {
    name: 'outofsignalrange',
    title: '收訊範圍外 DOTS WILL BE FOUND',
    artist_name: '華梵大學美術與文創學系',
    artist: filesNameCreator('artist', 'outofsignalrange', 60),
    creation: filesNameCreator('creation', 'outofsignalrange', 55, [28, 29, 30], [9, 2, 1]),
    curator: filesNameCreator('curator', 'outofsignalrange'),
    kv: filesNameCreator('kv', 'outofsignalrange'),
    kv_info: filesNameCreator('kv_info', 'outofsignalrange'),
    kv_description: filesNameCreator('kv_description', 'outofsignalrange'),
    main: filesNameCreator('main', 'outofsignalrange'),
    banner: filesNameCreator('banner', 'outofsignalrange'),
    youtube: filesNameCreator('youtube', 'outofsignalrange'),
    website: filesNameCreator('website', 'outofsignalrange'),
    creationIsJson: true,
  },
  dbyprint: {
    name: 'dbyprint',
    title: '中華民國第十九屆國際版畫雙年展  International Biennial Print Exhibit: 2020 R.O.C.',
    artist_name: '國立臺灣美術館',
    artist: filesNameCreator('artist', 'dbyprint', 0),
    creation: filesNameCreator('creation', 'dbyprint', 15),
    curator: filesNameCreator('curator', 'dbyprint'),
    kv: filesNameCreator('kv', 'dbyprint'),
    kv_info: filesNameCreator('kv_info', 'dbyprint'),
    kv_description: filesNameCreator('kv_description', 'dbyprint'),
    main: filesNameCreator('main', 'dbyprint'),
    banner: filesNameCreator('banner', 'dbyprint'),
    youtube: filesNameCreator('youtube', 'dbyprint'),
    website: filesNameCreator('website', 'dbyprint'),
    creationIsJson: true,
  },
  secretsouth: {
    name: 'secretsouth',
    title: '秘密南方：典藏作品中的冷戰視角及全球南方',
    artist_name: '臺北市立美術館',
    artist: filesNameCreator('artist', 'secretsouth', 0),
    creation: filesNameCreator('creation', 'secretsouth', 90, [12, 51, 66, 88], [1, 1, 2, 1]),
    curator: filesNameCreator('curator', 'secretsouth'),
    kv: filesNameCreator('kv', 'secretsouth'),
    kv_info: filesNameCreator('kv_info', 'secretsouth'),
    kv_description: filesNameCreator('kv_description', 'secretsouth'),
    main: filesNameCreator('main', 'secretsouth'),
    banner: filesNameCreator('banner', 'secretsouth'),
    youtube: filesNameCreator('youtube', 'secretsouth'),
    website: filesNameCreator('website', 'secretsouth'),
    creationIsJson: true,
  },
  youareme: {
    name: 'youareme',
    title: 'YOU ARE ME—共譜新地域 YOU ARE ME—Mapping New Geographies',
    artist_name: '新竹市美術館  Hsinchu City Art Gallery',
    artist: filesNameCreator('artist', 'youareme', 7),
    creation: filesNameCreator('creation', 'youareme', 10, [1, 4], [4, 1]),
    curator: filesNameCreator('curator', 'youareme'),
    kv: filesNameCreator('kv', 'youareme'),
    kv_info: filesNameCreator('kv_info', 'youareme'),
    kv_description: filesNameCreator('kv_description', 'youareme'),
    main: filesNameCreator('main', 'youareme'),
    banner: filesNameCreator('banner', 'youareme'),
    youtube: filesNameCreator('youtube', 'youareme'),
    website: filesNameCreator('website', 'youareme'),
    creationIsJson: true,
  },
  underskyofplague: {
    name: 'underskyofplague',
    title: '在瘟疫的天空下：病毒的隱喻及其他 Under the Pandemic: The Metaphor of Virus and Others',
    artist_name: '藝術銀行  Art Bank Taiwan',
    artist: filesNameCreator('artist', 'underskyofplague', 0),
    creation: filesNameCreator('creation', 'underskyofplague', 14, [8], [4]),
    curator: filesNameCreator('curator', 'underskyofplague'),
    kv: filesNameCreator('kv', 'underskyofplague'),
    kv_info: filesNameCreator('kv_info', 'underskyofplague'),
    kv_description: filesNameCreator('kv_description', 'underskyofplague'),
    main: filesNameCreator('main', 'underskyofplague'),
    banner: filesNameCreator('banner', 'underskyofplague'),
    youtube: filesNameCreator('youtube', 'underskyofplague'),
    website: filesNameCreator('website', 'underskyofplague'),
    creationIsJson: true,
  },
};

export { files };
