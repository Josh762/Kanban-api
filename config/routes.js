import AuthController from './../src/controllers/AuthController';
import BoardController from './../src/controllers/BoardController';
import ColumnController from './../src/controllers/ColumnController';
import CardController from './../src/controllers/CardController';
import UserController from './../src/controllers/UserController';

export default (server) => {

    // AUTH ROUTES

    // BOARD ROUTES
    server.post(`/api/board`, BoardController.insert);
    server.get(`/api/board/:id`, BoardController.getByPrimaryKey);
    server.get(`/api/board/user/:id`, BoardController.getByKeyValue);
    server.put(`/api/board/:id`, BoardController.update);
    server.delete(`/api/board/:id`, BoardController.delete);

    // COLUMN ROUTES // TODO implement these
    server.post(`/api/column`, ColumnController.insert);
    server.get(`/api/column/:id`, ColumnController.getByPrimaryKey);
    server.get(`/api/column/board/:id`, ColumnController.getByKeyValue);
    server.put(`/api/column/:id`, ColumnController.update);
    server.delete(`/api/column/:id`, ColumnController.delete);

    // CARD ROUTES // TODO implement these
    server.post(`/api/card`, CardController.insert);
    server.get(`/api/card/:id`, CardController.getByPrimaryKey);
    server.get(`/api/card/column/:id`, CardController.getByKeyValue);
    server.put(`/api/card/:id`, CardController.update);
    server.delete(`/api/card/:id`, CardController.delete);

    // USER ROUTES // TODO implement these
    server.post(`/api/user`, UserController.insert);
    server.get(`/api/user/:id`, UserController.getByPrimaryKey);
    server.put(`/api/user/:id`, UserController.update);
    server.delete(`/api/user/:id`, UserController.delete);
    server.post('/api/login', UserController.login);

}