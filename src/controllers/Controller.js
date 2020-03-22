

class Controller {

    constructor(service) {
        this.service = service;
        this.getAll = this.getAll.bind(this);
        this.getByKey = this.getByKey.bind(this);
        this.insert = this.insert.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async getAll(req, res) {
        return res.status(200).send(await this.service.getAll(req.query));
    }

    async getByKey(req, res) {
        // Changing this function to behave differently if a query param is passed
        // IF no query param is present, find a single object by it's Object Id
        // ELSE a query param was passed, use it as the key to the value that was passed
        // ex: /api/board/123?key=boardId

        const { value } = req.params;
        // let response = await this.service.getByKey(id);

        if (req.query.key) {
            return res.status(200).send(await this.service.getByKey(value));
        } else {

            return res.status(200).send(await this.service.getByPrimaryKey(value));
        }

    }

    async insert(req, res) {

        let response = await this.service.insert(req.body);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response);
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

export default Controller;