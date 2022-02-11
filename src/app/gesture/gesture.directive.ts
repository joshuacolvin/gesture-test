import {
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  HostListener,
  Inject,
  InjectionToken,
  Output,
} from '@angular/core';
import { PeakGestureDirection } from './gesture-direction.enum';
import { PeakGestureCoordinates } from './gesture-coordinates.type';
import { PeakGestureConfig } from './gesture-config';

/** @ignore */
export const PEAK_GESTURE_DEFAULT_OPTIONS =
  new InjectionToken<PeakGestureConfig>('peak-gesture-default-options', {
    providedIn: 'root',
    factory: PEAK_GESTURE_DEFAULT_OPTIONS_FACTORY,
  });

/** @ignore */
export function PEAK_GESTURE_DEFAULT_OPTIONS_FACTORY(): PeakGestureConfig {
  return new PeakGestureConfig();
}

@Directive({
  selector: '[peakGesture]',
})
export class PeakGestureDirective {
  constructor(
    private el: ElementRef,
    @Inject(PEAK_GESTURE_DEFAULT_OPTIONS) private config: PeakGestureConfig
  ) {}

  private startingTouchCoordinates!: PeakGestureCoordinates;

  /** Event emitted when the user swipes down */
  @Output() gestureDown: EventEmitter<void> = new EventEmitter();

  /** Event emitted when the user swipes left */
  @Output() gestureLeft: EventEmitter<void> = new EventEmitter();

  /** Event emitted when the user swipes right */
  @Output() gestureRight: EventEmitter<void> = new EventEmitter();

  /** Event emitted when the user swipes up */
  @Output() gestureUp: EventEmitter<void> = new EventEmitter();

  /** @ignore */
  @HostListener('pointerdown', ['$event'])
  handleGestureStart(event: PointerEvent): boolean {
    console.log('pointerdown');
    if (window.PointerEvent) {
      this.el.nativeElement.setPointerCapture?.(event.pointerId);
    }

    this.startingTouchCoordinates = this.getGestureCoordinatesFromEvent(event);
    return false;
  }

  /** @ignore */
  @HostListener('pointerup', ['$event'])
  handleGestureEnd(event: PointerEvent): boolean {
    console.log('pointerup');
    if (window.PointerEvent) {
      this.el.nativeElement.releasePointerCapture(event.pointerId);
    }

    const { x, y } = this.getGestureCoordinatesFromEvent(event);
    const direction = this.getGestureDirection(
      x - this.startingTouchCoordinates.x,
      y - this.startingTouchCoordinates.y
    );

    this.emitGestureEvent(direction);
    return false;
  }

  @HostListener('touchstart', ['$event'])
  handleTouchStart(event: TouchEvent): boolean {
    console.log('touchstart');
    this.startingTouchCoordinates = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
    return false;
  }

  @HostListener('touchend', ['$event'])
  handleTouchEnd(event: TouchEvent): boolean {
    console.log('touchend');
    const endingTouchCoordinates = {
      x: event.touches[event.touches.length - 1].clientX,
      y: event.touches[event.touches.length - 1].clientY,
    };
    const direction = this.getGestureDirection(
      endingTouchCoordinates.x - this.startingTouchCoordinates.x,
      endingTouchCoordinates.y - this.startingTouchCoordinates.y
    );
    this.emitGestureEvent(direction);
    return false;
  }

  /** @ignore */
  private getGestureCoordinatesFromEvent(
    event: PointerEvent
  ): PeakGestureCoordinates {
    return { x: event.clientX, y: event.clientY };
  }

  /** @ignore */
  private getGestureDirection(x: number, y: number): PeakGestureDirection {
    if (x === y) {
      return PeakGestureDirection.DIRECTION_NONE;
    }

    if (Math.abs(x) >= Math.abs(y)) {
      return x < 0
        ? PeakGestureDirection.DIRECTION_LEFT
        : PeakGestureDirection.DIRECTION_RIGHT;
    }

    return y < 0
      ? PeakGestureDirection.DIRECTION_UP
      : PeakGestureDirection.DIRECTION_DOWN;
  }

  /** @ignore */
  private emitGestureEvent(direction: PeakGestureDirection): void {
    switch (direction) {
      case PeakGestureDirection.DIRECTION_LEFT:
        if (
          this.config.direction === PeakGestureDirection.DIRECTION_ALL ||
          this.config.direction === PeakGestureDirection.DIRECTION_HORIZONTAL
        ) {
          return this.gestureLeft.emit();
        }
        break;
      case PeakGestureDirection.DIRECTION_RIGHT:
        if (
          this.config.direction === PeakGestureDirection.DIRECTION_ALL ||
          this.config.direction === PeakGestureDirection.DIRECTION_HORIZONTAL
        ) {
          return this.gestureRight.emit();
        }
        break;
      case PeakGestureDirection.DIRECTION_UP:
        if (
          this.config.direction === PeakGestureDirection.DIRECTION_ALL ||
          this.config.direction === PeakGestureDirection.DIRECTION_VERTICAL
        ) {
          return this.gestureUp.emit();
        }
        break;
      case PeakGestureDirection.DIRECTION_DOWN:
        if (
          this.config.direction === PeakGestureDirection.DIRECTION_ALL ||
          this.config.direction === PeakGestureDirection.DIRECTION_VERTICAL
        ) {
          return this.gestureDown.emit();
        }
        break;
      default:
        return;
    }
  }
}
