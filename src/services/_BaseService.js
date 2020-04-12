import DataService from "../dataAccess/DataService";

class _BaseService {

    constructor(model) {
        this.model = model;
        this.BaseDataService = new DataService(model);
    }

    async insert(obj) {
        return await this.BaseDataService.insert(obj);
    }

    async getById(id) {
        return await this.BaseDataService._getByPrimaryKey(id);
    }
}

export default _BaseService