import BoardController from './../src/controllers/BoardController';
import ColumnController from './../src/controllers/ColumnController';

export default (server) => {

    // BOARD ROUTES
    server.get(`/api/board`, BoardController.getAll);
    server.get(`/api/board/:id`, BoardController.getByKey); // key is passed as query param, will default to objectId if not present
    server.post(`/api/board`, BoardController.insert);
    server.put(`/api/board/:id`, BoardController.update);
    server.delete(`/api/board/:id`, BoardController.delete);

    // COLUMN ROUTES // TODO implement these
    server.post(`/api/column`, ColumnController.insert);
    server.get(`/api/board/:id`, ColumnController.getByKey); // key is passed as query param, will default to objectId if not present
    server.put(`/api/column/:id`, ColumnController.update);
    server.delete(`/api/column/:id`, ColumnController.delete);

    // CARD ROUTES
    server.post(`/api/board/`)

}