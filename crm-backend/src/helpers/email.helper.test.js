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

describe("email_helper.emailProcessor", () => {
    test("0", () => {
        let result = email_helper.emailProcessor({ email: "user1+user2@mycompany.com", pin: "Here is your password rest pin", type: "request-new-password" })
        expect(result).toBe(undefined)
    })

    test("1", () => {
        let result = email_helper.emailProcessor({ email: "ponicode.com", pin: "Here is your password rest pin", type: "update-password-success" })
        expect(result).toBe(undefined)
    })

    test("2", () => {
        let result = email_helper.emailProcessor({ email: "", pin: true, type: "" })
        expect(result).toBe(undefined)
    })

    test("3", () => {
        let result = email_helper.emailProcessor({ email: "user1+user2@mycompany.com", pin: "Here is your password rest pin", type: "update-ticket" })
        expect(result).toBe(undefined)
    })

    test("4", () => {
        let result = email_helper.emailProcessor({ email: "user@host:300", pin: "Here is your password rest pin", type: "update-password-success" })
        expect(result).toBe(undefined)
    })

    test("5", () => {
        let result = email_helper.emailProcessor({ email: "email@Google.com", pin: "Here is your password rest pin", type: "request-new-password" })
        expect(result).toBe(undefined)
    })

    test("6", () => {
        let result = email_helper.emailProcessor({ email: "user@host:300", pin: "Here is your password rest pin", type: "request-new-password" })
        expect(result).toBe(undefined)
    })

    test("7", () => {
        let result = email_helper.emailProcessor({ email: "", pin: false, type: "" })
        expect(result).toBe(undefined)
    })

    test("8", () => {
        let result = email_helper.emailProcessor({ email: "", pin: "", type: "" })
        expect(result).toBe(undefined)
    })

    test("9", () => {
        let result = email_helper.emailProcessor({ email: undefined, pin: undefined, type: undefined })
        expect(result).toBe(undefined)
    })
})
