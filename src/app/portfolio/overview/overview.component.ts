import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IVmPage } from '~/shared/vmPage';

import { PortfolioService } from '../portfolio.service';
import { IVmPortfolio } from '../vmPortfolio';

@Component({
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  portfolios: IVmPage<IVmPortfolio>;
  pageNo = 1;
  pageSize = 6;

  constructor(
    private route: ActivatedRoute,
    private portfolioService: PortfolioService) {
  }

  ngOnInit(): void {
    this.pageNo = +this.route.snapshot.queryParamMap.get('pageNo') || 1;
    this.getPage();
  }

  private getPage(): void {
    this.portfolioService
      .getPortfolioStubs(this.pageNo, this.pageSize)
      .subscribe(result => this.portfolios = result);
  }
}
