
const saltRounds = 10;

module.exports = function (app, passport, con, bcrypt) {

    app.post('/api/login', passport.authenticate('local', {
        successRedirect: '/myvacations',
        failureRedirect: '/login'
    }));
    app.get('/api/logout', (req, res) => {
        req.logout();
        req.session.destroy(() => {
            res.clearCookie('connect.sid')
        })
        

    });
    app.post('/api/signup', (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;
        bcrypt.hash(password, saltRounds, function (err, hash) {
            // Store hash in your password DB.

            con.query("INSERT INTO users (username, password) VALUES (?,?)", [username, hash], function (err, result, fields) {
                if (err) throw err;
                con.query("SELECT LAST_INSERT_ID() as user_id", function (err, result, fields) {
                    if (err) throw err;
                    const user_id = result[0];
                    req.login(user_id, function (err) {
                        res.redirect('/myvacations');

                    });
                });
            });
        });
        // res.redirect('back');

    });


    app.get('/api/authenticated', (req, res) => {
        res.send(req.isAuthenticated());
    });
    app.get('/api/applications', (req, res) => {
        con.query("SELECT * FROM applications", function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });
 
    

}