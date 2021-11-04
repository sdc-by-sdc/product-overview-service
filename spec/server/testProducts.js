const testProducts = [
  {
    id: 1,
    name: 'Camo Onesie',
    slogan: 'Blend in to your crowd',
    description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
    category: 'Jackets',
    defaultPrice: '140',
    features: [
      {
        feature: 'Fabric',
        value: 'Canvas',
          },
      {
        feature: 'Buttons',
        value: 'Brass',
          }
    ],
    related: [
      { relatedID: 2},
      { relatedID: 3},
      { relatedID: 8},
      { relatedID: 7}
    ],
    styles: [
      { styleID: 1},
      { styleID: 2},
      { styleID: 3},
      { styleID: 4},
      { styleID: 5},
      { styleID: 6}
    ],
  },
  {
    id: 2,
    name: 'Bright Future Sunglasses',
    slogan: "You've got to wear shades",
    description: "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
    category: 'Accessories',
    defaultPrice: '69',
    features: [
      {
        feature: 'Lenses',
        value: 'Ultrasheen',
          },
      {
        feature: 'UV Protection',
        value: 'null',
          },
      {
        feature: 'Frames',
        value: 'LightCompose',
          }
    ],
    related: [
      { relatedID: 3},
      { relatedID: 7},
      { relatedID: 6},
      { relatedID: 5}
    ],
    styles: [
      { styleID: 7},
      { styleID: 8},
      { styleID: 9},
      { styleID: 10}
    ]
  },
  {
    id: 3,
    name: 'Morning Joggers',
    slogan: 'Make yourself a morning person',
    description: "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
    category: 'Pants',
    defaultPrice: '40',
    features: [
      {
        feature: 'Fabric',
        value: '100% Cotton',
          },
      {
        feature: 'Cut',
        value: 'Skinny',
          }
    ],
    related: [
      { relatedID: 5},
      { relatedID: 9},
      { relatedID: 7},
      { relatedID: 2},
      { relatedID: 1}
    ],
    styles: [
      { styleID: 11},
      { styleID: 12},
      { styleID: 13},
      { styleID: 14},
      { styleID: 15},
      { styleID: 16}
    ]
  },
  {
    id: 4,
    name: "Slacker's Slacks",
    slogan: 'Comfortable for everything, or nothing',
    description: "I'll tell you how great they are after I nap for a bit.",
    category: 'Pants',
    defaultPrice: '65',
    features: [
      {
        feature: 'Fabric',
        value: '99% Cotton 1% Elastic',
          },
      {
        feature: 'Cut',
        value: 'Loose',
          }
    ],
    related: [
      { relatedID: 1},
      { relatedID: 2},
      { relatedID: 4},
      { relatedID: 5},
      { relatedID: 8}
    ],
    styles: [
      { styleID: 17},
      { styleID: 18},
      { styleID: 19},
      { styleID: 20},
      { styleID: 21},
      { styleID: 22},
      { styleID: 23},
      { styleID: 24},
      { styleID: 25}
    ]
  },
  {
    id: 5,
    name: 'Heir Force Ones',
    slogan: 'A sneaker dynasty',
    description: "Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl",
    category: 'Kicks',
    defaultPrice: '99',
    features: [
      {
        feature: 'Sole',
        value: 'Rubber',
          },
      {
        feature: 'Material',
        value: 'FullControlSkin',
          },
      {
        feature: 'Mid-Sole',
        value: 'ControlSupport Arch Bridge',
          },
      {
        feature: 'Stitching',
        value: 'Double Stitch',
          }
    ],
    related: [
      { relatedID: 6},
      { relatedID: 6},
      { relatedID: 8},
      { relatedID: 9},
      { relatedID: 1},
      { relatedID: 3}
    ],
    styles: [
      { styleID: 26},
      { styleID: 27},
      { styleID: 28},
      { styleID: 29}
    ]
  },
  {
    id: 6,
    name: 'Pumped Up Kicks',
    slogan: 'Faster than a just about anything',
    description: 'The Pumped Up serves up crisp court style with a modern look. These shoes show off tennis-whites shades and are constructed with a supple leather upper and a classic rubber cupsole.',
    category: 'Kicks',
    defaultPrice: '89',
    features: [
      {
        feature: 'Sole',
        value: 'Rubber',
          },
      {
        feature: 'Material',
        value: 'FullControlSkin',
          },
      {
        feature: 'Mid-Sole',
        value: 'ControlSupport Arch Bridge',
          },
      {
        feature: 'Stitching',
        value: 'Double Stitch',
          }
    ],
    related: [
      { relatedID: 6},
      { relatedID: 2},
      { relatedID: 5},
      { relatedID: 3},
      { relatedID: 2}
    ],
    styles: [
      { styleID: 30},
      { styleID: 31}
    ]
  },
  {
    id: 7,
    name: 'Blues Suede Shoes',
    slogan: '2019 Stanley Cup Limited Edition',
    description: 'Touch down in the land of the Delta Blues in the middle of the pouring rain',
    category: 'Dress Shoes',
    defaultPrice: '120',
    features: [
      {
        feature: 'Sole',
        value: 'Rubber',
          },
      {
        feature: 'Material',
        value: 'FullControlSkin',
          },
      {
        feature: 'Stitching',
        value: 'Double Stitch',
          }
    ],
    related: [
      { relatedID: 1},
      { relatedID: 2},
      { relatedID: 3},
      { relatedID: 4},
      { relatedID: 5},
      { relatedID: 6},
      { relatedID: 7},
      { relatedID: 8},
      { relatedID: 9}
    ],
    styles: [
      { styleID: 32},
      { styleID: 33},
      { styleID: 34},
      { styleID: 35},
      { styleID: 36}
    ]
  },
  {
    id: 8,
    name: 'YEasy 350',
    slogan: 'Just jumped over jumpman',
    description: 'These stretchy knit shoes show off asymmetrical lacing and a big sculpted rubber midsole. In a nod to adidas soccer heritage.',
    category: 'Kicks',
    defaultPrice: '450',
    features: [
      {
        feature: 'Sole',
        value: 'Rubber',
          },
      {
        feature: 'Material',
        value: 'FullControlSkin',
          },
      {
        feature: 'Stitching',
        value: 'Double Stitch',
          }
    ],
    related: [
      { relatedID: 2},
      { relatedID: 3},
      { relatedID: 4},
      { relatedID: 7},
      { relatedID: 9},
      { relatedID: 10}
    ],
    styles: [
      { styleID: 37},
      { styleID: 38},
      { styleID: 39},
      { styleID: 40},
      { styleID: 41},
      { styleID: 42},
      { styleID: 43},
      { styleID: 44},
      { styleID: 45}
    ]
  },
  {
    id: 9,
    name: 'Summer Shoes',
    slogan: 'A risky call in the spring or fall',
    description: 'Low-top panelled buffed leather and mesh sneakers. Sizing embroidered in black at round toe. Tonal lace-up closure. Pull-loop and rubberized style name at padded tongue. Padded collar. Pull-loop at heel collar. Logo embroidered in black at outer side. Tonal treaded rubber sole. Tonal stitching.',
    category: 'Kicks',
    defaultPrice: '59',
    features: [
      {
        feature: 'Sole',
        value: 'Rubber',
          },
      {
        feature: 'Material',
        value: 'FullControlSkin',
          },
      {
        feature: 'Mid-Sole',
        value: 'ControlSupport Arch Bridge',
          },
      {
        feature: 'Stitching',
        value: 'Double Stitch',
          }
    ],
    related: [
      { relatedID: 1},
      { relatedID: 2},
      { relatedID: 6},
      { relatedID: 7},
      { relatedID: 5},
      { relatedID: 8}
    ],
    styles: [ { styleID: 46} ]
  },
  {
    id: 10,
    name: 'Infinity Stone',
    slogan: 'Reality is often disappointing. That is, it was. Now, reality can be whatever I want.',
    description: 'The Infinity Stones are six immensely powerful stone-like objects tied to different aspects of the universe, created by the Cosmic Entities. Each of the stones possesses unique capabilities that have been enhanced and altered by various alien civilizations for millennia.',
    category: 'Accessories',
    defaultPrice: '5000000',
    features: [],
    related: [],
    styles: [
      { styleID: 47},
      { styleID: 48},
      { styleID: 49},
      { styleID: 50},
      { styleID: 51},
      { styleID: 52}
    ]
  }
];

module.exports = testProducts;