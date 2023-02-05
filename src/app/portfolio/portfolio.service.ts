import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, of } from 'rxjs';

import { IVmPage } from '~/shared/vmPage';
import { IVmPortfolio } from './vmPortfolio';

@Injectable()
export class PortfolioService {
    constructor(private http: HttpClient) {
    }

    getPortfolioStubs(pageNo: number, pageSize: number): Observable<IVmPage<IVmPortfolio>> {
        const count = 6;
        const startId = 1 + (pageNo - 1) * pageSize;
        return forkJoin([...new Array(pageSize).keys()]
          .map(index => startId + index)
          .filter(id => id <= count)
          .map(id => this.http.get<IVmPortfolio>(`assets/data/portfolios/${id}.json`))
        )
          .pipe(
            map(blogs => ({
              pageNo,
              pageSize,
              items: blogs,
              totalCount: count
            }))
          );
    }

    getPortfolio(id: number): Observable<IVmPortfolio> {
        return forkJoin([
          this.http.get<IVmPortfolio>(`assets/data/portfolios/${id}.json`),
          id > 1 ? this.http.get<IVmPortfolio>(`assets/data/portfolios/${id - 1}.json`) : of(null),
          id < 4 ? this.http.get<IVmPortfolio>(`assets/data/portfolios/${id + 1}.json`) : of(null)
        ]).pipe(map(([blog, prev, next]) => {

          return {
            ...blog,
            prevBlog: prev,
            nextBlog: next
          };
        }));
    }
}