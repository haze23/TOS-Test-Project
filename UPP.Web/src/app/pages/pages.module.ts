import { NgModule } from '@angular/core';
import { NbAutocompleteModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { LookupComponent } from './upp/lookup/lookup.component';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    MiscellaneousModule,
    NbAutocompleteModule,
    
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
