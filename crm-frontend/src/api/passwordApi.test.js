const passwordApi = require("./passwordApi")

describe("passwordApi.reqPasswordOtp", () => {
    

    test("5", async () => {
        expect.assertions(1)
        try {
            await passwordApi.reqPasswordOtp("something.example.com")
        } catch (e) {
            expect(e.message).toBe("Network Error")
        }
    })

})
