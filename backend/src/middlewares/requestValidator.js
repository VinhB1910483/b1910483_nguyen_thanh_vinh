import { body, validationResult } from 'express-validator'


export const validateForm = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }
    next();
}

export const validateRegisterForm = [
    body('user.username', 'Không được bỏ trống').not().isEmpty(),
    body('user.username', 'Phải là chữ và số').isAlphanumeric(),
    body('user.username', 'Phải hơn 6 ký tự').isLength({ min: 6 }),
    body('user.email', 'Không được bỏ trống').not().isEmpty(),
    body('user.email', 'Email không hợp lệ').isEmail(),
    body('user.password', 'Phải hơn 6 ký tự').isLength({ min: 6 })
];

export const validateLoginForm = [
    body('user.username', 'Không được bỏ trống').not().isEmpty(),
    body('user.password', 'Phải hơn 6 ký tự').isLength({ min: 6 })
];


const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }
    return next()
}
