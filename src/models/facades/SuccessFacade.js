


class SuccessFacade {

    constructor() {
        this.wrap = this.wrap.bind(this);
    }

    // TODO make this static
    wrap(isSuccess, data) {
        return isSuccess ? this.#success(data) : this.#error(data);
    }

    #success(data) {
        return {
            status: 200,
            error: false,
            data: data
        }
    }

    #error(error) {
        return {
            status: 500,
            error: true,
            message: error.errmsg || "",
            errors: error.errors
        }
    }

}

export default SuccessFacade;