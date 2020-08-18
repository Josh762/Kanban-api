

class _BaseController {

    constructor(service) {
        this.service = service;
        // this.getAll = this.getAll.bind(this);
        this.getByPrimaryKey = this.getByPrimaryKey.bind(this);
        this.getByKeyValue = this.getByKeyValue.bind(this);
        this.insert = this.insert.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    // async getAll(req, res) {
    //     return res.status(200).send(await this.service.getAll(req.query));
    // }

    async getByPrimaryKey(req, res) {
        const { id } = req.params;
        return res.status(200).send(await this.service.getById(id));
    }

    async getByKeyValue(req, res, next) {
        try {
            throw new Error("getByKeyValue must be implemented in the extending controller.");
        } catch(err) {
            next(err);
        }
    }

    async insert(req, res, next) {
        try {
            let response = await this.service.insert(req.body);
            res.status(201).send(response);
            next();
        } catch(e) {

            next(e);
        }
        // if (response.error) return res.status(response.statusCode).send(response); TODO error handling
    }

    async update(req, res) {
        const { id } = req.params;

        let response = await this.service.update(id, req.body);

        return res.status(response.statusCode).send(response);
    }

    async delete(req, res) {
        const { id } = req.params;

        let response = await this.service.delete(id);

        return res.status(response.statusCode).send(response);
    }

}

export default _BaseController;