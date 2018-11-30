const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check');

const dummycoin = require('../src/dummycoin');

const responseMiddleware = (req, res, next) => {
    return res.json(req.responseValue);
};
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'dummy Coin' });
});

router.post('/transactions/new', [
    check('sender', 'Sender must be a String').exists(),
    check('recipient', 'Recipient must be a String').exists(),
    check('amount', 'Amount must be a Int Value').isInt().exists()
], dummycoin.newTransaction, responseMiddleware);

router.get('/mine', dummycoin.mine, responseMiddleware);

router.get('/chain', dummycoin.getChain, responseMiddleware);

router.post('/node/register', [
    check('node', 'Node must be a String').exists()
], dummycoin.addNode, responseMiddleware);

module.exports = router;
