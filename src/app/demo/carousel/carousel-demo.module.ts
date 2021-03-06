import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselDemoComponent } from './carousel-demo.component';
import { RebirthNGModule } from '../../exports';

@NgModule({
  imports: [CommonModule, RebirthNGModule],
  exports: [CarouselDemoComponent],
  declarations: [CarouselDemoComponent],
  providers: [],
  entryComponents: [CarouselDemoComponent]
})
export class CarouselDemoModule {
}
