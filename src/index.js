import angular from 'angular';
import ngRedux from 'ng-redux';
import ngResource from 'angular-resource';

import { default as componentsModule } from './components';
import { default as factoriesModule } from './factories';
import { default as directivesModule } from './directives';
import { default as rootReducer } from './reducers';

const app = angular.module('app', [ngRedux, ngResource, componentsModule, factoriesModule, directivesModule]);

app.config(($ngReduxProvider) => {
    $ngReduxProvider.createStoreWith(rootReducer);
});

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
});


