const User_model = require("./User.model")
// @ponicode
describe("User_model.storeUserNotification", () => {
    test("0", async () => {
        let result = await User_model.storeUserNotification(undefined, undefined)
        expect(result).toBe(undefined)
    })

    test("1", async () => {
        let result = await User_model.storeUserNotification("user1+user2@mycompany.com", true)
        expect(result).toBe(undefined)
    })

    test("2", async () => {
        let result = await User_model.storeUserNotification("bed-free@tutanota.de", false)
        expect(result).toBe(undefined)
    })

    test("3", async () => {
        let result = await User_model.storeUserNotification("something.example.com", true)
        expect(result).toBe(undefined)
    })

    test("4", async () => {
        let result = await User_model.storeUserNotification("something@example.com", true)
        expect(result).toBe(undefined)
    })

    test("5", async () => {
        let result = await User_model.storeUserNotification("something.example.com", false)
        expect(result).toBe(undefined)
    })

    test("6", async () => {
        let result = await User_model.storeUserNotification("user1+user2@mycompany.com", false)
        expect(result).toBe(undefined)
    })

    test("7", async () => {
        let result = await User_model.storeUserNotification("TestUpperCase@Example.com", true)
        expect(result).toBe(undefined)
    })

    test("8", async () => {
        let result = await User_model.storeUserNotification("", false)
        expect(result).toBe(undefined)
    })

    test("9", async () => {
        let result = await User_model.storeUserNotification("user@host:300", true)
        expect(result).toBe(undefined)
    })

    test("10", async () => {
        let result = await User_model.storeUserNotification("email@Google.com", true)
        expect(result).toBe(undefined)
    })

    test("11", async () => {
        let result = await User_model.storeUserNotification("TestUpperCase@Example.com", false)
        expect(result).toBe(undefined)
    })

    test("12", async () => {
        let result = await User_model.storeUserNotification("user@host:300", false)
        expect(result).toBe(undefined)
    })

    test("13", async () => {
        let result = await User_model.storeUserNotification("ponicode.com", true)
        expect(result).toBe(undefined)
    })

    test("14", async () => {
        let result = await User_model.storeUserNotification("email@Google.com", false)
        expect(result).toBe(undefined)
    })

    test("15", async () => {
        let result = await User_model.storeUserNotification("ponicode.com", false)
        expect(result).toBe(undefined)
    })

    test("16", async () => {
        let result = await User_model.storeUserNotification("something@example.com", false)
        expect(result).toBe(undefined)
    })
})
