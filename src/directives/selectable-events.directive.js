class SelectableEvents {
    static getInstance($parse) {
        return (scope, element, attr) => {
            let selectableEvents = scope.$eval(attr.selectableEvents) || {};

            $.map(selectableEvents, (callback, eventName) => {
                element.bind("selectable" + eventName, (e, ui) => {
                    if (e.preventDefault) e.preventDefault();

                    let selectableList = scope.$eval(attr.selectableList);
                    let selected = !selectableList? [] : element.find('.ui-selected').map(function() {
                        return selectableList[$(this).index()];
                    }).get();

                    let fn = $parse(callback);
                    scope.$apply(() => {
                        fn(scope, {
                            $ui: ui,
                            $event: e,
                            $list: scope.$eval(attr.selectableList),
                            $selected: selected
                        });
                    });
                });
            });
        }
    }
}

SelectableEvents.getInstance.$inject = ['$parse'];

export default SelectableEvents;