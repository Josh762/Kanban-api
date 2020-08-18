

//
//
//
// const postBlogpost = async (req, res, next) => {
//     const {user, content} = req.body;
//     try {
//         await createBlogpost(user, content);
//         res.sendStatus(201)
//         next()
//     } catch(e) {
//         console.log(e.message)
//         res.sendStatus(500) && next(error)
//     }
// };
//
// module.exports = {
//     postBlogpost
// }