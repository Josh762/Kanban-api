import PostController from './../src/controllers/PostController';
import BoardController from './../src/controllers/BoardController';

export default (server) => {

    // POST ROUTES
    server.get(`/api/post`, PostController.getAll);
    server.post(`/api/post`, PostController.insert);
    server.put(`/api/post/:id`, PostController.update);
    server.delete(`/api/post/:id`, PostController.delete);

    // BOARD ROUTES
    // server.get(`/api/board/:id`, BoardController.get)
    server.get(`/api/board`, BoardController.getAll);
    server.get(`/api/board/:id`, BoardController.getByKey); // key is passed as query param, will default to objectId if not present
    server.post(`/api/board`, BoardController.insert);
    server.put(`/api/board/:id`, BoardController.update);
    server.delete(`/api/board/:id`, BoardController.delete);

}