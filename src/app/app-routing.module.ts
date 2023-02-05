import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeModule } from './home/home.module';
import { BlogModule } from './blog/blog.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { IntroComponent } from './intro/intro.component';
import { PageNotFoundComponent } from './page-not-found.component';

const routes: Routes = [
  { path: '', component: IntroComponent },
  // { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  // { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  // { path: 'portfolio', loadChildren: () => import('./portfolio/portfolio.module').then(m => m.PortfolioModule) },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    HomeModule,
    BlogModule,
    PortfolioModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'disabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
