import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <a href="/" style="margin-left: 60px;">
        <img
          src="./assets/images/logos/etap.png"
          class="align-middle m-2"
          alt="logo"
          style="width: 100px; height: auto; margin-left: 20px;"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
