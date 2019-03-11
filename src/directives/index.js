import Selectable from './selectable.directive';
import SelectableEvents from './selectable-events.directive';

let module = 'app.directives';
angular.module(module, [])
    .directive('selectable', Selectable.getInstance)
    .directive('selectableEvents', SelectableEvents.getInstance);

export default module;