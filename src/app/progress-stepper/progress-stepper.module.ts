import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeakProgressStepperComponent } from './progress-stepper.component';
import { PeakIconModule } from '@ascentgl/peak-icons';
import { PeakGestureModule } from '../gesture/gesture.module';
import { PEAK_GESTURE_DEFAULT_OPTIONS } from '../gesture/gesture.directive';
import { PeakGestureDirection } from '../gesture/gesture-direction.enum';

@NgModule({
  declarations: [PeakProgressStepperComponent],
  imports: [CommonModule, PeakIconModule, PeakGestureModule],
  exports: [PeakProgressStepperComponent],
  providers: [
    {
      provide: PEAK_GESTURE_DEFAULT_OPTIONS,
      useValue: { direction: PeakGestureDirection.DIRECTION_HORIZONTAL },
    },
    { provide: Window, useValue: window },
  ],
})
export class PeakProgressStepperModule {}
