
module.exports = function (app, passport, con, bcrypt) {

    app.post('/api/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));
    app.post('/api/sendvacationapplication', (req, res, next) => {
        con.query("INSERT INTO vacation (choice_no, description, emp_no, created, period,vacation_no,start_date,end_date,status) VALUES (?,?,?,?,?,?,?,?,?)",
            [req.body.choice_no, req.body.description, req.user, req.body.created, req.body.period, req.body.vacation_no, req.body.start_date, req.body.end_date, req.body.status], function (err, result, fields) {
                if (err) throw err;
            });
    });
    app.post('/api/createvacationperiod', (req, res, next) => {
        con.query("INSERT INTO vacation_period (name, start_date, end_date, open_status) VALUES (?,?,?,?)", [req.body.title, req.body.range_picker[0], req.body.range_picker[1], req.body.modifier], function (err, result, fields) {
            if (err) throw err;
        });
    });
    app.post('/api/deletevacationperiod', (req, res, next) => {
        con.query("DELETE FROM vacation_period WHERE id=?", [req.body.id], function (err, result, fields) {
            if (err) throw err;
        });
    });
    app.post('/api/editvacationperiod', (req, res, next) => {
        if (req.body.name !== undefined) {
            con.query("UPDATE vacation_period SET name = ? WHERE id=?", [req.body.name, req.body.id], function (err, result, fields) {
                if (err) throw err;
            });
        }
        if (req.body.openstatus !== undefined) {
            con.query("UPDATE vacation_period SET open_status = ? WHERE id=?", [req.body.openstatus, req.body.id], function (err, result, fields) {
                if (err) throw err;
            });
        }

    });
    app.post('/api/createuser', (req, res, next) => {
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            con.query("INSERT INTO users (emp_no, first_name, last_name, email, hire_date, location, password, status) VALUES (?,?,?,?,?,?,?,?)",
                [req.body.emp_no, req.body.first_name, req.body.last_name, req.body.email, req.body.hire_date, req.body.location, hash, req.body.status], function (err, result, fields) {
                    if (err) throw err;
                });
        });
    });
    app.post('/api/editstaffmembers', (req, res, next) => {
        console.log(req.body.target);
        con.query("UPDATE users AS u SET u.email = ?, u.first_name = ?, u.last_name = ?, u.location = ? WHERE emp_no = ?",
            [req.body.target.email, req.body.target.first_name, req.body.target.last_name, req.body.target.location, req.body.target.emp_no], function (err, result, fields) {
                if (err) throw err;
            });

    });
    app.get('/api/getstaffmembers', (req, res, next) => {
        con.query("SELECT u.email, u.hire_date, u.first_name, u.last_name, u.location, u.emp_no, u.status FROM users AS u", function (err, result, fields) {
            if (err) throw err;
            res.send(result);

        });
    });
    app.get('/api/getapplications', (req, res, next) => {
        con.query("SELECT * FROM vacation", function (err, result, fields) {
            if (err) throw err;
            res.send(result);

        });
    });
    app.get('/api/getvacations', (req, res, next) => {
        con.query("SELECT status FROM users WHERE emp_no = ?", [req.user], function (err, result, fields) {
            if (err) throw err;
            if (result[0].status >= 1) {
                con.query("SELECT vacation_period.name, v.choice_no, v.description, v.vacation_no, v.start_date, v.end_date, v.status FROM vacation AS v INNER JOIN vacation_period ON v.period=vacation_period.ID WHERE v.emp_no = ?;", [req.user], function (err, result, fields) {
                    if (err) throw err;
                    res.send(result);

                });
            }
        });
    });
    app.get('/api/getvacationperiods', (req, res, next) => {
        con.query("SELECT status FROM users WHERE emp_no = ?", [req.user], function (err, result, fields) {
            if (err) throw err;
            if (result[0].status === 1) {
                // con.query("SELECT v.id, v.name, v.start_date, v.end_date, vacation.status FROM vacation_period AS v LEFT JOIN vacation ON v.id = vacation.period WHERE v.open_status = 1", function (err, result, fields) {
                //     if (err) throw err;
                //     res.send(result);
                // });
                con.query("SELECT v.id, v.name, v.start_date, v.end_date FROM vacation_period AS v WHERE v.open_status = 1", function (err, result, fields) {
                    if (err) throw err;
                    res.send(result);
                    // var values = [];

                    // for (i = 0; i < result.length; i++) {
                    //     console.log("v" + values[i].id);
                    //     con.query("SELECT * FROM vacation WHERE period = ?", [result[i].id], function (err, result2, fields) {
                    //         if (err) throw err;
                    //         console.log("a" + result2.length);
                    //         console.log("b" + result[i]);
                    //         if (result2.length === 0) {
                    //             values[i] = {
                    //                 id: result[i].id,
                    //                 name: result[i].name,
                    //                 start_date: result[i].start_date,
                    //                 end_date: result[i].end_date,
                    //                 status: 0
                    //             }
                    //         } else {
                    //             values[i] = {
                    //                 id: result[i].id,
                    //                 name: result[i].name,
                    //                 start_date: result[i].start_date,
                    //                 end_date: result[i].end_date,
                    //                 status: 1
                    //             }
                    //         }
                    //         console.log(values);
                    //         // res.send(values);
                    //     });
                    // }

                });
            }
            if (result[0].status === 2) {
                con.query("SELECT * FROM vacation_period", function (err, result, fields) {
                    if (err) throw err;
                    res.send(result);
                });
            }
        });
    });
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
                        res.redirect('/');

                    });
                });
            });
        });
        // res.redirect('back');

    });


    app.get('/api/getstatus', (req, res) => {
        if (req.user == undefined) {

            res.send({ status: 0 });
        }
        else {
            con.query("SELECT status, first_name, last_name FROM users WHERE emp_no = ?", [req.user], function (err, result, fields) {
                if (err) throw err;
                res.send(result[0]);
            });
        }

    });
    app.get('/api/myvacations', (req, res) => {
        con.query("SELECT * FROM vacation WHERE emp_no = ?", [req.user], function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });
    app.get('/api/applications', (req, res) => {
        con.query("SELECT * FROM vacation", function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });



}