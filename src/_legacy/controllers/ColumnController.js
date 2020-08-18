
import _BaseController from './_BaseController';
import ColumnService from "../services/ColumnService";

const columnService = new ColumnService();

class ColumnController extends _BaseController {

    constructor(service) {
        super(service);
    }
    async getByKeyValue(req, res) {
        const { id } = req.params;
        const key = 'boardId';
        console.log('**params',req.params,'**key', key, '**val', id);
        return res.status(200).send(await this.service.getByKeyValue({'boardId':id}));
    }
}

export default new ColumnController(columnService);
