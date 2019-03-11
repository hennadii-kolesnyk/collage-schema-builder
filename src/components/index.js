import CSBuilderComponent from './csbuilder';

let module = 'app.components';

angular.module(module, [])
    .component('csBuilder', CSBuilderComponent);

export default module;