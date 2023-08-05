import { Button, Container, Heading, Text, useMediaQuery, Box, Center, useColorMode, Link, Flex, Stack } from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import Venom from 'components/Venom';
import { SITE_PROFILE_URL } from 'core/utils/constants';
import { RiExternalLinkLine, RiProfileLine } from 'react-icons/ri';
import LogoIcon from 'components/Layout/LogoIcon';

export default function ProfileSection() {
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const { colorMode } = useColorMode();

  return (
    <Box id="profile">
      <Container
        as="main"
        maxW="container.md"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="75vh" py={10}>
        <Box gap={4} width={notMobile ? '100%' : 'xs'}>
          <Box gap={4} my={10}>
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Heading fontWeight="bold" fontSize="5xl" textAlign={notMobile ? 'center' : 'left'}>
                {t('profileLink')}
              </Heading>
              <Text fontWeight="bold" fontSize={notMobile ? '3xl' : '2xl'} my={6} textAlign={notMobile ? 'center' : 'left'}>
                {t('profileDescription')}
              </Text>
              <Center display="flex" flexDirection="column">
                <Venom srcUrl="/screens/profileScreen.png" size={notMobile ? 'lg' : 'xs'} />
              </Center>
              <Link href={SITE_PROFILE_URL} width={'100%'} target="_blank">
                <Button
                  height={'76px'}
                  flexDirection={'column'}
                  colorScheme={'blue'}
                  borderColor={'gray'}
                  size="lg"
                  minWidth="100%">
                  <Flex gap={4} width={'100%'} justifyContent={'center'}>
                    <LogoIcon size="45px" reverse/>
                    <Stack gap={1}>
                      <Text>{t('linkWebsiteButton')}</Text>
                      <Text display={'flex'} fontSize={'sm'} color={colorMode === 'dark' ? 'gray.600' : 'gray.300'} gap={1}>
                        venomid.link <RiExternalLinkLine size='18px'/>
                      </Text>
                    </Stack>
                  </Flex>
                </Button>
              </Link>
            </Box>
          </Box>
          <Text fontWeight="light" fontSize={'xl'} mb={4} pb={notMobile ? 10 : 6}>
            {t('linkDescription')}
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
