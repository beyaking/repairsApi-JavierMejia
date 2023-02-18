const { Router } = require('express');
const { check } = require('express-validator');
const {
  findAllUsers,
  findOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controllers');
const { finderId } = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('/', findAllUsers);

router.get('/:id', finderId, findOneUser);

router.post(
  '/',
  [
    check('name', 'The user name must mandatory').not().isEmpty(),
    check('email', 'The user name must mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    check('password', 'The password must be a correct format').not().isEmpty(),
    validateFields,
  ],
  createUser
);

router.patch(
  '/:id',
  [
    check('name', 'The user name must mandatory').not().isEmpty(),
    check('email', 'The user name must mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),

    validateFields,
  ],
  finderId,
  updateUser
);

router.delete('/:id', finderId, deleteUser);

module.exports = {
  userRouter: router,
};
