const User_model = require("./User.model")
// @ponicode
describe("User_model.getUserByEmail", () => {
       test("5", async () => {
        expect.assertions(0)
        try {
            await User_model.getUserByEmail("something@example.com")
        } catch (e) {
            expect(e.message).toBe("Cannot read properties of null (reading 'Decimal128')")
        }
    })

})
