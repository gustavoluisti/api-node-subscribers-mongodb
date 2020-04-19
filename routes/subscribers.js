const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscribers');

router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.status(200).json(subscribers);

    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

router.get('/:id',getSubscriber, async (req, res) => {
    res.status(200).json(res.subscriber);
    // const { id } =  req.params
    // try {
    //     const subscriber = await Subscriber.findById(id);
    //     res.status(200).json(subscriber);
    // } catch (error) {
    //     res.status(500).json({message: error.message});
    // }
});

router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        userName: req.body.userName,
        userChannel: req.body.userChannel,
    });

    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch (error) {
        res.status(500).json({message: error.message});
    }


});

router.patch('/:id', getSubscriber, (req, res) => {

});

router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove();
        res.json({ message: 'Subscriber was deleted'})
    } catch (error) {
        res.status(500).json({ message: error.message});
    }

});

async function getSubscriber(req, res, next) {
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null) {
            return res.status(404).json({ message: 'subscriber not found'})
        }
    } catch (error) {
        res.status(500).json({ message: error.message});
    }

    res.subscriber = subscriber;
    next();
}


module.exports = router