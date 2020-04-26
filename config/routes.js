import AuthController from './../src/controllers/AuthController';
import BoardController from './../src/controllers/BoardController';
import ColumnController from './../src/controllers/ColumnController';
import CardController from './../src/controllers/CardController';
import UserController from './../src/controllers/UserController';

export default (server) => {

    // AUTH ROUTES

    // BOARD ROUTES
    server.post(`/api/board`, verifyToken, BoardController.insert);
    server.get(`/api/board/:id`, verifyToken, BoardController.getByPrimaryKey);
    server.get(`/api/board/user/:id`, verifyToken, BoardController.getByKeyValue);
    server.put(`/api/board/:id`, verifyToken, BoardController.update);
    server.delete(`/api/board/:id`, verifyToken, BoardController.delete);

    // COLUMN ROUTES // TODO implement these
    server.post(`/api/column`, verifyToken, ColumnController.insert);
    server.get(`/api/column/:id`, verifyToken, ColumnController.getByPrimaryKey);
    server.get(`/api/column/board/:id`, verifyToken, ColumnController.getByKeyValue);
    server.put(`/api/column/:id`, verifyToken, ColumnController.update);
    server.delete(`/api/column/:id`, verifyToken, ColumnController.delete);

    // CARD ROUTES // TODO implement these
    server.post(`/api/card`, verifyToken, CardController.insert);
    server.get(`/api/card/:id`, verifyToken, CardController.getByPrimaryKey);
    server.get(`/api/card/column/:id`, verifyToken, CardController.getByKeyValue);
    server.put(`/api/card/:id`, verifyToken, CardController.update);
    server.delete(`/api/card/:id`, verifyToken, CardController.delete);

    // USER ROUTES // TODO implement these
    server.post(`/api/user`, UserController.insert);
    server.get(`/api/user/:id`, verifyToken, UserController.getByPrimaryKey);
    server.put(`/api/user/:id`, verifyToken, UserController.update);
    server.delete(`/api/user/:id`, verifyToken, UserController.delete);
    server.post('/api/login', UserController.login);
    server.post('/api/signup', UserController.signup);

}

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}