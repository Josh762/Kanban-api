import BoardController from './../src/controllers/BoardController';
import ColumnController from './../src/controllers/ColumnController';
import CardController from './../src/controllers/CardController';

export default (server) => {

    // BOARD ROUTES
    server.get(`/api/board`, BoardController.getAll);
    server.get(`/api/board/:id`, BoardController.getByKey);
    server.post(`/api/board`, BoardController.insert);
    server.put(`/api/board/:id`, BoardController.update);
    server.delete(`/api/board/:id`, BoardController.delete);

    // COLUMN ROUTES // TODO implement these
    server.post(`/api/column`, ColumnController.insert);
    server.get(`/api/column/:id`, ColumnController.getByKey);
    server.put(`/api/column/:id`, ColumnController.update);
    server.delete(`/api/column/:id`, ColumnController.delete);

    // CARD ROUTES // TODO implement these
    server.post(`/api/card`, CardController.insert);
    server.get(`/api/card/:id`, CardController.getByKey);
    server.put(`/api/card/:id`, CardController.update);
    server.delete(`/api/card/:id`, CardController.delete);

}