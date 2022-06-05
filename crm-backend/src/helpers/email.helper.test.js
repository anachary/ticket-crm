const email_helper = require("./email.helper")

describe("email_helper.emailTestProcessor", () => {
    test("0", () => {
        let result = email_helper.emailTestProcessor("ama7516@psu.edu")
        expect(result).toBe(true)
    })

    test("1", () => {
        let result = email_helper.emailTestProcessor("akashnacharya@gmail.com")
        expect(result).toBe(true)
    })

})
