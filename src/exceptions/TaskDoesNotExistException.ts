import BaseHttpException from "./BaseHttpException";

class TaskDoesNotExistException extends BaseHttpException {

    constructor(id:string) {
        const status = 404;
        const message = `Task with id ${id} does not exist.`
        super(status, message);
    }
}

export default TaskDoesNotExistException;
