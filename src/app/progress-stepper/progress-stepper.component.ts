import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
  Renderer2,
  ViewChild,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { ProgressStep } from './progress-step.types';

@Component({
  selector: 'peak-progress-stepper',
  templateUrl: './progress-stepper.component.html',
  styleUrls: ['./progress-stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeakProgressStepperComponent
  implements AfterViewInit, OnChanges, OnInit
{
  constructor(private renderer: Renderer2, private window: Window) {}

  /** @ignore */
  @ViewChild('stepper') stepper!: ElementRef;

  /** @ignore */
  @ViewChildren('stepElements') stepElements!: QueryList<ElementRef>;

  /** Whether the viewport is mobile */
  @Input() isMobile = false;

  /** Padding of parent container */
  @Input() containerPadding = 24;

  /** Steps to display */
  @Input() steps!: ProgressStep[];

  /** @ignore */
  public styles: any = {};

  /** @ignore */
  private focusedIndex = 0;

  /** @ignore */
  ngAfterViewInit() {
    if (this.isMobile) {
      this.focusedIndex = this.getLastCompletedStepIndex(this.steps);
      this.centerCurrentStep(this.focusedIndex);
    }
  }

  /** @ignore */
  ngOnChanges(changes: SimpleChanges) {
    if (changes?.['isMobile'] && !changes['isMobile'].firstChange) {
      this.focusedIndex = this.getLastCompletedStepIndex(this.steps);
      this.centerCurrentStep(this.focusedIndex);
    }

    if (
      changes?.['steps'] &&
      changes['steps']?.currentValue &&
      !changes['steps']?.firstChange
    ) {
      if (this.isMobile) {
        this.focusedIndex = this.getLastCompletedStepIndex(this.steps);
        this.centerCurrentStep(this.focusedIndex);
      }
    }
  }

  /** @ignore */
  ngOnInit() {
    this.styles = {
      step: {
        'grid-template-columns': `repeat(${this.steps.length}, minmax(150px, 1fr))`,
      },
    };
  }

  /** @ignore */
  public onSwipeLeft(): void {
    if (
      this.focusedIndex ===
        this.steps.length - this.calculateStepsPerViewport() ||
      !this.isMobile
    ) {
      return;
    }

    this.focusedIndex++;
    this.centerCurrentStep(this.focusedIndex);
  }

  /** @ignore */
  public onSwipeRight(): void {
    if (this.focusedIndex === 0 || !this.isMobile) {
      return;
    }

    this.focusedIndex--;
    this.centerCurrentStep(this.focusedIndex);
  }

  /** @ignore */
  private centerCurrentStep(focusedIndex: number): void {
    if (focusedIndex === 0) {
      this.renderer.setStyle(this.stepper.nativeElement, 'margin-left', '0px');
      return;
    }

    const stepWidth =
      this.stepElements.first.nativeElement.getBoundingClientRect().width;
    const offset = focusedIndex * stepWidth;
    this.renderer.setStyle(
      this.stepper.nativeElement,
      'margin-left',
      `-${offset}px`
    );
  }

  /** @ignore */
  private getLastCompletedStepIndex(steps: ProgressStep[]): number {
    return steps.map((step) => step.completed).lastIndexOf(true);
  }

  /** @ignore */
  private calculateStepsPerViewport(): number {
    const stepWidth =
      this.stepElements.first.nativeElement.getBoundingClientRect().width;
    return Math.floor(
      (this.window.innerWidth - this.containerPadding) / stepWidth
    );
  }
}
