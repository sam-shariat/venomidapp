import { BgColorItem, LinkType, BgImageItem } from 'types';

export const MINT_OPEN = false;
export const MINT_DATE = 'Dec 18, 2023 18:00:00 UTC';
export const MINT_MESSAGE = 'Minting will reopen at';
export const SITE_URL = 'https://venomid.network/';
export const SITE_TITLE = 'Venom ID';
export const SITE_DESCRIPTION = 'Your entire virtual identity in the blockchain in one simple link';
export const SITE_FULL_DESCRIPTION =
  'With VenomID, you can assign human-readable names to your blockchain and non-blockchain resources like Venom, BTC and ETH addresses, Links and more';
export const NFT_IMAGE_URL = 'https://ipfs.io/ipfs/QmUvfedgHDXdiMsq5nfLPGLQrR4QAYXHzR5SETBZQ6RGyd';
export const SITE_MANAGE_URL = 'https://venomid.tools/';
export const SITE_PROFILE_URL = 'https://venomid.link/';
export const ZEALY_URL = 'https://zealy.io/c/venomid/';
export const AVATAR_API_URL = 'https://venomid.link/api/avatar?name=';
export const VENOMSCAN_NFT = 'https://testnet.venomscan.com/accounts/';
export const VENTORY_NFT = 'https://testnet.ventory.gg/nft/';
export const VENOMART_NFT = 'https://testnet.venomart.io/nft/';
export const BTCSCAN_ADDRESS = 'https://blockchair.com/bitcoin/';
export const ETHERSCAN_ADDRESS = 'https://etherscan.io/address/';
export const CONTRACT_ADDRESS =
  '0:5ecadfe4afcf90452bc448b5dabffeca63939bfce866f248d9493f57e748aff3';
export const CONTRACT_ADDRESS_V1 =
  '0:0f158efd58c06ff2f84726425de63d3deb4037d2c621ccd552cec61d6b6ee5bd';
export const CONTRACT_ADDRESS_V2 =
  '0:2787ba200fd3e45c1a4854768f69310fe4e9566383761f27936aff61ad79c8ab';
//'0:7f70fd1850b1949b84528ed43593f63f45118006fdb73bd88d69f29122993b7b'
//'0:2787ba200fd3e45c1a4854768f69310fe4e9566383761f27936aff61ad79c8ab';
//'0:427fba7e85388da8c7c0b21192bfcd4fbfba8f041823300a1a657f9f5cbdb490';
export const ZERO_ADDRESS = '0:0000000000000000000000000000000000000000000000000000000000000000';
export const SOCIAL_TWITTER = 'venomid_network';
export const TWITTER_URL = 'https://twitter.com/';
export const GITHUB_URL = 'https://github.com/sam-shariat/venomidapp';
export const TELEGRAM_URL = 'https://t.me/venomid_network';
export const MEDIUM_URL = 'https://medium.com/@venomidapp';
export const YLIDE_URL = 'https://hub.ylide.io/project/venom_id/discussion';
export const YOUTUBE_URL = 'https://www.youtube.com/@VenomID_Network';
export const OPENSEA_URL = 'https://opensea.io/assets/';
export const FAUCET_URL = 'https://venom.network/tasks';
export const MARKETPLACE_URLS: any = {
  venomtestnet: 'https://testnet.ventory.gg/nft/',
  ethereum: 'https://opensea.io/assets/ethereum/',
  polygon: 'https://opensea.io/assets/matic/',
  arbitrum: 'https://opensea.io/assets/arbitrum/',
  optimism: 'https://opensea.io/assets/optimism/',
};

export const ETHERSCAN_URLS: any = {
  venomtestnet: 'https://testnet.venomscan.com/accounts/',
  ethereum: 'https://etherscan.io/address/',
  polygon: 'https://polygonscan.com/address/',
  arbitrum: 'https://arbiscan.io/address/',
  optimism: 'https://optimistic.etherscan.io/address/',
};

