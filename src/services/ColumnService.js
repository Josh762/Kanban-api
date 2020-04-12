import DataService from './dataAccess/DataService';
// import ColumnModel from '../models/dataModels/Column';


import {Column} from '../models/dataModels/dataModelsRegistry';

import SuccessFacade from '../models/facades/SuccessFacade';
import _BaseService from "./_BaseService";

class ColumnService extends _BaseService{

    #ColumnDataService = new DataService(Column);

    #successFacade = new SuccessFacade();
    constructor() {
        super(Column);
        this.getById = this.getById.bind(this);
    }

    // async getById(id) {
    //     // TODO need to get cards too, maybe only when a "detail" query value is passed.
    //     return await this.#getColumn(id);
    // }
    //
    // async #getColumn(id) {
    //     try {
    //         let columns = await this.#ColumnDataService._getByKeyValue('boardId', id);
    //         return this.#successFacade.wrap(true, columns)
    //     } catch(error) {
    //         console.error('Error', error);
    //         return this.#successFacade.wrap(false, error)
    //     }
    //
    // }
}

export default ColumnService;