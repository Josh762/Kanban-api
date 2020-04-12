import DataService from "./dataAccess/DataService";

class _BaseService {

    constructor(model) {
        this.BaseDataService = new DataService(model);
    }

    async insert(obj) {
        return await this.BaseDataService.insert(obj);
    }

    async getById(id) {
        return await this.BaseDataService._getByPrimaryKey(id);
    }

    async getByKeyValue(key, value) {
        return await this.BaseDataService._getByKeyValue(key, value);
    }
}

export default _BaseService