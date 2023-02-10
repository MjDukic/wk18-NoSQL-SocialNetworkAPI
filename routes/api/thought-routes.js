
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

//

//TODO: ROUTE TO GET SINGLE THOUGHT BASED ON THOUGHT ID
router.get('/:thoughtId', (req,res)=> {
    Thought.findOne({_id: req.params.thoughtId}, (err, thought) => {
        if(err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(thought)
        }
    })
});

//TODO: ROUTE TO UPDATE A THOUGHT
//uhhh having problems, routing to the wrong place maybe
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

// {$addToSet: 

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
//having problems

router.post('/:thoughtId/reactions', (req,res)=> {
    Reaction.create({
        reactionId: req.params.reactionId,
        reactionBody: req.body.reactionBody,
        username: req.body.username
    }, (err, reaction) => {
        if(err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(reaction)
        }
    })

})
// addReaction(req,res) {
// Thought.findOneAndUpdate(
//   {_id: req.params.thoughtId},
 //  {$addToSet: {reactions: req.body}},).then((dbThoughtData)=> {
  //  if(!dbThoughtData){
  //      return a 404
  //  }
 // })
   
// }

//TODO: ROUTE TO DELETE A REACTION ON A THOUGHT
router.delete('/:thoughtId/reactions/:reactionId', (req,res)=> {

})

module.exports = router;
