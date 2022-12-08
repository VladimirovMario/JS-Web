const gameController = require('express').Router();

const { hasUser } = require('../middlewares/guards');
const { getAll, createGame, getById, deleteById, updateById } = require('../services/gameService');
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

gameController.post('/', hasUser(), async (req, res) => {
    try {
        const data = Object.assign({ _ownerId: req.user._id }, req.body);
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


gameController.put('/:id', hasUser(), async (req, res, next) => {
    const item = await getById(req.params.id);
    if (req.user._id != item._ownerId) {
        return res.status(403).json({ message: 'You cannot modify this record' });
    }

    try {
        const result = await updateById(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        const message = parseError(err);
        res.status(400).json({ message });
    }
});

gameController.delete('/:id', hasUser(), async (req, res) => {
    const item = await getById(req.params.id);
    if (req.user._id != item._ownerId) {
        return res.status(403).json({ message: 'You cannot modify this record' });
    }

    try {
        await deleteById(req.params.id);
        res.status(204).end();
    } catch (err) {
        const message = parseError(err);
        res.status(400).json({ message });
    }
});


module.exports = gameController;