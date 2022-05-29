const passwordApi = require("./passwordApi")

describe("passwordApi.reqPasswordOtp", () => {
    test("0", async () => {
        expect.assertions(1)
        try {
            await passwordApi.reqPasswordOtp("user1+user2@mycompany.com")
        } catch (e) {
            expect(e.message).toBe("Network Error")
        }
    })

    test("5", async () => {
        expect.assertions(1)
        try {
            await passwordApi.reqPasswordOtp("something.example.com")
        } catch (e) {
            expect(e.message).toBe("Network Error")
        }
    })

    test("6", async () => {
        expect.assertions(1)
        try {
            await passwordApi.reqPasswordOtp("something@example.com")
        } catch (e) {
            expect(e.message).toBe("Network Error")
        }
    })
})
