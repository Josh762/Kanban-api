import DataService from "./dataAccess/DataService";

class _BaseService {

    constructor(model) {
        this.BaseDataService = new DataService(model);
    }

    async insert(obj) {
        return await this.BaseDataService._insert(obj);
    }

    async getById(id) {
        return await this.BaseDataService._getByPrimaryKey(id);
    }

    async getByKeyValue(query) {
        return await this.BaseDataService._getByKeyValue(query);
    }
}

export default _BaseService