export const getRegister = (req, res) => {
    res.render('../views/auth/register', { title: 'Register' });
}
export const getLogin = (req, res) => {
    res.render('../views/auth/login', { title: 'Login' });
}
