import { Component, inject } from '@angular/core';
import { PageService } from '../core/services/page.service';
import { formatTitle } from '../core/helpers/text-format';

@Component({ template: '' })
export class Page {
  protected pageService = inject(PageService);

  ngOnInit() {
    this.loadPageData();
  }

  protected loadPageData() {
    this.pageService.title = formatTitle(this.constructor.name);
  }

}
