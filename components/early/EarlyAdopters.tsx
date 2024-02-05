import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Stack,
  Textarea,
  Text,
  useColorMode,
  useMediaQuery,
  useDisclosure,
  useColorModeValue,
  HStack,
  Box,
  useToast,
  Badge,
  SimpleGrid,
} from '@chakra-ui/react';
import axios from 'axios';
import ImageBox from 'components/claiming/ImageBox';
import { LinkIcon } from 'components/logos';
import {
  bioAtom,
  connectedAccountAtom,
  earlyAdopterContractAtom,
  twitterAuthAtom,
  twitterFollowedAtom,
  twitterRetweetedAtom,
  twitterVerifiedAtom,
} from 'core/atoms';
import { useTranslate } from 'core/lib/hooks/use-translate';
import {
  CONTRACT_ADDRESS,
  CONTRACT_ADDRESS_V1,
  EARLY_ADOPTERS_CONTRACT_ADDRESS,
  EARLY_ADOPTER_IMAGES,
  ETHERSCAN_URLS,
  MARKETPLACE_URLS,
  MARKETPLACE_URLS_COLLECTION,
  ROOT_CONTRACT_ADDRESS,
  SITE_URL,
  TWITTER_FOLLOW_URL,
  TWITTER_RETWEET_URL,
  VENTORY_NFT_V1_ADDRESS,
  VENTORY_NFT_V2_ADDRESS,
  ZEALY_URL,
} from 'core/utils/constants';
import getNftsByAddress from 'core/utils/getNftsByAddress';
import { BaseNftJson, getAddressesFromIndex, getNftByIndex, saltCode } from 'core/utils/nft';
import { getTwitterAuthUrl, refreshAccessToken } from 'core/utils/twitterUtils';
import { getZealyByTwitterId } from 'core/utils/zealyUtils';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useConnect, useSendExternalMessage, useVenomProvider } from 'venom-react-hooks';
import { Address, Transaction } from 'everscale-inpage-provider';
import { sleep } from 'core/utils';

