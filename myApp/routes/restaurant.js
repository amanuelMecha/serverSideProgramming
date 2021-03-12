var express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
    req.db.collection('restaurants').find().toArray()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/best', (req, res) => {// 'address.coord': { $in: ['40.848447'] }
    req.db.collection('restaurants').find({ district: /^sil/ }).toArray()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
})


router.post('/', (req, res) => {
    req.db.collection('restaurants').insertOne(req.body)
        .then(data => {
            res.json({ status: "restaurants added successfully" })
        })
        .catch(err => {
            res.json(err)
        })
})
// does not prepare any cuisine of "American" and their grade score more than 70
router.get('/2', (req, res) => {
    req.db.collection('restaurants').find({ cuisine: { $ne: 'American' }, 'grades.score': { $gt: 10 } }).toArray()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })

})
// restaurant_id, name, district and cuisine restaurants which contains 'Wil' as first three letters for its name.

router.get('/3', (req, res) => {
    req.db.collection('restaurants').find({ 'name': /^will/ }).project({ 'restaurant_id': 1, 'name': 1, 'district': 1, 'cuisine': 1 }).toArray()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })

})
//those restaurants which contains 'Reg' as three letters somewhere in its name

router.get('/4', (req, res) => {
    req.db.collection('restaurants').find({ 'name': /.*Reg.*/ }).project({ 'restaurant_id': 1, 'name': 1, 'district': 1, 'cuisine': 1 }).toArray()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })

})
//which belongs to the district "Bronx" and prepared either American or Chinese dish., "cuisine": "Chinese" 
router.get('/5', (req, res) => {
    // req.db.collection('restaurants').find({ 'district': 'Bronx', $or: [{ 'cuisine': 'American','cuisine': 'Chinese'}] }).project({ 'restaurant_id': 1, 'name': 1, 'district': 1, 'cuisine': 1 }).toArray()
    req.db.collection('restaurants').find({ 'district': 'Bronx', 'cuisine': { $in: ['American', 'Chinese'] } }).toArray()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })

})

//district "Staten Island" or "Queens" or "Bronx" or "Brooklyn"
router.get('/6', (req, res) => {
    req.db.collection('restaurants').find({ 'district': { $in: ['Bronx', 'Queens', 'Brooklyn', 'Staten Island'] } })
        .project({ "restaurant_id": 1, "name": 1, "district": 1, "cuisine": 1 }).toArray()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })

})

//e not belonging to the district "Staten Island" or "Queens" or "Bronx" or "Brooklyn".
router.get('/7', (req, res) => {
    req.db.collection('restaurants').find({ 'district': { $nin: ['Bronx', 'Queens', 'Brooklyn', 'Staten Island'] } })
        .project({ "restaurant_id": 1, "name": 1, "district": 1, "cuisine": 1 }).toArray()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })

})

//a score which is not more than 10.
router.get('/8', (req, res) => {
    req.db.collection('restaurants').find({ 'grades.score': { $lte: 10 } })
        .project({ "restaurant_id": 1, "name": 1, "district": 1, "cuisine": 1 }).toArray()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })

})


module.exports = router;