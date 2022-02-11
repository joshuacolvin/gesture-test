import { NgModule } from '@angular/core';

import { PeakGestureDirective } from './gesture.directive';

@NgModule({
  exports: [PeakGestureDirective],
  declarations: [PeakGestureDirective],
})
export class PeakGestureModule {}
