import { Component, inject } from '@angular/core';
import { PageService } from '../core/services/page.service';

@Component({ template: '' })
export class Page {
  protected pageService = inject(PageService);

  ngOnInit() {
    this.loadPageData();
  }

  protected loadPageData() {
    this.pageService.title = this.constructor.name;
  }
}
