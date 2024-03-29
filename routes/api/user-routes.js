
const router = require('express').Router();
const {User} = require("../../models")

//TODO - ROUTE THAT GETS ALL THE USERS, include friends?
router.get('/', (req,res)=> {
    User.find({}, (err, users) => {
        if(err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(users)
        }
    })
});

//TODO - ROUTE THAT CREATES A NEW USER
//to not include thoughts and friends? not working with them
router.post('/', (req,res)=> {
    User.create({
        username: req.body.username,
        email: req.body.email,
        friends: req.body.friends,

    }, (err, user) => {
        if(err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(user)
        }
    })

});

//TODO - ROUTE THAT GETS A SINGLE USER BASED ON USER ID
router.get('/:userId', (req,res) => {
    User.findOne({_id: req.params.userId}, (err, user) => {
        if(err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(user)
        }
    })

})

//TODO - ROUTE THAT UPDATES A SINGLE USER
//no bueno, throws user and email in diff order
router.put('/:userId', (req,res)=> {
    User.findOneAndUpdate({_id: req.params.userId}, {
        username: req.body.username,
        email: req.body.email
    }, (err, user) => {
        if(err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(user)
        }
    })
})

//TODO - ROUTE THAT DELETES A SINGLE USER BASED ON USER ID
router.delete('/:userId', (req,res)=> {
    User.findOneAndDelete({_id: req.params.userId}, (err, user) => {
        if(err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(user)
        }
    })
});

//TODO - ROUTE THAT ADDS A FRIEND TO A USER
router.post('/:userId/friends/:friendId', async (req,res)=> {
    User.findOneAndUpdate(
        {_id: req.params.userId}, 
        {$addToSet: {friends: req.params.friendId}}, 
        {new: true, runValidators: true})
    .then((user) => 
        !user 
            ? res.status(404).json({message: "No user found with this id!"})
            : res.json(user)

    ) 
        .catch((err) => res.status(500).json(err));
});

//TODO - ROUTE THAT DELETES A FRIEND FROM A USER'S FRIENDS, DONT DELETE THE FRIEND AS A USER THOUGH!
router.delete('/:userId/friends/:friendId', (req,res)=> {
    User.findOneAndUpdate(
        {_id: req.params.userId}, 
        {$pull: {friends: req.params.friendId}}, 
        {new: true, runValidators: true})
    .then((user) => 
        !user 
            ? res.status(404).json({message: "No user found with this id!"})
            : res.json(user)

    ) 
        .catch((err) => res.status(500).json(err));

});

module.exports = router;
