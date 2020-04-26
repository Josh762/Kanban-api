import mongoose from "mongoose";

class DataService {
    constructor(model) {
        this.model = model;
        this._getAll = this._getAll.bind(this);
        this.testFunc = this.testFunc.bind(this);
        this._getByPrimaryKey = this._getByPrimaryKey.bind(this);
        this.__getByKeyValue = this._getByKeyValue.bind(this);
        // this.getByPrimaryKey = this.getByPrimaryKey.bind(this);
        // this.getByKey = this.getByKey.bind(this);
        // this.insert = this.insert.bind(this);
        // this.update = this.update.bind(this);
        // this.delete = this.delete.bind(this);
    }

    testFunc() {
        return "test";
    }

    async _getAll(query) {
        let { skip, limit } = query;

        skip = skip ? Number(skip) : 0;
        limit = limit ? Number(limit) : 10;

        delete query.skip;
        delete query.limit;

        if (query._id) {
            try {
                query._id = new mongoose.mongo.ObjectId(query._id);
            } catch (error) {
                console.log("not able to generate mongoose id with content", query._id);
            }
        }

        try {
            let data = await this.model
                .find(query)
                .skip(skip)
                .limit(limit);
            let total = await this.model.count();

            return {
                error: false,
                statusCode: 200,
                data: data,
                total
            };
        } catch (errors) {
            console.error('error', errors);
            return {
                error: true,
                statusCode: 500,
                errors
            };
        }
    }

    async _getByPrimaryKey(id) {
        try {
            let object_id = new mongoose.mongo.ObjectId(id);
            let data = await this.model.findById(object_id);
            return {
                error: false,
                statusCode: 200,
                data
            };
        }
        catch(error) {
            console.log("error", error);
            return {
                error: true,
                statusCode: 500,
                message: error.errmsg || "Not able to get with id: " + id,
                errors: error.errors
            };
        }
    }

    async _getByKeyValue(query) {
        try {
            let data = await this.model.find(query);
            return {
                error: false,
                statusCode: 200,
                data
            };
        }
        catch(error) {
            console.log("error", error);
            return error;
            // return {
            //     error: true,
            //     statusCode: 500,
            //     message: error.errmsg || "Not able to get with key: " + key + ", value: " + value,
            //     errors: error.errors
            // };
        }
    }

    async _getOneByKeyValue(key, value) {
        // try {
            let query = {};
            query[key] = value;

            let data = await this.model.findOne(query);
            if (data === null) throw new Error("Not able to get with key: " + key + ", value: " + value);


            return {
                error: false,
                statusCode: 200,
                data
            };
        // }
        // catch(error) {
        //     console.log("error", error);
        //     return error;
        //     // return {
        //     //     error: true,
        //     //     statusCode: 500,
        //     //     message: error.errmsg || "Not able to get with key: " + key + ", value: " + value,
            //     errors: error.errors
            // };
        // }
    }

    async insert(data) {
        let item = await this.model.create(data);
    }

    // async getByPrimaryKey(id) {
    //     // let { id } = query;
    //     console.log('GET BY PRIMARY KEY', id);
    //     try {
    //         let object_id = new mongoose.mongo.ObjectId(id);
    //         let item = await this.model.findById(object_id);
    //         return {
    //             error: false,
    //             statusCode: 200,
    //             item
    //         };
    //     }
    //     catch(error) {
    //         console.log("error", error);
    //         return {
    //             error: true,
    //             statusCode: 500,
    //             message: error.errmsg || "Not able to get with id: " + id,
    //             errors: error.errors
    //         };
    //     }
    // }
    //
    // async getByKey(key, value) {
    //     // let { id } = query;
    //     try {
    //         let object_id = new mongoose.mongo.ObjectId(id);
    //         let item = await this.model.findById(object_id);
    //         return {
    //             error: false,
    //             statusCode: 200,
    //             item
    //         };
    //     }
    //     catch(error) {
    //         console.log("error", error);
    //         return {
    //             error: true,
    //             statusCode: 500,
    //             message: error.errmsg || "Not able to get with id: " + id,
    //             errors: error.errors
    //         };
    //     }
    // }
    //
    //
    // async update(id, data) {
    //     return await this.model.findByIdAndUpdate(id, data, { new: true });
    // }
    //
    // async delete(id) {
    //     let item = await this.model.findByIdAndDelete(id);
    // }
}

export default DataService;