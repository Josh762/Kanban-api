
import _BaseController from './_BaseController';
import ColumnService from "./../services/ColumnService";

const columnService = new ColumnService();

class ColumnController extends _BaseController {

    constructor(service) {
        super(service);
    }

}

export default new ColumnController(columnService);