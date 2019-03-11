import SchemaActions from '../../actions/schema.actions';
import UndoRedoActions from '../../actions/undoable.actions';

class CSBuilderController {
    constructor($ngRedux, SchemaResource) {

        this.unionable = [];
        this.unionDisabled = true;

        $ngRedux.connect(this.mapStateToThis, SchemaActions)(this);
        $ngRedux.connect(this.mapStateToThis, UndoRedoActions)(this);

        this.resource = SchemaResource;
    }

    $onInit() {
        this.resource.get({id:this.schemaId}).$promise
            .then(schema => {
                this.initState(schema);
                this.calculateScaleCoefficient();
            });
    }

    selectedEvent($event, $ui, $selected, $list) {
        this.unionDisabled = false;
        this.unionable = $selected;
    }

    union() {
        if (this.unionable.length > 0) {
            this.unionable.sort(function(a, b) {
                return (a.pos_x + a.pos_y) - (b.pos_x + b.pos_y);
            });

            let posMin = this.unionable[0];

            this.unionable.sort(function(a, b) {
                return ((a.pos_x + a.width) + (a.pos_y + a.height)) -
                       ((b.pos_x + b.width) + (b.pos_y + b.height));
            });

            let posMax = this.unionable[this.unionable.length - 1];

            let unionItem = {
                'width': (posMax.pos_x + posMax.width) - posMin.pos_x,
                'height': (posMax.pos_y + posMax.height) - posMin.pos_y,
                'pos_x': posMin.pos_x,
                'pos_y': posMin.pos_y
            };

            let removable = this.unionable.map(function (item) {
                return item.id;
            });

            let items = this.removeById(removable);
            unionItem.schema_id = this.schemaId;
            unionItem.id = removable[0];
            items.push(unionItem);

            this.setItems(items);

            this.unionDisabled = true;
        }
    }

    update() {
        this.resource.update({id:this.schemaId}, this.schema).$promise
            .then(data => {
                console.log(data);
            })
    }

    removeById(removable) {
        let items = angular.copy(this.schema.items);
        for (let i = 0; i < items.length; i++) {
            let obj = items[i];
            if (removable.indexOf(obj.id) !== -1) {
                items.splice(i, 1);
                i--;
            }
        }
        return items;
    }

    calculateScaleCoefficient() {
        const schemaContainerWidth = 400;

        this.cellWidth = this.schema.width / this.schema.cells_x;
        this.cellHeight = this.schema.height / this.schema.cells_y;

        this.scaleCoefficient = schemaContainerWidth / this.schema.width;
    }

    mapStateToThis(state) {
        return {
            schema: state.undoableSchema.present
        };
    }
}

CSBuilderController.$inject = ['$ngRedux', 'SchemaResource'];

export default CSBuilderController;