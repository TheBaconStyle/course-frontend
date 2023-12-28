'use client';

import { useJoyrideRun } from '@/app/store';
import dynamic from 'next/dynamic';
import { CallBackProps, Step } from 'react-joyride';

const Joyride = dynamic(() => import('react-joyride'), { ssr: false });

export type TJoyrideProvider = {};

const pagesSteps: Record<string, Step[]> = {
  courses: [
    {
      title: 'Выбор курсов',
      content: 'Здесь можно выбрать курсы',
      target: '#courses',
      disableBeacon: true,
      disableOverlay: true,
    },
  ],
};

export function JoyrideProvider({}: TJoyrideProvider) {
  const joyrideRun = useJoyrideRun((state) => state.run);
  const restartJoyride = useJoyrideRun((state) => state.restart);
  const handleCallack = (state: CallBackProps) => {
    if (state.action === 'reset') restartJoyride();
    // if (state.action === 'close') finishJoyride();
  };
  return (
    <Joyride
      run={joyrideRun}
      // callback={handleCallack}
      steps={pagesSteps.courses}
      // beaconComponent={(props) => <></>}
      // stepIndex={1}
      // disableOverlay
    />
  );
}
