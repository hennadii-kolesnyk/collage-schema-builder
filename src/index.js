import angular from 'angular';
import ngRedux from 'ng-redux';
import ngResource from 'angular-resource';

import './components';
import './factories';
import './directives';

import { default as rootReducer } from './reducers';

const app = angular.module('app', ['ngRedux', 'ngResource', 'app.components', 'app.factories', 'app.directives']);

app.config(['$ngReduxProvider', ($ngReduxProvider) => {
    $ngReduxProvider.createStoreWith(rootReducer);
}]);

app.config(['$interpolateProvider', ($interpolateProvider) => {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
}]);

app.constant('ApiEndpointUrl', 'https://mycommunityprint.local');


