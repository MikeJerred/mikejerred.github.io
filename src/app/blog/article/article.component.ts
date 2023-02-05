import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { PageLoadedService } from '~/shared/page-loaded/page-loaded.service';
import { BlogService } from '../blog.service';
import { IVmBlog } from '../vmBlog';

@Component({
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {
  private articleId: number;
  private subscription: Subscription;
  isPageLoaded = false;

  article: IVmBlog;
  showShareLinks = false;
  linkedInLink: string;
  facebookLink: string;
  twitterLink: string;
  googlePlusLink: string;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    pageLoadedService: PageLoadedService) {

    this.subscription = pageLoadedService.pageLoaded$().subscribe(isLoaded => {
      this.isPageLoaded = this.isPageLoaded || isLoaded;
    });
  }

  ngOnInit(): void {
    this.articleId = +this.route.snapshot.paramMap.get('id');
    this.getArticle();
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  getArticle(): void {
    this.blogService.getBlog(this.articleId).subscribe(result => {
      this.article = result;

      const url = encodeURIComponent(window.location.href);
      const title = result.headline;
      const summary = '';

      this.linkedInLink = 'https://www.linkedin.com/shareArticle?mini=true&url=' + url
        + '&title=' + title
        + '&summary=' + summary
        + '&source=' + url;
      this.facebookLink = 'https://www.facebook.com/sharer/sharer.php?u=' + url + '&title=' + title;
      this.googlePlusLink = 'https://plus.google.com/share?url=' + url;
      this.twitterLink = 'https://twitter.com/intent/tweet/?source=' + url + '&text=' + title + ':%20' + url;
    });
  }
}
