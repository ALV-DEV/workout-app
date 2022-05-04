class UserController {
    // @desc   Get user profile
    // @route  GET /api/users/profile
    // @access Private
    async getProfile(req, res) {
        const user = {
            name: "ALex",
            age: 23,
        }
        return res.json(user)
    }
}

export default new UserController()
