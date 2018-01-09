module.exports = {

    login : function (req, resp, next) {

        req.checkBody("email", "Enter a valid email address.").isEmail();
        req.checkBody("password", "Enter a valid password.").notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            console.log('validation error occurred', errors);
            resp.status(400).send(errors);
            return;
        } else {
            // normal processing here
            next();
        }
    },
    register : function (req, resp, next) {


        req.checkBody("email", "Enter a email address.").notEmpty();
        req.checkBody("email", "Enter a valid email address.").isEmail();
        req.checkBody("password", "Enter a valid password.").notEmpty();
        req.checkBody('gender', "Enter gender Male or Femail").notEmpty();
        req.check('gender').isIn(['Male', 'Female']).withMessage('Should be either Male or Female')
        req.checkBody("name", "Enter a Name.").notEmpty();


        var errors = req.validationErrors();
        if (errors) {
            console.log('validation error occurred', errors);
            resp.status(400).send(errors);
            return;
        } else {
            // normal processing here
            next();
        }

    }
}