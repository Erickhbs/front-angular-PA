import { bootstrapApplication,provideProtractorTestingSupport } from '@angular/platform-browser';
import { HomeComponent } from './app/home/home.component';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';

bootstrapApplication(HomeComponent,{
  providers:[
    provideProtractorTestingSupport(),
    provideRouter(routeConfig)
  ]
}).catch((err) => console.error(err));
