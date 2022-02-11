import { PeakIconModule } from '@ascentgl/peak-icons';
import { moduleMetadata, Story } from '@storybook/angular';
import { PeakProgressStepperComponent } from './progress-stepper.component';
import { PeakProgressStepperModule } from './progress-stepper.module';

const Template: Story<PeakProgressStepperComponent> = (args: PeakProgressStepperComponent) => ({
  component: PeakProgressStepperComponent,
  props: args,
});

export const Primary = Template.bind({});

Primary.args = {
  steps: [
    {
      title: 'ATD Vesel Port',
      date: '11/12/2020',
      completed: false,
    },
    {
      title: 'Entry Date',
      date: '11/12/2020',
      completed: true,
    },
    {
      title: 'Clearance Date',
      date: '11/12/2020',
      completed: false,
    },
    {
      title: 'ETA Last Vesel',
      date: '11/12/2020',
      completed: true,
    },
    {
      title: 'Delivered',
      completed: false,
    },
  ],
  isMobile: false,
};

Primary.decorators = [
  moduleMetadata({
    imports: [PeakIconModule, PeakProgressStepperModule],
    providers: [{ provide: Window, useValue: window }],
  }),
];
