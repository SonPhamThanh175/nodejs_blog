const Course = require("../models/Course");

const {
  muntipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");
class CourseController {
  // [GET] /courses/slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .lean()
      .then((course) => {
        res.render("courses/show", { course });
      })
      .catch(next);
  }
  // [GET] /courses/create
  create(req, res, next) {
    res.render("courses/create");
  }
  // [POST] /courses/store
  async store(req, res, next) {
    const formData = req.body;
    formData.image = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`;
    const course = new Course(formData);
    await course
      .save()
      .then(() => res.redirect("/"))
      .catch((error) => {});
  }
  // [GET] /courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) => res.render('courses/edit', {
        course: mongooseToObject(course),
      }))
      .catch(next);
  }
  // [PUT] /courses/:id
  async update(req, res, next) {
    await Course.updateOne({_id : req.params.id } , req.body )
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next);
  }
}

module.exports = new CourseController();