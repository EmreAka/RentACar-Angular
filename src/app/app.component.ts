import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Rent A Car');
    this.meta.addTag({
      name: 'msvalidate.01',
      content: 'AAB7AA61E4E5E6C7E3A06E6A8E6397D7',
    });
  }
}
