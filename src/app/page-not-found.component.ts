import { Component } from '@angular/core';

@Component({
  styleUrls: ['./page-not-found.component.scss'],
  template: `
    <section class="main container text-center">
      <div class="center">
        <div class="content">
          <h1>404 Not Found</h1>

          <p>Sorry the page you are looking for does not exist.</p>
        </div>
      </div>
    </section>

    <app-footer></app-footer>
  `
})
export class PageNotFoundComponent {}