export default function EarlyAdopters() {
  const { colorMode } = useColorMode();
  const [notMobile] = useMediaQuery('(min-width: 768px)');
  const [small] = useMediaQuery('(min-width: 375px)');
  const [minteds, setMinteds] = useState<BaseNftJson[] | undefined>(undefined);
  const [unMinteds, setUnMinteds] = useState<BaseNftJson[] | undefined>(undefined);
  const [mintedStrings, setMintedStrings] = useState<string[] | undefined>(undefined);
  const { onToggle, isOpen } = useDisclosure();
  const [twitterAuthUrl, setTwitterAuthUrl] = useState('');
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const [twitterAuth, setTwitterAuth] = useAtom(twitterAuthAtom);
  const [twitterFollowed, setTwitterFollowed] = useAtom(twitterFollowedAtom);
  const [twitterRetweeted, setTwitterRetweeted] = useAtom(twitterRetweetedAtom);
  const [twitterUser, setTwitterUser] = useState({ id: '', name: '', username: '' });
  const [twitterVerified, setTwitterVerified] = useState(false);
  const [twitterLoading, setTwitterLoading] = useState(false);
  const [zealyLoading, setZealyLoading] = useState(false);
  const [zealyVerified, setZealyVerified] = useState(false);
  const [zealyUser, setZealyUser] = useState<any>({ id: '', xp: 0, rank: 0 });
  const [ownVidChecked, setOwnVidChecked] = useState(false);
  const [ownVid, setOwnVid] = useState(false);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMinting, setIsMinting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [ownVid1, setOwnVid1] = useState(false);
  const [ownVid2, setOwnVid2] = useState(false);
  const [ownVids, setOwnVids] = useState(0);
  const [ownVidLoading, setOwnVidLoading] = useState(false);
  const [ownVidVen, setOwnVidVen] = useState(false);
  const [ownVidVenChecked, setOwnVidVenChecked] = useState(false);
  const [ownVidVenLoading, setOwnVidVenLoading] = useState(false);
  const earlyAdopterContract = useAtomValue(earlyAdopterContractAtom);
  const toast = useToast();
  const { t } = useTranslate();
  const { provider } = useVenomProvider();

  const getJson = (name: string, image: string, imageType: string = 'image/svg') => {
    const _json = {
      type: 'OAT',
      name: name,
      description:
        name +
        ' OAT (On-Chain Achievement Token) is a badge to record your on-chain and off-chain activities from the Venom ID Early Adopter Program Collection',
      preview: {
        source: image,
        mimetype: imageType,
      },
      files: [
        {
          source: image,
          mimetype: imageType,
        },
      ],
      external_url: SITE_URL,
    };

    console.log(_json);
    return _json;
  };

  const mintBadge = async (name: string, image: string, imageType: string = 'image/svg') => {
    if (!connectedAccount || connectedAccount === '' || !provider || !provider.isInitialized) {
      toast({
        status: 'info',
        title: t('connectWallet'),
        description: t('venomWalletConnect'),
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsMinting(true);
    toast.closeAll();
    toast({
      status: 'loading',
      title: t('minting'),
      description: t('confirmInWallet'),
      duration: null,
    });

    // @ts-ignore: Unreachable code error
    try {
      const mintTx = await earlyAdopterContract?.methods
        .mintBadge({
          _json: JSON.stringify(getJson(name, image, imageType)),
          _owner: new Address(connectedAccount),
        })
        .send({
          amount: String(1660000000),
          bounce: true,
          from: connectedAccount,
        })
        .catch((e: any) => {
          if (e.code === 3) {
            // rejected by a user
            setIsMinting(false);
            toast.closeAll();
            return Promise.resolve(null);
          } else {
            setIsMinting(false);
            // console.log(e);
            toast.closeAll();
            return Promise.reject(e);
          }
        });

      if (mintTx) {
        toast.closeAll();
        toast({
          status: 'loading',
          title: t('confirming'),
          description: t('confirmingTx'),
          duration: null,
        });

        //// console.log('mint tx : ', mintTx);
        setIsConfirming(true);
        let receiptTx: Transaction | undefined;
        const subscriber = provider && new provider.Subscriber();
        if (subscriber)
          await subscriber
            .trace(mintTx)
            .tap((tx_in_tree: any) => {
              //// console.log('tx_in_tree : ', tx_in_tree);
              if (tx_in_tree.account.equals(EARLY_ADOPTERS_CONTRACT_ADDRESS)) {
                receiptTx = tx_in_tree;
              }
            })
            .finished();

        // Decode events by using abi
        // we are looking for event Game(address player, uint8 bet, uint8 result, uint128 prize);

        let events = await earlyAdopterContract.decodeTransactionEvents({
          transaction: receiptTx as Transaction,
        });

        if (events.length !== 1 || events[0].event !== 'NftCreated') {
          toast.closeAll();
          toast({
            status: 'error',
            title: t('error'),
            description: t('commonErrorMsg'),
            isClosable: true,
          });
        } else {
          // @ts-ignore: Unreachable code error
          const nftAddress = String(events[0].data?.nft && events[0].data?.nft?._address);
          const __json = getJson(name, image, imageType) as BaseNftJson;
          __json.address = nftAddress;
          setMintedStrings((s) => [...(s ? s : []), name]);
          setMinteds((nfts) => [...(nfts ? nfts : []), __json]);
          toast.closeAll();
        }
        setIsMinting(false);
        setIsConfirming(false);
      } else {
        toast.closeAll();
        toast({
          status: 'error',
          title: t('error'),
          description: t('commonErrorMsg'),
          isClosable: true,
        });
        setIsMinting(false);
        setIsConfirming(false);
      }
    } catch (e: any) {
      toast.closeAll();
      toast({
        status: 'error',
        title: t('failed'),
        description: t('commonFailedMsg'),
        isClosable: true,
      });
      console.log(e);
    }
  };

  const mintAllBadges = async () => {
    if (
      !connectedAccount ||
      connectedAccount === '' ||
      !provider ||
      !provider.isInitialized ||
      !unMinteds
    ) {
      toast({
        status: 'info',
        title: t('connectWallet'),
        description: t('venomWalletConnect'),
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsMinting(true);
    toast.closeAll();
    toast({
      status: 'loading',
      title: t('minting'),
      description: t('confirmInWallet'),
      duration: null,
    });

    const _unMiteds = unMinteds.map((item) => JSON.stringify(item));

    // @ts-ignore: Unreachable code error
    const mintTx = await earlyAdopterContract?.methods
      .mintBadges({
        _jsons: _unMiteds,
        _owner: new Address(connectedAccount),
      })
      .send({
        amount: String(1660000000 * unMinteds?.length),
        bounce: true,
        from: connectedAccount,
      })
      .catch((e: any) => {
        if (e.code === 3) {
          // rejected by a user
          setIsMinting(false);
          toast.closeAll();
          return Promise.resolve(null);
        } else {
          setIsMinting(false);
          // console.log(e);
          toast.closeAll();
          return Promise.reject(e);
        }
      });

    if (mintTx) {
      toast.closeAll();
      toast({
        status: 'loading',
        title: t('confirming'),
        description: t('confirmingTx'),
        duration: null,
      });

      //// console.log('mint tx : ', mintTx);
      setIsConfirming(true);
      let receiptTx: Transaction | undefined;
      const subscriber = provider && new provider.Subscriber();
      if (subscriber)
        await subscriber
          .trace(mintTx)
          .tap((tx_in_tree: any) => {
            //// console.log('tx_in_tree : ', tx_in_tree);
            if (tx_in_tree.account.equals(EARLY_ADOPTERS_CONTRACT_ADDRESS)) {
              receiptTx = tx_in_tree;
            }
          })
          .finished();

      // Decode events by using abi
      // we are looking for event Game(address player, uint8 bet, uint8 result, uint128 prize);

      let events = await earlyAdopterContract.decodeTransactionEvents({
        transaction: receiptTx as Transaction,
      });
      console.log(events);

      if (events.length !== 1 || events[0].event !== 'NftCreated') {
        toast.closeAll();
        toast({
          status: 'error',
          title: t('error'),
          description: t('commonErrorMsg'),
          isClosable: true,
        });
      } else {
        console.log(events);
        // @ts-ignore: Unreachable code error
        const nftAddress = String(events[0].data?.nft && events[0].data?.nft?._address);
        setReload(true);
        toast.closeAll();
      }
      setIsMinting(false);
      setIsConfirming(false);
    } else {
      toast.closeAll();
      toast({
        status: 'error',
        title: t('error'),
        description: t('commonErrorMsg'),
        isClosable: true,
      });
      setIsMinting(false);
      setIsConfirming(false);
    }
  };

  const openWindow = (url: string, e: any) => {
    window.open(url, 'newwindow', 'width=420,height=800');
    e !== null && e.preventDefault();
  };

  useEffect(() => {
    async function getTwitterUrl() {
      if (connectedAccount === '') return;
      const _urlData = await getTwitterAuthUrl(btoa(connectedAccount));
      if (_urlData.data.status === 'ok') {
        setTwitterAuthUrl(_urlData.data.auth);
      }
    }

    getTwitterUrl();
  }, [connectedAccount]);

  useEffect(() => {
    async function validateTwitter() {
      setTwitterLoading(true);
      const _auth = Buffer.from(twitterAuth, 'base64').toString();
      const _authJson = JSON.parse(_auth);
      //console.log(_authJson);
      if (_authJson.status === 'ok') {
        try {
          const _token = Buffer.from(_authJson.token, 'base64').toString();
          const token = JSON.parse(_token);
          //console.log(token);
          const isValidToken = (token.ex - new Date().getTime()) / 1000 / 60 > 0;
          //console.log((token.ex - new Date().getTime()) / 1000 / 60);
          if (isValidToken) {
            const _user = Buffer.from(_authJson.u, 'base64').toString();
            const user = JSON.parse(_user);
            setTwitterUser(user.data);
            setTwitterLoading(false);
          } else {
            const refresh = await refreshAccessToken(token.refresh);
            if (refresh.data.status === 'ok') {
              setTwitterAuth(btoa(JSON.stringify(refresh.data)));
            }
            setTwitterLoading(false);
          }

          //setTwitterVerified(true);
        } catch (error) {
          console.log('error in validating twitter auth');
          setTwitterLoading(false);
        }
      } else {
        setTwitterLoading(false);
      }
    }

    if (twitterAuth.length > 20) {
      validateTwitter();
    }
  }, [twitterAuth]);

  useEffect(() => {
    if (twitterFollowed && twitterUser.id !== '') {
      if (twitterUser.id !== '') {
      setTwitterVerified(true);
    } else {
      setTwitterVerified(false);
    }
  }
}, [twitterFollowed, twitterUser]);

  const _validateZealy = async () => {
    setZealyLoading(true);
    const _zealyUser = await getZealyByTwitterId(twitterUser.id);
    //console.log(_zealyUser.data);
    if (_zealyUser) {
      const zealyUser_ = _zealyUser.data.data;
      if (_zealyUser.status === 200 && zealyUser_) {
        setZealyUser(zealyUser_);
        if (zealyUser_.xp > 195) {
          setZealyVerified(true);
        } else {
          setZealyVerified(false);
        }
      }
    }
    setZealyLoading(false);
  };

  useEffect(() => {
    async function validateZealy() {
      await _validateZealy();
    }

    if (twitterUser.id !== '') {
      validateZealy();
    }
  }, [twitterUser]);

  const handleTwitter = async () => {
    if (twitterUser.id === '') {
      if (twitterAuthUrl.length > 10) {
        setTwitterLoading(true);
        window.open(twitterAuthUrl, 'self', 'width=420,height=800');
      } else {
        toast.closeAll();
        toast({
          status: 'info',
          title: t('connectWallet'),
          description: t('venomWalletConnect'),
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    } else {
       if (twitterFollowed.length > 10) {
      //   if (twitterRetweeted.length > 10) {
          setTwitterVerified(true);
          setTwitterLoading(false);
          return;
      //   } else {
      //     setTwitterLoading(true);
      //     window.open(TWITTER_RETWEET_URL, 'self', 'width=420,height=800');
      //     setTimeout(() => {
      //       setTwitterRetweeted(Buffer.from(`retweeted-on-${Date.now()}`).toString('base64'));
      //       setTwitterLoading(false);
      //     }, 3000);
      //   }
       } else {
         setTwitterLoading(true);
         window.open(TWITTER_FOLLOW_URL, 'self', 'width=420,height=800');
         setTimeout(() => {
           setTwitterFollowed(Buffer.from(`followed-on-${Date.now()}`).toString('base64'));
           setTwitterLoading(false);
         }, 5000);
       }
    }
  };

  const loadByContract = async (_contractAddress: string) => {
    if (!provider || !provider.isInitialized) return 0;
    const saltedCode = await saltCode(provider, String(connectedAccount), _contractAddress);
    // Hash it
    const codeHash = await provider.getBocHash(String(saltedCode));
    // Fetch all Indexes by hash
    const indexesAddresses = await getAddressesFromIndex(codeHash, provider);
    if (indexesAddresses) {
      return indexesAddresses?.length;
    } else {
      return 0;
    }
  };

  const loadMinteds = async () => {
    setIsLoading(true);
    if (!provider || !provider.isInitialized) return;
    setMinteds([]);
    setMintedStrings([]);
    const saltedCode = await saltCode(
      provider,
      String(connectedAccount),
      EARLY_ADOPTERS_CONTRACT_ADDRESS
    );
    // Hash it
    const codeHash = await provider.getBocHash(String(saltedCode));
    if (!codeHash) {
      console.log('codehash error');
      setIsLoading(false);
      return;
    }
    // Fetch all Indexes by hash
    const indexesAddresses = await getAddressesFromIndex(codeHash, provider);
    if (!indexesAddresses || !indexesAddresses.length) {
      setIsLoading(false);
      return;
    }
    // Fetch all nfts
    indexesAddresses.map(async (indexAddress) => {
      try {
        const _nftJson = await getNftByIndex(provider, indexAddress);
        setMintedStrings((ss) => [...(ss ? ss : []), String(_nftJson.name)]);
        setMinteds((nfts) => [...(nfts ? nfts : []), _nftJson]);
      } catch (e: any) {
        console.log('error getting venomid nft ', indexAddress);
      }
    });
    await sleep(1000);
    setIsLoading(false);
  };

  useEffect(() => {
    let _unMinteds = [];
    if (twitterVerified) {
      if (mintedStrings?.includes('Crypto Explorer')) {
        console.log('Explorer already minted');
      } else {
        _unMinteds.push(
          getJson(
            'Crypto Explorer',
            EARLY_ADOPTER_IMAGES['explorer'].src,
            EARLY_ADOPTER_IMAGES['explorer'].type
          )
        );
      }
    }

    if (zealyVerified || ownVids > 1) {
      if (mintedStrings?.includes('Venom ID Pioneer')) {
        console.log('Pioneer already minted');
      } else {
        _unMinteds.push(
          getJson(
            'Venom ID Pioneer',
            EARLY_ADOPTER_IMAGES['pioneer'].src,
            EARLY_ADOPTER_IMAGES['pioneer'].type
          )
        );
      }
    }

    if (ownVidVen) {
      if (mintedStrings?.includes('Venom ID Identorian')) {
        console.log('Identorian already minted');
      } else {
        _unMinteds.push(
          getJson(
            'Venom ID Identorian',
            EARLY_ADOPTER_IMAGES['identorian'].src,
            EARLY_ADOPTER_IMAGES['identorian'].type
          )
        );
      }
    }

    if (ownVids > 0) {
      if (mintedStrings?.includes('Venom ID Family')) {
        console.log('Family already minted');
      } else {
        _unMinteds.push(
          getJson(
            'Venom ID Family',
            EARLY_ADOPTER_IMAGES['family'].src,
            EARLY_ADOPTER_IMAGES['family'].type
          )
        );
      }
    }

    if (
      (ownVids === 3 && zealyVerified) ||
      (zealyVerified && zealyUser.xp > 500 && zealyUser.rank < 101)
    ) {
      if (mintedStrings?.includes('Venom ID Maverick')) {
        console.log('Maverick already minted');
      } else {
        _unMinteds.push(
          getJson(
            'Venom ID Maverick',
            EARLY_ADOPTER_IMAGES['maverick'].src,
            EARLY_ADOPTER_IMAGES['maverick'].type
          )
        );
      }
    }

    if (
      twitterVerified &&
      ownVids > 0 &&
      zealyVerified &&
      zealyUser.xp > 1000 &&
      zealyUser.rank < 11
    ) {
      if (mintedStrings?.includes('Venom ID Champion')) {
        console.log('Champion already minted');
      } else {
        _unMinteds.push(
          getJson(
            'Venom ID Champion',
            EARLY_ADOPTER_IMAGES['champion'].src,
            EARLY_ADOPTER_IMAGES['champion'].type
          )
        );
      }
    }

    console.log('unMinteds');
    console.log(_unMinteds);
    if (_unMinteds.length > 0) {
      setUnMinteds(_unMinteds);
    } else {
      setUnMinteds([]);
    }
    setReload(false);
  }, [mintedStrings, twitterVerified, zealyVerified, ownVids, ownVidVen, reload]);

  const loadByDb = async () => {
    const result = (await getNftsByAddress(String(connectedAccount))).data;
    //console.log(result);
    //console.log(rows[0]);
    if (result.nfts) {
      return result.nfts.length;
    } else {
      return 0;
    }
  };

  const _checkOwnVid = async () => {
    setOwnVidLoading(true);
    const v0nfts = await loadByContract(ROOT_CONTRACT_ADDRESS);
    const v1nfts = await loadByContract(CONTRACT_ADDRESS);
    const v2nfts = await loadByContract(CONTRACT_ADDRESS_V1);
    const v3nfts = await loadByDb();

    //console.log(v1nfts, v2nfts, v3nfts);
    let _no = 0;
    if (Number(v0nfts) > 0) {
      _no += 1;
    };

    if (Number(v1nfts) > 0) {
      setOwnVid(true);
      _no += 1;
    } else {
      setOwnVid(false);
    }
    if (Number(v2nfts) > 0) {
      setOwnVid1(true);
      _no += 1;
    } else {
      setOwnVid1(false);
    }

    if (Number(v3nfts) > 0) {
      setOwnVid2(true);
      _no += 1;
    } else {
      setOwnVid2(false);
    }

    console.log(v0nfts,v1nfts, v2nfts, v3nfts);

    setOwnVidChecked(true);
    setOwnVidLoading(false);
    setOwnVids(_no);
  };

  const _checkOwnVidVen = async () => {
    setOwnVidVenLoading(true);
    const v1nfts = await loadByContract(VENTORY_NFT_V1_ADDRESS);
    const v2nfts = await loadByContract(VENTORY_NFT_V2_ADDRESS);

    console.log(v1nfts);
    if (Number(v1nfts + v2nfts) > 0) {
      setOwnVidVen(true);
    } else {
      setOwnVidVen(false);
    }

    setOwnVidVenChecked(true);
    setOwnVidVenLoading(false);
  };

  useEffect(() => {
    const checkOwnVid = async () => {
      await _checkOwnVid();
    };

    const checkOwnVidVen = async () => {
      await _checkOwnVidVen();
    };

    const checkMinteds = async () => {
      await loadMinteds();
    };

    if (!provider || !provider.isInitialized) return;
    if (!connectedAccount || connectedAccount === '') return;

    checkOwnVid();
    checkOwnVidVen();
    checkMinteds();
  }, [provider, connectedAccount]);

  return (
    <Accordion
      allowToggle
      allowMultiple={false}
      defaultIndex={[0]}
      className="bio"
      borderRadius={10}
      minWidth={'100%'}
      size="lg"
      backgroundColor={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}
      display={'flex'}>
      <AccordionItem border={0} borderRadius={10} width={'100%'}>
        <AccordionButton
          width={'100%'}
          as={Button}
          color={'white'}
          justifyContent={'center'}
          bgGradient={useColorModeValue(
            'linear(to-r, var(--venom1), var(--bluevenom1))',
            'linear(to-r, var(--venom2), var(--bluevenom2))'
          )}
          _expanded={{
            bgGradient: useColorModeValue(
              'linear(to-r, var(--venom1), var(--bluevenom1))',
              'linear(to-r, var(--venom2), var(--bluevenom2))'
            ),
            borderBottomRadius: 0,
          }}
          _hover={{
            bgGradient: useColorModeValue(
              'linear(to-r, var(--venom0), var(--bluevenom0))',
              'linear(to-r, var(--venom0), var(--bluevenom0))'
            ),
          }}
          h={'120px'}>
          <Flex gap={[3, 4]} alignItems={'center'} justify={'center'}>
            <LinkIcon type="RiVerifiedBadgeLine" size={small ? '46' : '36'} />
            <Text fontWeight={'bold'} display={'flex'} flex={1} fontSize={['xl', '2xl']}>
              Early Adopters Program
            </Text>
          </Flex>
        </AccordionButton>
        <AccordionPanel py={4} minWidth="100%">
          <Stack gap={4} fontSize={['md', 'lg']}>
            <Flex
              align={'center'}
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              p={4}
              gap={4}
              rounded={'lg'}
              justify={'space-between'}>
              <HStack gap={4}>
                <LinkIcon type="x" size={notMobile ? '48' : '32'} />
                <Box>
                  Follow us on twitter
                  <Text color={useColorModeValue('var(--blue3)', 'var(--blue0)')}>
                    <a
                      href={TWITTER_FOLLOW_URL}
                      onClick={(e) => {
                        openWindow(TWITTER_FOLLOW_URL, e);
                      }}
                      target="_blank"
                      rel="noreferrer">
                      @venomid_network
                    </a>
                  </Text>
                </Box>
              </HStack>
              <Button
                size={['md', 'lg']}
                variant={'pop'}
                colorScheme={twitterVerified ? 'green' : 'darker'}
                color={'white'}
                isLoading={twitterLoading}
                loadingText={'Checking'}
                rounded={'full'}
                isDisabled={twitterVerified}
                gap={1}
                h={'56px'}
                onClick={handleTwitter}>
                {twitterUser.id === ''
                  ? 'Login' : !twitterFollowed ? 'Follow'
                  : 'Done'}
              </Button>
            </Flex>
            <Flex
              align={'center'}
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              p={4}
              gap={2}
              rounded={'lg'}
              justify={'space-between'}>
              <HStack gap={4}>
                <LinkIcon type="zealy" size={notMobile ? '48' : '32'} />
                <Box>
                  Zealy Member (Min 195 XP)
                  <Text color={useColorModeValue('var(--blue3)', 'var(--blue0)')}>
                    <a
                      href={ZEALY_URL}
                      onClick={(e) => {
                        openWindow(ZEALY_URL, e);
                      }}
                      target="_blank"
                      rel="noreferrer">
                      Earn Xps
                    </a>
                  </Text>
                </Box>
              </HStack>
              <Button
                size="lg"
                variant={'pop'}
                isLoading={zealyLoading}
                loadingText={'Checking'}
                colorScheme={zealyVerified ? 'green' : 'darker'}
                color={'white'}
                rounded={'full'}
                h={'56px'}
                onClick={twitterUser.id === '' ? handleTwitter : _validateZealy}>
                {zealyUser.id !== '' ? `${zealyUser.xp} XP` : 'Login'}{' '}
                {zealyUser.xp > 500 && zealyUser.rank < 101 && (
                  <Badge
                    color={'white'}
                    bg={'var(--redGradient)'}
                    position={'absolute'}
                    mt={-12}
                    p={1}
                    px={2}
                    rounded={'full'}>
                    {' '}
                    {zealyUser.rank < 11 ? `Top 1%` : `Top 10%`}
                  </Badge>
                )}
                {zealyUser.rank > 0 && zealyUser.xp > 0 && (
                  <Badge
                    color={'white'}
                    bg={'var(--venomGradient)'}
                    position={'absolute'}
                    mb={-12}
                    p={1}
                    px={2}
                    rounded={'full'}>
                    {' '}
                    {`Rank ${zealyUser.rank}`}
                  </Badge>
                )}
              </Button>
            </Flex>
            <Flex
              align={'center'}
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              p={4}
              gap={2}
              rounded={'lg'}
              justify={'space-between'}>
              <HStack gap={4}>
                <LinkIcon
                  type="https://ipfs.io/ipfs/Qmejr9qRtG3YYxqRCEVmjD1bW17mgQio8W1TjXjNSJn3DL"
                  size="md"
                />
                <Text>Own Venom ID NFT</Text>
              </HStack>
              <Button
                size="lg"
                variant={'pop'}
                colorScheme={ownVids > 0 ? 'green' : 'darker'}
                color={'white'}
                isLoading={ownVidLoading}
                loadingText={'Checking'}
                rounded={'full'}
                onClick={_checkOwnVid}>
                {ownVidChecked ? (ownVids > 0 ? 'Yes' : 'No') : 'Check'}
                {ownVids > 1 && (
                  <Badge
                    color={'white'}
                    bg={'var(--venomGradient)'}
                    position={'absolute'}
                    mb={-12}
                    p={1}
                    px={2}
                    rounded={'full'}>
                    {ownVids === 2
                      ? `Pioneer`
                      : zealyVerified && twitterVerified
                      ? `Maverick`
                      : zealyVerified || twitterVerified
                      ? `Pioneer`
                      : `Family`}
                  </Badge>
                )}
              </Button>
            </Flex>
            <Flex
              align={'center'}
              bg={colorMode === 'light' ? 'blackAlpha.100' : 'whiteAlpha.100'}
              p={4}
              gap={2}
              rounded={'lg'}
              justify={'space-between'}>
              <HStack gap={4}>
                <LinkIcon
                  type="https://ipfs.io/ipfs/QmPYnkNSK1TzqzxAEsK1DXNRsk1wuMgzncEUJgMauMC423/3dgifmaker60629.gif"
                  size="md"
                />
                <Box>
                  Own Venom ID x Ventory NFT
                  <Text color={colorMode === 'light' ? 'var(--blue3)' : 'var(--blue0)'}>
                    <a
                      href={MARKETPLACE_URLS_COLLECTION['venom'] + VENTORY_NFT_V2_ADDRESS}
                      onClick={(e) => {
                        openWindow(
                          MARKETPLACE_URLS_COLLECTION['venom'] + VENTORY_NFT_V2_ADDRESS,
                          e
                        );
                      }}
                      target="_blank"
                      rel="noreferrer">
                      View Collection
                    </a>
                  </Text>
                </Box>
              </HStack>
              <Button
                size="lg"
                variant={'pop'}
                colorScheme={ownVidVen ? 'green' : 'darker'}
                isLoading={ownVidVenLoading}
                loadingText={'Checking'}
                color={'white'}
                rounded={'full'}
                onClick={_checkOwnVidVen}>
                {ownVidVenChecked ? (ownVidVen ? 'Yes' : 'No') : 'Check'}
              </Button>
            </Flex>
            {(twitterVerified || zealyVerified || ownVids || ownVidVen) && !isLoading && (
              <Text>You are eligible to mint</Text>
            )}
            {!isLoading && (
              <Flex
                align={'center'}
                //bg={useColorModeValue('blackAlpha.100', 'blackAlpha.100')}
                p={4}
                rounded={'lg'}
                justify={'center'}>
                <SimpleGrid gap={4} columns={[1, 1, 2, 3]}>
                  {twitterVerified && (
                    <Flex flexDir={'column'} justify={'center'} gap={4} align={'center'}>
                      {mintedStrings?.includes('Crypto Explorer') && <Badge position={'absolute'} colorScheme='green' zIndex={1000} mt={'-320px'} ml={'-200px'} rounded={'lg'} display={'flex'} gap={2} p={2} justifyContent={'center'} alignItems={'center'}><LinkIcon type="RiVerifiedBadgeFill" size={'24'} />Minted</Badge>}
                      
                      <ImageBox srcUrl={EARLY_ADOPTER_IMAGES['explorer'].src} size={250} />
                      <Text>Crypto Explorer OAT</Text>
                      <Button
                        w={'100%'}
                        isDisabled={isMinting || isConfirming}
                        isLoading={isMinting || isConfirming}
                        loadingText={
                          isMinting
                            ? 'Minting ...'
                            : isConfirming
                            ? 'Confirming ...'
                            : 'Loading ...'
                        }
                        onClick={() =>
                          mintedStrings?.includes('Crypto Explorer')
                            ? openWindow(
                                ETHERSCAN_URLS['venom'] +
                                  minteds?.filter((m) => m.name === 'Crypto Explorer')[0].address,
                                null
                              )
                            : mintBadge(
                                'Crypto Explorer',
                                EARLY_ADOPTER_IMAGES['explorer'].src,
                                EARLY_ADOPTER_IMAGES['explorer'].type
                              )
                        }
                        rounded={'full'}
                        bgGradient={
                          colorMode === 'light'
                            ? 'linear(to-r, var(--venom1), var(--bluevenom1))'
                            : 'linear(to-r, var(--venom2), var(--bluevenom2))'
                        }>
                        {mintedStrings?.includes('Crypto Explorer')
                          ? 'Minted. View on explorer'
                          : 'Mint'}
                      </Button>
                    </Flex>
                  )}
                  {(zealyVerified || ownVids > 1) && (
                    <Flex flexDir={'column'} justify={'center'} gap={4} align={'center'} p={4}>
                      {mintedStrings?.includes('Venom ID Pioneer') && <Badge position={'absolute'} colorScheme='green' zIndex={1000} mt={'-320px'} ml={'-200px'} rounded={'lg'} display={'flex'} gap={2} p={2} justifyContent={'center'} alignItems={'center'}><LinkIcon type="RiVerifiedBadgeFill" size={'24'} />Minted</Badge>}
                      <ImageBox srcUrl={EARLY_ADOPTER_IMAGES['pioneer'].src} size={250} />
                      <Text>Venom ID Pioneer OAT</Text>
                      <Button
                        w={'100%'}
                        isDisabled={isMinting || isConfirming}
                        isLoading={isMinting || isConfirming}
                        loadingText={
                          isMinting
                            ? 'Minting ...'
                            : isConfirming
                            ? 'Confirming ...'
                            : 'Loading ...'
                        }
                        onClick={() =>
                          mintedStrings?.includes('Venom ID Pioneer')
                            ? openWindow(
                                ETHERSCAN_URLS['venom'] +
                                  minteds?.filter((m) => m.name === 'Venom ID Pioneer')[0].address,
                                null
                              )
                            : mintBadge(
                                'Venom ID Pioneer',
                                EARLY_ADOPTER_IMAGES['pioneer'].src,
                                EARLY_ADOPTER_IMAGES['pioneer'].type
                              )
                        }
                        rounded={'full'}
                        bgGradient={
                          colorMode === 'light'
                            ? 'linear(to-r, var(--venom1), var(--bluevenom1))'
                            : 'linear(to-r, var(--venom2), var(--bluevenom2))'
                        }>
                        {mintedStrings?.includes('Venom ID Pioneer')
                          ? 'Minted. View on explorer'
                          : 'Mint'}
                      </Button>
                    </Flex>
                  )}

                  {ownVidVen && (
                    <Flex flexDir={'column'} justify={'center'} gap={4} align={'center'} p={4}>
                      {mintedStrings?.includes('Venom ID Identorian') && <Badge position={'absolute'} colorScheme='green' zIndex={1000} mt={'-320px'} ml={'-200px'} rounded={'lg'} display={'flex'} gap={2} p={2} justifyContent={'center'} alignItems={'center'}><LinkIcon type="RiVerifiedBadgeFill" size={'24'} />Minted</Badge>}
                      <ImageBox srcUrl={EARLY_ADOPTER_IMAGES['identorian'].src} size={250} />
                      <Text>Venom ID Identorian OAT</Text>
                      <Button
                        w={'100%'}
                        isDisabled={isMinting || isConfirming}
                        isLoading={isMinting || isConfirming}
                        loadingText={
                          isMinting
                            ? 'Minting ...'
                            : isConfirming
                            ? 'Confirming ...'
                            : 'Loading ...'
                        }
                        onClick={() =>
                          mintedStrings?.includes('Venom ID Identorian')
                            ? openWindow(
                                ETHERSCAN_URLS['venom'] +
                                  minteds?.filter((m) => m.name === 'Venom ID Identorian')[0]
                                    .address,
                                null
                              )
                            : mintBadge(
                                'Venom ID Identorian',
                                EARLY_ADOPTER_IMAGES['identorian'].src,
                                EARLY_ADOPTER_IMAGES['identorian'].type
                              )
                        }
                        rounded={'full'}
                        bgGradient={
                          colorMode === 'light'
                            ? 'linear(to-r, var(--venom1), var(--bluevenom1))'
                            : 'linear(to-r, var(--venom2), var(--bluevenom2))'
                        }>
                        {mintedStrings?.includes('Venom ID Identorian')
                          ? 'Minted. View on explorer'
                          : 'Mint'}
                      </Button>
                    </Flex>
                  )}

                  {ownVids > 0 && (
                    <Flex flexDir={'column'} justify={'center'} gap={4} align={'center'} p={4}>
                      {mintedStrings?.includes('Venom ID Family') && <Badge position={'absolute'} colorScheme='green' zIndex={1000} mt={'-320px'} ml={'-200px'} rounded={'lg'} display={'flex'} gap={2} p={2} justifyContent={'center'} alignItems={'center'}><LinkIcon type="RiVerifiedBadgeFill" size={'24'} />Minted</Badge>}
                      <ImageBox srcUrl={EARLY_ADOPTER_IMAGES['family'].src} size={250} />
                      <Text>Venom ID Family OAT</Text>
                      <Button
                        w={'100%'}
                        isDisabled={isMinting || isConfirming}
                        isLoading={isMinting || isConfirming}
                        loadingText={
                          isMinting
                            ? 'Minting ...'
                            : isConfirming
                            ? 'Confirming ...'
                            : 'Loading ...'
                        }
                        onClick={() =>
                          mintedStrings?.includes('Venom ID Family')
                            ? openWindow(
                                ETHERSCAN_URLS['venom'] +
                                  minteds?.filter((m) => m.name === 'Venom ID Family')[0].address,
                                null
                              )
                            : mintBadge(
                                'Venom ID Family',
                                EARLY_ADOPTER_IMAGES['family'].src,
                                EARLY_ADOPTER_IMAGES['family'].type
                              )
                        }
                        rounded={'full'}
                        bgGradient={
                          colorMode === 'light'
                            ? 'linear(to-r, var(--venom1), var(--bluevenom1))'
                            : 'linear(to-r, var(--venom2), var(--bluevenom2))'
                        }>
                        {mintedStrings?.includes('Venom ID Family')
                          ? 'Minted. View on explorer'
                          : 'Mint'}
                      </Button>
                    </Flex>
                  )}

                  {(ownVid && ownVid1 && ownVid2 && zealyVerified) ||
                    (zealyVerified && zealyUser.xp > 500 && zealyUser.rank < 101 && (
                      <Flex flexDir={'column'} justify={'center'} gap={4} align={'center'} p={4}>
                      {mintedStrings?.includes('Venom ID Maverick') && <Badge position={'absolute'} colorScheme='green' zIndex={1000} mt={'-320px'} ml={'-200px'} rounded={'lg'} display={'flex'} gap={2} p={2} justifyContent={'center'} alignItems={'center'}><LinkIcon type="RiVerifiedBadgeFill" size={'24'} />Minted</Badge>}
                        <ImageBox srcUrl={EARLY_ADOPTER_IMAGES['maverick'].src} size={250} />
                        <Text>Venom ID Maverick OAT</Text>
                        <Button
                          w={'100%'}
                          isDisabled={isMinting || isConfirming}
                          isLoading={isMinting || isConfirming}
                          loadingText={
                            isMinting
                              ? 'Minting ...'
                              : isConfirming
                              ? 'Confirming ...'
                              : 'Loading ...'
                          }
                          onClick={() =>
                            mintedStrings?.includes('Venom ID Maverick')
                              ? openWindow(
                                  ETHERSCAN_URLS['venom'] +
                                    minteds?.filter((m) => m.name === 'Venom ID Maverick')[0]
                                      .address,
                                  null
                                )
                              : mintBadge(
                                  'Venom ID Maverick',
                                  EARLY_ADOPTER_IMAGES['maverick'].src,
                                  EARLY_ADOPTER_IMAGES['maverick'].type
                                )
                          }
                          rounded={'full'}
                          bgGradient={
                            colorMode === 'light'
                              ? 'linear(to-r, var(--venom1), var(--bluevenom1))'
                              : 'linear(to-r, var(--venom2), var(--bluevenom2))'
                          }>
                          {mintedStrings?.includes('Venom ID Maverick')
                            ? 'Minted. View on explorer'
                            : 'Mint'}
                        </Button>
                      </Flex>
                    ))}
                  {twitterVerified && ownVids > 0 && zealyUser.xp > 1000 && zealyUser.rank < 11 && (
                    <Flex flexDir={'column'} justify={'center'} gap={4} align={'center'} p={4}>
                      {mintedStrings?.includes('Venom ID Champion') && <Badge position={'absolute'} colorScheme='green' zIndex={1000} mt={'-320px'} ml={'-200px'} rounded={'lg'} display={'flex'} gap={2} p={2} justifyContent={'center'} alignItems={'center'}><LinkIcon type="RiVerifiedBadgeFill" size={'24'} />Minted</Badge>}
                      <ImageBox srcUrl={EARLY_ADOPTER_IMAGES['champion'].src} size={250} />
                      <Text>Venom ID Champion OAT</Text>
                      <Button
                        w={'100%'}
                        isDisabled={isMinting || isConfirming}
                        isLoading={isMinting || isConfirming}
                        loadingText={
                          isMinting
                            ? 'Minting ...'
                            : isConfirming
                            ? 'Confirming ...'
                            : 'Loading ...'
                        }
                        onClick={() =>
                          mintedStrings?.includes('Venom ID Champion')
                            ? openWindow(
                                ETHERSCAN_URLS['venom'] +
                                  minteds?.filter((m) => m.name === 'Venom ID Champion')[0].address,
                                null
                              )
                            : mintBadge(
                                'Venom ID Champion',
                                EARLY_ADOPTER_IMAGES['champion'].src,
                                EARLY_ADOPTER_IMAGES['champion'].type
                              )
                        }
                        rounded={'full'}
                        bgGradient={
                          colorMode === 'light'
                            ? 'linear(to-r, var(--venom1), var(--bluevenom1))'
                            : 'linear(to-r, var(--venom2), var(--bluevenom2))'
                        }>
                        {mintedStrings?.includes('Venom ID Champion')
                          ? 'Minted. View on explorer'
                          : 'Mint'}
                      </Button>
                    </Flex>
                  )}
                </SimpleGrid>
              </Flex>
            )}
            {!isLoading && unMinteds && unMinteds.length > 1 && (
              <Button
                w={'100%'}
                height={'100px'}
                isDisabled={true}
                isLoading={isMinting || isConfirming}
                loadingText={
                  isMinting ? 'Minting ...' : isConfirming ? 'Confirming ...' : 'Loading ...'
                }
                onClick={mintAllBadges}
                rounded={'full'}
                bgGradient={
                  colorMode === 'light'
                    ? 'linear(to-r, var(--venom1), var(--bluevenom1))'
                    : 'linear(to-r, var(--venom2), var(--bluevenom2))'
                }>
                <Stack>
                  <Text>Mint All OATs</Text>
                  <Badge>Soon</Badge>
                </Stack>
              </Button>
            )}
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}