export const IPFS_URLS = [
  'https://cf-ipfs.com/ipfs/',
  'https://gateway.ipfs.io/',
  'https://gateway.pinata.cloud/ipfs/',
  'https://10.via0.com/ipfs/',
  'https://ipfs.cf-ipfs.com/',
];

export const SIGN_MESSAGE =
  'Welcome to Venom ID. By signing this message, you agree with our terms and conditions.';

export const DONATE_VALUES: any = {
  venomtestnet: ['1 VENOM', '10 VENOM', '50 VENOM'],
  ethereum: ['0.001 ETH', '0.01 ETH', '0.05 ETH'],
  bitcoin: ['0.0001 BTC', '0.001 BTC', '0.005 BTC'],
  paypal: ['1 USD', '10 USD', '50 USD'],
};

export const LINK_VALIDATION_REGEX =
  '^(https?:\\/\\/)?' + // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
  '(\\#[-a-z\\d_]*)?$';

export const YOUTUBE_LINK_VALIDATION_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

export const SOUNDCLOUD_LINK_REGEX =
  /https?:\/\/(?:w\.|www\.|)(?:soundcloud\.com\/)(?:(?:player\/\?url=https\%3A\/\/api.soundcloud.com\/tracks\/)|)(((\w|-)[^A-z]{7})|([A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*(?!\/sets(?:\/|$))(?:\/[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*){1,2}))/;

export const TWITTER_STATUS_REGEX =
  /^https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)$/;

export const EXAMPLE_SOCIAL_URLS: any = {
  twitter: 'https://twitter.com/exampleuser',
  linkedin: 'https://www.linkedin.com/in/exampleuser/',
  github: 'https://github.com/exampleuser',
  medium: 'https://medium.com/@exampleuser',
  youtube: 'https://www.youtube.com/@exampleuser',
  instagram: 'https://www.instagram.com/exampleuser',
  tiktok: 'https://www.tiktok.com/@exampleuser',
  twitch: 'https://www.twitch.tv/exampleuser',
  snapchat: 'https://www.snapchat.com/add/exampleuser',
  facebook: 'https://www.facebook.com/exampleuser',
  dribbble: 'https://dribbble.com/exampleuser',
  pinterest: 'https://www.pinterest.com/exampleuser',
  soundcloud: 'https://soundcloud.com/exampleuser',
  spotify: 'https://open.spotify.com/user/exampleuser',
  patreon: 'https://www.patreon.com/exampleuser',
  substack: 'https://exampleuser.substack.com',
  galxe: 'https://galxe.com/exampleuser',
  opensea: 'https://opensea.io/exampleuser',
  zealy: 'https://zealy.io/c/exampleuser',
  ylide: 'https://ylide.com/@exampleuser',
  amazon: 'https://www.amazon.com/gp/profile/exampleuser',
  playstore: 'https://play.google.com/store/apps/developer?id=Example+User',
  appstore: 'https://apps.apple.com/us/developer/example-user/id123456789',
  applemusic: 'https://music.apple.com/profile/exampleuser',
  clubhouse: 'https://www.joinclubhouse.com/@exampleuser',
  etsy: 'https://www.etsy.com/shop/exampleuser',
  discord: 'https://discord.gg/exampleuser',
  skype: 'exampleuser',
  slack: 'https://exampleuser.slack.com',
  telegram: 'https://t.me/exampleuser',
  whatsapp: '44234567890',
  phone: '44234567890',
  email: 'example@example.com',
};

export const EXAMPLE_LINK_URLS: any = {
  nftlink: 'https://yourlink.com',
  simplelink: 'https://yourlink.com',
  imagelink: 'https://yourlink.com',
  youtubevideo: 'https://www.youtube.com/watch?v=6Bq132cv_G0',
  soundcloudtrack: 'https://soundcloud.com/symbolico/im-free',
  tweet: 'https://x.com/SamyWalters/status/1720165257019073014',
};

export const EXAMPLE_WALLETS: any = {
  venom: '0:4bc69a8c3889adee39f6f1e3b2353c86f960c9b835e93397a2015a62a4823765',
  ethereum: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
  bitcoin: 'bc1qpvsvcfzvz59h02hcuvc8y8jj385r2mlhnkt654',
  polygon: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
  arbitrum: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
  binance: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
  avalanche: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
  optimism: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
  solana: 'BfiZDeHXzuz8pz5EGM6eUv1B1hLsGJQPRoxqYsBRKW3i',
  tron: 'TR22H7PLMm1BUaGfhmfnPY7VLEhG2U6y3t',
};

export const SOCIALS: string[] = [
  'Twitter',
  'Linkedin',
  'Github',
  'Medium',
  'Youtube',
  'Instagram',
  'TikTok',
  'Twitch',
  'Snapchat',
  'Facebook',
  'Dribbble',
  'Pinterest',
  'Soundcloud',
  'Spotify',
  'Patreon',
  'Substack',
  'Galxe',
  'Opensea',
  'Zealy',
  'Ylide',
  'Amazon',
  'Play Store',
  'App Store',
  'Apple Music',
  'Clubhouse',
  'Etsy',
  'Discord',
  'Skype',
  'Slack',
  'Telegram',
  'Whatsapp',
  'Phone',
  'Email',
];

export const WALLETS = [
  'Venom',
  'Ethereum',
  'Bitcoin',
  'Polygon',
  'Arbitrum',
  'Binance',
  'Avalanche',
  'Optimism',
  'Solana',
  'Tron',
];

export const BG_COLORS: BgColorItem[] = [
  { color: 'var(--darkGradient)', lightMode: false },
  { color: 'var(--dark)', lightMode: false },
  { color: 'var(--dark1)', lightMode: false },
  { color: 'var(--gray)', lightMode: true },
  { color: 'var(--lightGrey)', lightMode: true },
  { color: 'var(--lightGradient)', lightMode: true },
  { color: 'var(--venomGradient)', lightMode: false },
  { color: 'var(--purpleGradient)', lightMode: false },
  { color: 'var(--redGradient)', lightMode: false },
  { color: 'var(--blueGradient)', lightMode: true },
  { color: 'var(--orangeGradient)', lightMode: true },
  { color: 'var(--yellowGradient)', lightMode: true },
];

export const BG_IMAGES: BgImageItem[] = [
  { bg: 'var(--bg1Gradient)', lightMode: false },
  { bg: 'var(--bg3Gradient)', lightMode: false },
  { bg: 'var(--bg2Gradient)', lightMode: true },
];

export const AVAILABLE_LINKS: LinkType[] = [
  { type: 'heading', av: true, reg: '' },
  { type: 'text paragraph', av: true, reg: '' },
  { type: 'nft link', av: true, reg: '' },
  { type: 'simple link', av: true, reg: LINK_VALIDATION_REGEX },
  { type: 'image link', av: true, reg: LINK_VALIDATION_REGEX },
  { type: 'tweet', av: true, reg: TWITTER_STATUS_REGEX },
  { type: 'ipfs image', av: true, reg: '' },
  { type: 'youtube video', av: true, reg: YOUTUBE_LINK_VALIDATION_REGEX },
  { type: 'soundcloud track', av: true, reg: SOUNDCLOUD_LINK_REGEX },
  { type: 'pdf document', av: true, reg: LINK_VALIDATION_REGEX },
  { type: 'donate button', av: true, reg: '' },
  { type: 'payment button', av: true, reg: '' },
  { type: 'nft gallery', av: false, reg: '' },
  { type: 'nft collection', av: false, reg: '' },
  { type: 'token link', av: false, reg: '' },
  { type: 'typeform', av: false, reg: '' },
  { type: 'contact form', av: false, reg: '' },
  { type: 'contact info', av: false, reg: '' },
];

export const BUTTON_BG_COLORS = [
  'dark',
  'light',
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
];
export const BUTTON_ROUNDS = ['none', 'md', 'full'];
export const BUTTON_VARIANTS = ['solid', 'outline', 'pop', 'border', 'border2', 'fill'];
export const FONTS = ['Poppins', 'Lato', 'Pixelify Sans', 'Space Mono', 'Playfair Display', 'Jost'];

export const VARIATIONS = [
  {
    avatar: 'https://ipfs.io/ipfs/QmQSKU12cc8qJSVNbGUrNWwdfFZiMWn8Xh2egovR8dUXGQ/john.jpg',
    avatarShape: 'hex',
    bg: BG_COLORS[0].color,
    lightMode: BG_COLORS[0].lightMode,
    buttonBg: BUTTON_BG_COLORS[1],
    variant: BUTTON_VARIANTS[0],
    round: BUTTON_ROUNDS[1],
    font: FONTS[0],
    title: 'Jonathan Due',
    subtitle: 'Crypto Agent',
    vid: 'jonathon.VID',
  },
  {
    avatar:
      'https://ipfs.io/ipfs/QmTNgHnxMXqcno1A85vG3qxpsJty91FJDfXh6Mfi7HwRyB/vidiconcircle%20(1).png',
    avatarShape: 'circle',
    bg: BG_IMAGES[2].bg,
    lightMode: BG_IMAGES[2].lightMode,
    buttonBg: BUTTON_BG_COLORS[0],
    variant: BUTTON_VARIANTS[2],
    round: BUTTON_ROUNDS[2],
    font: FONTS[0],
    title: 'VenomID APP',
    subtitle: 'Decentralized APP',
    vid: 'venomid.VID',
  },
  {
    avatar: 'https://ipfs.io/ipfs/QmWm9XDd6f2q1ESG7wR6pJxGQCSRpGfKyB2mC25wCvkZLw',
    avatarShape: 'hex',
    bg: BG_COLORS[1].color,
    lightMode: BG_COLORS[1].lightMode,
    buttonBg: BUTTON_BG_COLORS[8],
    variant: BUTTON_VARIANTS[1],
    round: BUTTON_ROUNDS[1],
    font: FONTS[2],
    title: 'Tomy Williams',
    subtitle: 'Crypto Enthusiast',
    vid: 'tomwilliams.VID',
  },
  {
    avatar: 'https://ipfs.io/ipfs/QmeTz133js4XjdXbbPRAW5CYTMankbhLt6FGGogaiBhQBx',
    avatarShape: 'circle',
    bg: BG_COLORS[9].color,
    lightMode: BG_COLORS[9].lightMode,
    buttonBg: BUTTON_BG_COLORS[1],
    variant: BUTTON_VARIANTS[4],
    round: BUTTON_ROUNDS[2],
    font: FONTS[0],
    title: 'Venom ID Passport',
    subtitle: 'NFT Collection',
    vid: 'passport.VID',
  },
  {
    avatar: 'https://nft-cdn.alchemy.com/arb-mainnet/af6fbf53fb1a6f0e582a3948ddc47d65',
    avatarShape: 'round',
    bg: BG_COLORS[10].color,
    lightMode: BG_COLORS[10].lightMode,
    buttonBg: BUTTON_BG_COLORS[1],
    variant: BUTTON_VARIANTS[3],
    round: BUTTON_ROUNDS[0],
    font: FONTS[2],
    title: 'Sam Walters',
    subtitle: 'Blockchain Developer',
    vid: 'sam.VID',
  },
  {
    avatar: 'https://nft-cdn.alchemy.com/matic-mainnet/da195f672ee72993f128fc4a02880d49',
    avatarShape: 'circle',
    bg: BG_COLORS[6].color,
    lightMode: BG_COLORS[6].lightMode,
    buttonBg: BUTTON_BG_COLORS[1],
    variant: BUTTON_VARIANTS[5],
    round: BUTTON_ROUNDS[1],
    font: FONTS[3],
    title: 'Stoned Ape',
    subtitle: 'Crypto Analyst',
    vid: 'stonedape.VID',
  },
];

export const LINK_VARIATIONS = [
  [
    {
      type: 'donate button',
      title: 'Buy me a coffee',
      content: 'Thank you very much for your donation',
      styles: {
        venom: '0:4bc69a8c3889adee39f6f1e3b2353c86f960c9b835e93397a2015a62a4823765',
        eth: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
        btc: 'tb1qshvfpzfa0p46gztp00jwccf0c4kdfac72lmuz7',
      },
    },
    {
      type: 'simple link',
      title: 'Message me',
      url: 'https://t.me/venomid_network',
      styles: {
        icon: 'RiTelegramFill',
        size: 'md'
      },
    },
  ],
  [
    {
      type: 'payment button',
      title: 'Make A Payment',
      content: 'Thank you very much for your Payment',
      styles: {
        venom: '0:4bc69a8c3889adee39f6f1e3b2353c86f960c9b835e93397a2015a62a4823765',
        eth: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
        btc: 'tb1qshvfpzfa0p46gztp00jwccf0c4kdfac72lmuz7',
      },
    },
    {
      type: 'soundcloud track',
      title: 'music',
      styles: {
        size: 'md',
      },
      url: 'https://soundcloud.com/prod-inverted/skylar-grey-last-one-standing-remix-ft-xxxtentacion-polo-g-mozzy-eminem',
    },
  ],
  [
    {
      type: 'tweet',
      title: 'tweet',
      url: 'https://twitter.com/SamyWalters/status/1720165257019073014',
    },
  ],
  [
    {
      type: 'youtube video',
      title: 'video',
      url: 'https://www.youtube.com/watch?v=-uLJa7MDHXs',
      image: '',
      content: '',
      styles: {
        size: 'sm',
      },
    },
    {
      type: 'simple link',
      title: 'Youtube Channel',
      url: 'https://www.youtube.com/@Venomid_network',
      styles: {
        icon: 'RiYoutubeFill',
        size: 'md'
      },
    },
  ],
  [
    {
      type: 'pdf document',
      title: 'My Old CV',
      url: '',
      image: 'https://ipfs.io/ipfs/QmUeSvTQtZiBoa344JvfA8ekeKFH8pRMk8sY3tBjDEG3d9/CV.pdf',
      content: '',
      styles: {
        size: 'md'
      },
    },
    {
      type: 'nft link',
      title: 'Bear Market Builder NFT',
      url: 'https://opensea.io/assets/polygon/0x3C29F6B19bcbeB85d26460bB2f7Bd4cd065cE28E/0',
      image: 'https://nft-cdn.alchemy.com/matic-mainnet/2e664665ea294c94798de67894c608ac',
      content:
        '{"address":"0x3C29F6B19bcbeB85d26460bB2f7Bd4cd065cE28E/0","metadata":{"image":"ipfs://QmTNi5umYXWV2THy65WDUMszTdHvuQRsZ9RuUmR7GEJyFx/bear-market-builder.png","external_url":"","animation_url":"ipfs://QmTNi5umYXWV2THy65WDUMszTdHvuQRsZ9RuUmR7GEJyFx/bear-market-builder.mp4","background_color":"","name":"Bear Market Builder NFT","description":"","attributes":[{"value":"common","trait_type":"rarity"}],"supply":"98477"}}',
      styles: {
        size: 'sm',
        scanLink: false,
        network: 'polygon',
        type: 'complex',
      },
    },
  ],
  [
    {
      type: 'nft link',
      title: 'Venom ID NFT #406',
      url: 'https://testnet.ventory.gg/nft/0:6cf1db7a90e005a8f582a75c95ea2fac36fbe695c210bff42d5e884ded91b428',
      image: 'https://ipfs.ventory.gg:443/ventory/upload-quest/111gif1691486132060.gif',
      content: '0:6cf1db7a90e005a8f582a75c95ea2fac36fbe695c210bff42d5e884ded91b428',
      styles: {
        scanLink: false,
        size: 'sm',
        network: 'venom testnet',
        type: 'normal',
      },
    },
  ],
];

export const SOCIALS_VARIATIONS = [
  {
    discord: '#',
    email: '#',
    twitter: '#',
    telegram: '#',
    whatsapp: '#',
  },
  {
    twitter: 'https://twitter.com/Venomid_network',
    ylide: 'https://hub.ylide.io/project/venom_id/discussion',
    medium: 'https://medium.com/@venomidapp',
    zealy: 'https://zealy.io/c/venomid/questboard',
    telegram: 'https://t.me/venomid_network',
  },
  {
    soundcloud: '#',
    opensea: '#',
    patreon: '#',
    twitter: '#',
    spotify: '#',
  },
  {
    telegram: 'https://t.me/venomid_network',
    ylide: 'https://hub.ylide.io/project/venom_id/discussion',
    zealy: 'https://zealy.io/c/venomid/questboard',
    github: 'https://github.com/sam-shariat/venomid-link',
    youtube: 'https://www.youtube.com/@VenomID_Network',
  },
  {
    facebook: '#',
    twitch: '#',
    snapchat: '#',
    tiktok: '#',
  },
  {
    pinterest: '#',
    slack: '#',
    skype: '#',
    dribbble: '#',
    twitter: '#',
  },
];

export const WALLETS_VARIATIONS = [
  {
    venom: '0:4bc69a8c3889adee39f6f1e3b2353c86f960c9b835e93397a2015a62a4823765',
    eth: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
    btc: 'tb1qshvfpzfa0p46gztp00jwccf0c4kdfac72lmuz7',
  },
  {
    venom: '0:4bc69a8c3889adee39f6f1e3b2353c86f960c9b835e93397a2015a62a4823765',
  },
  {
    arbitrum: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
  },
  {
    venom: '0:4bc69a8c3889adee39f6f1e3b2353c86f960c9b835e93397a2015a62a4823765',
  },
  {
    solana: 'BfiZDeHXzuz8pz5EGM6eUv1B1hLsGJQPRoxqYsBRKW3i',
    eth: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
  },
  {
    venom: '0:4bc69a8c3889adee39f6f1e3b2353c86f960c9b835e93397a2015a62a4823765',
    optimism: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
    polygon: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
  },
];

export const TOUR_STEPS = [
  {
    element: '.title',
    intro: `Please provide a title for your Venom ID by entering your name or brand name, for example: John Doe.`,
  },
  {
    element: '.subtitle',
    intro: `Please enter a subtitle for your Venom ID, for example: Content Manager.`,
  },
  {
    element: '.avatar',
    intro: `Upload an avatar image for your Venom ID or choose one from your NFTs.`,
  },
  {
    element: '.bio',
    intro: `Please enter a short description for your Venom ID Profile, for example: I love Blockchain and AI/ML technologies and currently am learning how to read and write smart contracts.`,
  },
  {
    element: '.wallets',
    intro: `Your Venom wallet address is added to your Venom ID, You can add your wallet addresses from another chains, for example: Ethereum, BTC, Solana and More`,
  },
  {
    element: '.links',
    intro: `Add your resources like Headings, Texts, Links, Images, NFTs, Youtube Video, Soundcloud Track, Donate or Payment Button and More`,
  },
  {
    element: '.socials',
    intro: `Add a social media link to your Venom ID, for example: Twitter, Instagram, LinkedIn, Github and More`,
  },
  {
    element: '.add',
    intro: `Add your resources like wallet addresses, social media links, Headings, Texts, Links, Images, NFTs, Youtube Video, Soundcloud Track, Donate or Payment Button and More`,
  },
  {
    element: '.design',
    intro: `Design your Venom ID the way you like it! change the background color, customize the buttons style and font. change the layout and other settings`,
  },
  {
    element: '.save',
    intro: `Save your changes to the blockchain`,
  },
  {
    element: '.share',
    intro: `Share your Venom ID with the world`,
  },

  // ...
];
