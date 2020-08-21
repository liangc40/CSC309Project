const router = require("express").Router();
let Tutor = require("../models/tutor");

/*
  @route     get api/tutors
  @desc      get all tutors
  @access    Public
*/
router.route("/").get((req, res)=>{
    Post.find()
        .then(tutors=>res.json(tutors))
        .catch(err=>res.status(400).json("Error: " + err));
});


/*
  @route     post api/tutors/add
  @desc      add a tutor to db
  @access    Public
*/
router.route("/add").post((req, res)=>{
    const tutor = new Tutor({
        name: req.body.name;
        bio: req.body.bio;
        major: req.body.major;
        totalTutoringHours: req.body.totalTutoringHours;
        pastTutoringCourses: req.body.pastTutoringCourses
    })

    tutor.save().then(
        result => {
            res.send({result});
        },
        error => {
            res.status(400).send(error);
        }
    );
})

/*
  @route     get api/tutors/:id
  @desc      get a tutor by id 
  @access    Public
*/router.route("/:id").get((req, res)=>{
    Tutor.findById(req.params.id)
        .then(tutor=>res.json(tutor))
        .catch(err=>res.status(400).json("Error: " + err));
});

/*
  @route     delete api/tutors/:id
  @desc      delete a tutor by id
  @access    Public
*/router.route("/:id").delete((req, res)=>{
    Tutor.findByIdAndDelete(req.params.id)
        .then(()=>res.json("tutor is deleted"))
        .catch(err=>res.status(400).json("Error: " + err));
});

/*
  @route     post api/tutors/update/:id
  @desc      update a tutor by id
  @access    Public
*/
router.route("/update/:id").post((req, res)=>{
    Post.findById(req.params.id)
        .then(post => {
            if(req.body.totalTutoringHours){
                post.totalTutoringHours = req.body.totalTutoringHours;
            }
            if(req.body.bio){
                post.bio = req.body.bio;
            }
            if(req.body.major){
                post.bio = req.body.major;
            }
            if(req.body.pastTutoringCourses){
                post.bio = req.body.pastTutoringCourses;
            }

            post.save()
                .then(()=>res.json("tutor is updated"))
                .catch(err=>res.status(400).json("Error: " + err));
        })
        .catch(err=>res.status(400).json("Error: " + err));
});


/*
  @route     get api/tutors/:id
  @desc      get a tutor by id 
  @access    Public
*/router.route("/:id").get((req, res)=>{
    Tutor.findById(req.params.id)
        .then(tutor=>res.json(tutor))
        .catch(err=>res.status(400).json("Error: " + err));
});
