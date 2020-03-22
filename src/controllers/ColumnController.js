
import Controller from './Controller';
import ColumnService from "./../services/ColumnService";
import Column from '../models/dataModels/Column';

const columnService = new ColumnService(
    new Column().getInstance()
);

class ColumnController extends Controller {

    constructor(service) {
        super(service);
    }
}

export default new ColumnController(columnService);