import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  steps = [
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
  ];
  isMobile = true;
}
