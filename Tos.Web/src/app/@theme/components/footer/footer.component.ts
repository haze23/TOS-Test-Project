import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Developed  by <b><a href="https://hzytyne@yahoo.com" target="_blank">Haze</a></b> 2020
    </span>   
  `,
})
export class FooterComponent {
}
