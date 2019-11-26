const User = require('../models/User');

exports.create = (req, res) => {
  const {
    body: { username, email, password, create_date }
  } = req;

  const user = new User(); 

  if(username && email && password) {
    user.username = username;
    user.email = email;
    user.password = password;
    if (create_date) user.create_date = create_date;
  
    user.save(err => {
      if(err) {
        return res.json(err)
      } else {
        return res.json({
          message: 'New user created',
          data: user
        })
      }
    })
  } else {
    const err = new Error('Not all required fields are filled');
    err.status = 400;
    
    return res.json(err);
  }
}

exports.view = (req, res) => {
  const { params: { id } } = req;
  
  User.findById(id, (err, user) => {
    if(err) return res.json(err);

    return res.json({
      status: 200,
      message: 'User details',
      data: user
    })
  })
}
