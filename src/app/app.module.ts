import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PeakProgressStepperModule } from './progress-stepper/progress-stepper.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PeakProgressStepperModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
