import {
  Button,
  Flex,
  Stack,
  Textarea,
  Text,
  useColorMode,
  useMediaQuery,
  CircularProgress,
  CircularProgressLabel,
  Box,
  Center,
  Collapse,
} from '@chakra-ui/react';
import {
  titleAtom,
  subtitleAtom,
  bioAtom,
  jsonAtom,
  linksArrayAtom,
  socialsArrayAtom,
  walletsArrayAtom,
  avatarAtom,
  tourOpenAtom,
  tourStepAtom,
  openAddSocialAtom,
  openAddWalletAtom,
  openAddLinkAtom,
  openAddNftAtom,
  openAddAtom,
  jsonHashAtom,
} from 'core/atoms';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { Steps, Hints } from 'intro.js-react';
import { TOUR_STEPS } from 'core/utils/constants';
import { RiCheckboxCircleFill, RiQuestionFill } from 'react-icons/ri';
import { useTranslate } from 'core/lib/hooks/use-translate';

export default function ProfileCompletion() {
  const { t } = useTranslate();
  const { colorMode } = useColorMode();
  const [notMobile] = useMediaQuery('(min-width: 992px)');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [nextStep, setNextStep] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useAtom(tourStepAtom);
  const [isOpen, setIsOpen] = useAtom(tourOpenAtom);
  const m1 = useAtomValue(openAddWalletAtom);
  const m2 = useAtomValue(openAddSocialAtom);
  const m3 = useAtomValue(openAddLinkAtom);
  const m4 = useAtomValue(openAddNftAtom);
  const m5 = useAtomValue(openAddAtom);
  const title = useAtomValue(titleAtom);
  const subtitle = useAtomValue(subtitleAtom);
  const avatar = useAtomValue(avatarAtom);
  const bio = useAtomValue(bioAtom);
  const links = useAtomValue(linksArrayAtom);
  const socials = useAtomValue(socialsArrayAtom);
  const wallets = useAtomValue(walletsArrayAtom);
  const jsonHash = useAtomValue(jsonHashAtom);

  useEffect(() => {
    //// console.log(m1,m2,m3,m4)
    if (m1 || m2 || m3 || m4 || m5) {
      setIsOpen(false);
    }
  }, [m1, m2, m3, m4, m5]);

  useEffect(() => {
    let _progress = 0;
    let step: number | null = null;
    if (title.length > 0) {
      _progress += 1;
    } else {
      step = 0;
    }
    if (subtitle.length > 0) {
      _progress += 1;
    } else {
      step = step === null ? 1 : step;
    }
    if (avatar.length > 0) {
      _progress += 2;
    } else {
      step = step === null ? 2 : step;
    }
    if (bio.length > 14) {
      _progress += 1;
    } else {
      step = step === null ? 3 : step;
    }
    if (wallets.length > 1) {
      _progress += 1;
    } else {
      step = step === null ? 4 : step;
    }
    if (links.length > 0) {
      _progress += 1;
    } else {
      step = step === null ? 5 : step;
    }
    if (socials.length > 0) {
      _progress += 1;
    } else {
      step = step === null ? 6 : step;
    }
    if (socials.length > 1) {
      _progress += 1;
    } else {
      step = step === null ? 6 : step;
    }
   
    if (jsonHash.length > 20) {
      _progress += 1;
    } else {
      step = step === null ? 9 : step;
    }

    setProgress(_progress);
    setNextStep(step);
    
  }, [title, subtitle, avatar, wallets, links, socials, bio, jsonHash]);

  const gotoTour = (step: number) => {
    setCurrentStep(step);
    setIsOpen(true);
  };

  return (
    <>
      <Button
        position={['inherit', 'inherit', 'inherit', 'absolute']}
        left={[0, 0, 0, 6]}
        top={[0, 0, 0, 24]}
        gap={4}
        height={'88px'}
        size={'lg'}
        variant={'outline'}
        borderRadius={12}
        borderStyle={'dashed'}
        width={notMobile ? 'xs' : '100%'}
        colorScheme={colorMode === 'light' ? 'dark' : 'light'}
        _hover={{ backgroundColor: colorMode === 'light' ? 'blackAlpha.100' : 'whiteAlpha.200' }}
        _active={{ backgroundColor: colorMode === 'light' ? 'blackAlpha.200' : 'whiteAlpha.300' }}
        isActive={isCollapsed}
        onClick={() => setIsCollapsed(!isCollapsed)}>
        <Stack w={'100%'} textAlign={'left'}>
          <Text fontSize={'md'}>Profile</Text>
          <Text fontSize={'md'}>{t(`guideStep${nextStep ?? 'Complete'}`)}</Text>
        </Stack>
        <CircularProgress
          value={progress}
          min={0}
          max={10}
          zIndex={0}
          size={'68px'}
          trackColor={colorMode === 'light' ? 'gray' : 'white'}
          color={colorMode === 'light' ? 'var(--venom3)' : 'var(--venom1)'}>
          <CircularProgressLabel fontSize={'sm'}>{` ${progress * 10} % `}</CircularProgressLabel>
        </CircularProgress>
      </Button>
      <Collapse in={isCollapsed} animateOpacity style={{ zIndex: notMobile ? 100 : 0 }}>
        <Flex
          flexDir={'column'}
          position={['relative', 'relative', 'relative', 'absolute']}
          left={[0, 0, 0, 6]}
          backgroundColor={colorMode === 'light' ? 'white' : 'blackAlpha.900'}
          borderRadius={8}
          width={notMobile ? 'xs' : '100%'}
          border="1px dashed"
          top={[0, 0, 0, '198px']}>
          <Flex
            align={'center'}
            justify={'space-between'}
            as={Button}
            size="lg"
            variant={'ghost'}
            borderBottomRadius={0}
            onClick={() => gotoTour(0)}>
            <Text>{t(`guideStep${0}`)}</Text>
            {title.length > 0 ? (
              <RiCheckboxCircleFill color="var(--venom2)" size={26} />
            ) : (
              <RiQuestionFill size={26} />
            )}
          </Flex>
          <Flex
            align={'center'}
            justify={'space-between'}
            as={Button}
            variant={'ghost'}
            size="lg"
            borderRadius={0}
            onClick={() => gotoTour(1)}>
            <Text>{t(`guideStep${1}`)}</Text>
            {subtitle.length > 0 ? (
              <RiCheckboxCircleFill color="var(--venom2)" size={26} />
            ) : (
              <RiQuestionFill size={26} />
            )}
          </Flex>
          <Flex
            gap={3}
            align={'center'}
            justify={'space-between'}
            borderRadius={0}
            size="lg"
            as={Button}
            variant={'ghost'}
            onClick={() => gotoTour(2)}>
            <Text>{t(`guideStep${2}`)}</Text>
            {avatar.length > 0 ? (
              <RiCheckboxCircleFill color="var(--venom2)" size={26} />
            ) : (
              <RiQuestionFill size={26} />
            )}
          </Flex>
          <Flex
            align={'center'}
            justify={'space-between'}
            borderRadius={0}
            as={Button}
            size="lg"
            variant={'ghost'}
            onClick={() => gotoTour(3)}>
            <Text>{t(`guideStep${3}`)}</Text>
            {bio.length > 0 ? (
              <RiCheckboxCircleFill color="var(--venom2)" size={26} />
            ) : (
              <RiQuestionFill size={26} />
            )}
          </Flex>
          <Flex
            align={'center'}
            justify={'space-between'}
            borderRadius={0}
            as={Button}
            size="lg"
            variant={'ghost'}
            onClick={() => gotoTour(4)}>
            <Text>{t(`guideStep${4}`)}</Text>
            {wallets.length > 1 ? (
              <RiCheckboxCircleFill color="var(--venom2)" size={26} />
            ) : (
              <RiQuestionFill size={26} />
            )}
          </Flex>
          <Flex
            align={'center'}
            justify={'space-between'}
            borderRadius={0}
            as={Button}
            size="lg"
            variant={'ghost'}
            onClick={() => gotoTour(5)}>
            <Text>{t(`guideStep${5}`)}</Text>
            {links.length > 0 ? (
              <RiCheckboxCircleFill color="var(--venom2)" size={26} />
            ) : (
              <RiQuestionFill size={26} />
            )}
          </Flex>
          <Flex
            align={'center'}
            justify={'space-between'}
            borderRadius={0}
            as={Button}
            size="lg"
            variant={'ghost'}
            onClick={() => gotoTour(6)}>
            <Text>{t(`guideStep${6}`)}</Text>
            {socials.length > 0 ? (
              <RiCheckboxCircleFill
                color={socials.length > 1 ? 'var(--venom2)' : 'var(--venom00)'}
                size={26}
              />
            ) : (
              <RiQuestionFill size={26} />
            )}
          </Flex>
          <Flex
            align={'center'}
            justify={'space-between'}
            as={Button}
            size="lg"
            variant={'ghost'}
            borderRadius={0}
            onClick={() => gotoTour(8)}>
            <Text>{t(`guideStep${8}`)}</Text>
            {socials.length > 0 ? (
              <RiCheckboxCircleFill color="var(--venom2)" size={26} />
            ) : (
              <RiQuestionFill size={26} />
            )}
          </Flex>
          <Flex
            align={'center'}
            justify={'space-between'}
            borderTopRadius={0}
            as={Button}
            variant={'ghost'}
            size="lg"
            onClick={() => gotoTour(9)}>
            <Text>{t(`guideStep${9}`)}</Text>
            {jsonHash.length > 20 ? (
              <RiCheckboxCircleFill color="var(--venom2)" size={26} />
            ) : (
              <RiQuestionFill size={26} />
            )}
          </Flex>
        </Flex>
      </Collapse>
      <Steps
        enabled={isOpen}
        steps={TOUR_STEPS}
        initialStep={currentStep}
        options={{ tooltipClass: 'tour', overlayOpacity: 0.7, disableInteraction: false }}
        onExit={() => {
          setIsOpen(false);
        }}
      />
      {/* <Hints enabled={hintsEnabled} hints={hints} /> */}
    </>
  );
}