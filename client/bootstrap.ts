//main entry point
import {bootstrap} from 'angular2/platform/browser';
import {App} from './src/app';
import {HTTP_PROVIDERS} from 'angular2/http';

bootstrap(App, [
  HTTP_PROVIDERS
])
.catch(err => console.error(err));
