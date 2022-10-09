const express = require('express');
const router = express.Router()

//IMPORT MODEL
const Review = require('../models/review')
const Plugin = require('../models/plugin')

//IMPORT MIDDLEWARE
const { checkAuth, checkAdm } = require('../middlewares/authentication')



//POST request - create review
router.post('/review/:pluginId', checkAuth, async (req, res) => {
    try {
        const headline = req.body.headline
        const body = req.body.body
        const rating = req.body.rating
        const userId = req.userData._id
        const pluginId = req.params.pluginId

        const toCreate = {
            headline: headline,
            body: body,
            rating: rating,
            userId: userId,
            pluginId: pluginId
        }

        const createReview = await Review.create(toCreate)
        if (createReview) {
            const saveReviewPlugin = await Plugin.updateOne({_id: pluginId}, {$push: {reviews: createReview._id}})
            if (saveReviewPlugin) {
                return res.json({
                    status: 'success',
                })
            }
        }
    } catch (error) {
        const toReturn = {
            status: 'error',
            error: error
        }
        return res.status(500).json(toReturn)
    }
})


//GET request - get all Revies product
router.get('/reviews/:pluginId', async (req, res) => {
    try {
        const productReviews = await Review.find({pluginId: req.params.pluginId}).populate('userId').exec()
        if (productReviews) {
            return res.json({
                status: 'success',
                data: productReviews
            })
        }
    } catch (error) {
        const toReturn = {
            status: 'error',
            error: error
        }
        return res.status(500).json(toReturn)
    }
})


module.exports = router