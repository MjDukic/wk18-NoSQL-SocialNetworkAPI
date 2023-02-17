
const router = require('express').Router();
const { restart } = require('nodemon');
const { Thought, Reaction} = require('../../models')

//TODO: ROUTE TO GET ALL THOUGHTS
//needed to do a post before get to have something show up..why
router.get('/', (req,res)=> {
    Thought.find({}, (err, thoughts) => {
        if(err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(thoughts)
        }
    })
});

//TODO: ROUTE TO CREATE A NEW THOUGHT
//username is required for this to work
router.post('/', (req,res)=> {
    Thought.create({
        thoughtText: req.body.thoughtText,
        username: req.body.username
    }, (err, thought) => {
        if(err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(thought)
        }
    })
});

//TODO: ROUTE TO GET SINGLE THOUGHT BASED ON THOUGHT ID
router.get('/:thoughtId', (req,res)=> {
    Thought.findOne({_id: req.params.thoughtId}, (err, thought) => {
        if(err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(thought)
        }
    }).populate("reactions")
});

//TODO: ROUTE TO UPDATE A THOUGHT
router.put('/:thoughtId', (req,res) => {
    Thought.findOneAndUpdate({_id: req.params.thoughtId}, {
        thoughtText: req.body.thoughtText,
        username: req.body.username
    },  (err, thought) => {
        if(err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(thought)
        }
    })
});

//TODO: ROUTE TO DELETE A THOUGHT BASED ON THOUGHT ID
router.delete('/:thoughtId', (req,res)=> {
    Thought.findOneAndDelete({_id: req.params.thoughtId}, 
    (err, thought) => {
        if(err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(thought)
        }
    })
})

//TODO: ROUTE TO ADD REACTION TO A THOUGHT
router.post('/:thoughtId/reactions', async (req,res)=> {
    //step 1 create the reaction
    const reaction = await Reaction.create(req.body);
    console.log(reaction)
    //step 2 add the reaction to the thought
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$addToSet: {reactions: reaction._id}},
        {new: true, runValidators: true})
        .then((dbThoughtData)=> 
            !dbThoughtData
                ? res.status(404).json({message: 'No thought found with this id'})
                : res.json(dbThoughtData)
        )
        .catch((err)=> res.status(500).json(err));
});

//TODO: ROUTE TO DELETE A REACTION ON A THOUGHT
router.delete('/:thoughtId/reactions/:reactionId', (req,res)=> {
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$pull: {reactions: {reactionId: req.params.reactionId}}},
        { runValidators: true, new: true }
    )
    .then((dbThoughtData)=> 
            !dbThoughtData
             ? res.status(404).json({message: 'No thought found with this id'})
             : res.json(dbThoughtData)
    )
        .catch((err)=> res.status(500).json(err));

})

module.exports = router;
