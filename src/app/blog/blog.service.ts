import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, of } from 'rxjs';

import { IVmPage } from '~/shared/vmPage';
import { IVmBlog } from './vmBlog';

@Injectable()
export class BlogService {
  constructor(private http: HttpClient) {}

  getBlogStubs(pageNo: number, pageSize: number): Observable<IVmPage<IVmBlog>> {
    const count = 4;
    const startId = 1 + (pageNo - 1) * pageSize;
    return forkJoin([...new Array(pageSize).keys()]
      .map(index => startId + index)
      .filter(id => id <= count)
      .map(id => this.http.get<IVmBlog>(`assets/data/blogs/${id}.json`))
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

  getBlog(id: number): Observable<IVmBlog> {
    return forkJoin([
      this.http.get<IVmBlog>(`assets/data/blogs/${id}.json`),
      id > 1 ? this.http.get<IVmBlog>(`assets/data/blogs/${id - 1}.json`) : of(null),
      id < 4 ? this.http.get<IVmBlog>(`assets/data/blogs/${id + 1}.json`) : of(null)
    ]).pipe(map(([blog, prev, next]) => {

      return {
        ...blog,
        prevBlog: prev,
        nextBlog: next
      };
    }));
  }
}