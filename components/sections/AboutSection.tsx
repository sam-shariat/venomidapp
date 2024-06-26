import {
  useMediaQuery,
  Button,
  Container,
  Heading,
  Text,
  Box,
  Center,
  useColorMode,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { TELEGRAM_URL, YLIDE_URL, ZEALY_URL } from 'core/utils/constants';
import { RiFileList3Line, RiShakeHandsLine, RiTelegramFill } from 'react-icons/ri';
import { LinkIcon } from 'components/logos';

export default function AboutSection() {
  const { t } = useTranslate();
  return (
    <Box id="about">
      <Container
        as="main"
        maxW="container.md"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="75vh"
        py={10}>
        <>
          <Center display="flex" flexDirection="column" gap={4} maxW={'md'}>
            <Heading fontWeight="bold" fontSize="5xl">
              {t('about')}
            </Heading>
            <Text fontWeight="light" fontSize={'xl'} textAlign={'center'}>
              {t('aboutDescription')}
            </Text>
            <Button
              as={Link}
              href="\litepaper"
              style={{ textDecoration: 'none' }}
              width={'100%'}
              gap={2}
              size={'lg'}
              variant={'outline'}>
              <LinkIcon type="RiFileList3Line" size={28} />
              <Text>{t('litepaper')}</Text>
            </Button>
            <Button
              as={Link}
              href={YLIDE_URL}
              target="_blank"
              style={{ textDecoration: 'none' }}
              width={'100%'}
              gap={2}
              size={'lg'}
              variant={'outline'}>
              <LinkIcon type="ylide" />
              <Text>{t('ylide')}</Text>
            </Button>
            <Button
              as={Link}
              href={ZEALY_URL}
              target="_blank"
              style={{ textDecoration: 'none' }}
              width={'100%'}
              gap={2}
              size={'lg'}
              variant={'outline'}>
              <LinkIcon
                type="zealy"
                color={useColorModeValue(
                  'var(--chakra-colors-gray-800)',
                  'var(--chakra-colors-gray-100)'
                )}
              />

              <Text>{t('zealyCommunity')}</Text>
            </Button>
            <Button
              as={Link}
              href={TELEGRAM_URL}
              target="_blank"
              style={{ textDecoration: 'none' }}
              width={'100%'}
              gap={2}
              size={'lg'}
              variant={'outline'}>
              <LinkIcon type="telegram" />

              <Text>{t('talk')}</Text>
            </Button>
          </Center>
        </>
      </Container>
    </Box>
  );
}
