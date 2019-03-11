class Selectable {
    static getInstance() {
        return (scope, element, attr) => {
            let options = scope.$eval(attr.selectableOptions) || {};

            if (attr.selectableList && attr.selectableOut) {
                element.bind("selectablestop", () => {
                    let selectableList = scope.$eval(attr.selectableList),
                        selectableOut  = scope.$eval(attr.selectableOut), s;
                    let selected = !selectableList? [] : element.find('.ui-selected').map(function() {
                        return selectableList[$(this).index()];
                    }).get();
                    scope.$apply(() => {
                        if(selectableOut===undefined)
                            scope[attr.selectableOut] = selectableOut = [];
                        selectableOut.splice(0);
                        while(s = selected.shift())
                            selectableOut.push(s);
                    });
                });
            }

            scope.$watch(attr.selectable, (value, old) => {
                if (value || value===undefined)
                    return element.selectable(options);
                if (!value && old) {
                    element.selectable("destroy");
                    element.find('.ui-selected').removeClass('ui-selected');
                    if (attr.selectableOut) {
                        scope[attr.selectableOut] = [];
                    }
                }
            })
        }
    }
}

export default Selectable;