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
  Link,
  Center,
  Spinner,
} from '@chakra-ui/react';
import ImageBox from 'components/claiming/ImageBox';
import DomainName from 'components/features/DomainName';
import DomainTag from 'components/features/DomainTag';
import { LinkIcon } from 'components/logos';
import { AVATAR_API_URL, SITE_PROFILE_URL, WINNERS } from 'core/utils/constants';
import NextLink from 'next/link';

export default function ChallengesSection() {
  const { colorMode } = useColorMode();
  const lightMode = colorMode === 'light';
  const [notMobile] = useMediaQuery('(min-width: 768px)');
  const [small] = useMediaQuery('(min-width: 375px)');

  return (
    <>
      <Accordion
      allowToggle
      allowMultiple={false}
      //defaultIndex={[0]}
      // onChange={(e) => {
      //   if(e === 0){
      //     onOpen();
      //   } else {
      //     onClose();
      //   }
      // }}
      className="earlyAdopters"
      borderRadius={10}
      minWidth={'100%'}
      size="lg"
      backgroundColor={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}
      display={'flex'}>
      <AccordionItem border={0} borderRadius={10} width={'100%'}>
        <AccordionButton
          //width={'100%'}
          as={Button}
          justifyContent={'center'}
          // bgGradient={useColorModeValue(
          //   'linear(to-r, var(--venom1), var(--bluevenom1))',
          //   'linear(to-r, var(--venom2), var(--bluevenom2))'
          // )}
          // _expanded={{
          //   bgGradient: useColorModeValue(
          //     'linear(to-r, var(--venom1), var(--bluevenom1))',
          //     'linear(to-r, var(--venom2), var(--bluevenom2))'
          //   ),
          //   borderBottomRadius: 0,
          // }}
          // _hover={{
          //   bgGradient: useColorModeValue(
          //     'linear(to-r, var(--venom0), var(--bluevenom0))',
          //     'linear(to-r, var(--venom0), var(--bluevenom0))'
          //   ),
          // }}
          // color={'white'}
          h={'120px'}>
          <Flex gap={[3, 4]} alignItems={'center'} justify={'center'}>
            <LinkIcon type="RiTrophyLine" size={small ? '46' : '36'} />
            <Stack gap={1} justify={'left'}>
              <Text fontWeight={'bold'} display={'flex'} flex={1} fontSize={['xl', '2xl']}>
                Recent Challenges
              </Text>
            </Stack>
          </Flex>
        </AccordionButton>
        <AccordionPanel minWidth="100%" maxW={'container.md'} h={'max-content'} key={'challenges-boxes-' + Object.entries(WINNERS).length}>
          <SimpleGrid columns={[1, 1, 1, 2]} gap={[4, 6, 8]} fontSize={['md', 'lg']} pt={4}>
            {Object.entries(WINNERS).map(([key, value]) => (
              <>
                {value && <Stack
                  gap={4}
                  rounded={'2xl'}
                  key={key + '-box'}
                  p={[4, 6, 8]}
                  border={'1px solid #77777777'}
                  bgColor={colorMode === 'light' ? 'whiteAlpha.300' : 'whiteAlpha.200'}>
                  <DomainTag name={value.domain} />
                  <ImageBox srcUrl={`screens/${value.screenImage}`} rounded="2xl" size={'100%'} />
                  <Stack textAlign={['left']} p={4}>
                    <Text
                      bgGradient={
                        colorMode === 'light'
                          ? 'linear(to-r, var(--venom2), var(--bluevenom2))'
                          : 'linear(to-r, var(--venom0), var(--bluevenom0))'
                      }
                      bgClip="text"
                      fontSize={['lg', 'xl', '2xl']}
                      fontWeight={'bold'}>
                      {value.title}
                    </Text>
                    <Flex gap={2} justify={'space-between'} direction={['column']}>
                      <Text> {value.link}</Text>

                      <Text>{value.status}</Text>
                    </Flex>
                  </Stack>

                  <Button
                    w={'100%'}
                    key={key + '-button'}
                    size={'lg'}
                    as={NextLink}
                    height={'60px'}
                    style={{ textDecoration: 'none' }}
                    href={`winners/${value.slug}`}
                    gap={6}
                    //color={lightMode ? 'white' : 'black'}
                    display={'flex'}
                    variant={'solid'}
                    colorScheme={
                      value.status === 'Winners Announced'
                        ? 'gray'
                        : 'venom'
                    }
                    flexDir={['column']}
                    justifyContent={['center']}>
                    <Text>View Challenge</Text>
                  </Button>
                </Stack>}
              </>
            ))}
          </SimpleGrid>
        </AccordionPanel>
      </AccordionItem>
      </Accordion>
    </>
  );
}
