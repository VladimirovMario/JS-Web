const gameController = require('express').Router();

const { hasUser } = require('../middlewares/guards');
const { getAll, createGame, getById, deleteById, updateById , addGameToFavorites, getUserFavorites} = require('../services/gameService');
const { parseError } = require('../util/parser');



gameController.get('/', async (req, res) => {
    
    let items = [];
    if (req.query.where) {
        const userId = JSON.parse(req.query.where.split('=')[1]);
        items = await getByUserId(userId);
    } else {
        items = await getAll();
    }
    res.json(items);
});

// hasUser()
gameController.post('/', async (req, res) => {
    try {
        // const data = Object.assign({ _ownerId: req.user._id }, req.body);
        const data =  req.body;

        const item = await createGame(data);
        res.json(item);
    } catch (err) {
        const message = parseError(err);
        res.status(400).json({ message });
    }
});

gameController.get('/:id', async (req, res ) => {
    const item = await getById(req.params.id);
    res.json(item);
});

// hasUser()
gameController.put('/:id',  async (req, res, next) => {
    const item = await getById(req.params.id);
    // if (req.user._id != item._ownerId) {
    //     return res.status(403).json({ message: 'You cannot modify this record' });
    // }

    try {
        const result = await updateById(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        const message = parseError(err);
        res.status(400).json({ message });
    }
});
// hasUser(),
gameController.delete('/:id',  async (req, res) => {
    const item = await deleteById(req.params.id);
    // if (req.user._id != item._ownerId) {
    //     return res.status(403).json({ message: 'You cannot modify this record' });
    // }

    try {
        await deleteById(req.params.id);
        res.status(204).end();
    } catch (err) {
        const message = parseError(err);
        res.status(400).json({ message });
    }
});

gameController.post('/:gameId/liked/:userId', async (req, res) => {
    const { gameId, userId } =  req.params;
      try {
       const item =  await addGameToFavorites( gameId, userId );
       res.json(item);
    } catch (err) {
        const message = parseError(err);
        res.status(400).json({ message });
    }
});

gameController.get('/liked/:userId', async (req, res) => {
    const { userId } =  req.params;
    try {
        const item = await getUserFavorites(userId);
        res.json(item);
    } catch (err) {
        const message = parseError(err);
        res.status(400).json({ message });
    }
});

module.exports = gameController;
