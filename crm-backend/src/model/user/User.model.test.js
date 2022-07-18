const User_model = require("./User.model")

describe("User_model.storeUserNotification", () => {
    test("0", async () => {
        let result = await User_model.storeUserNotification(undefined, undefined)
        expect(result).toBe(undefined)
    })

 })