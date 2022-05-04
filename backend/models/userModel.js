import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema(
    {
        name: String,
        password: { type: String, required: true },
        email: { type: String, required: true },
        images: {
            before: String,
            after: String,
        },
    },
    {
        minimize: false,
        timestamps: true,
    }
)

userSchema.methods.mathPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 5)
})

const User = mongoose.model("User", userSchema)

export default User
