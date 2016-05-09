//main entry point
import {bootstrap} from '@angular/platform-browser-dynamic';
import {App} from './src/app';
import {HTTP_PROVIDERS} from '@angular/http';

bootstrap(App, [
  HTTP_PROVIDERS
])
.catch(err => console.error(err));
