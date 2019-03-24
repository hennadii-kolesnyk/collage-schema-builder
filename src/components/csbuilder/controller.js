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

            let item = {
                'schema_id': this.schemaId,
                'width': (posMax.pos_x + posMax.width) - posMin.pos_x,
                'height': (posMax.pos_y + posMax.height) - posMin.pos_y,
                'pos_x': posMin.pos_x,
                'pos_y': posMin.pos_y
            };

            let items = this.schema.items
                .filter(x => !this.unionable.includes(x));

            items.push(item);

            this.setItems(items);

            this.unionDisabled = true;
        }
    }

    update() {
        this.resource.update({id:this.schemaId}, this.schema).$promise
            .then(schema => {
                console.log(schema);
            })
    }

    reset() {
        this.resource.reset({id:this.schemaId}).$promise
            .then(schema => {
                this.initState(schema);
            })
    }

    calculateScaleCoefficient() {
        const schemaContainerWidth = document.getElementById('cs-builder').clientWidth;

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