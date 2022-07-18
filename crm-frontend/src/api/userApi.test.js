const userApi = require("./userApi")

describe("userApi.userLogin", () => {
    test("0", async () => {
        let result = await userApi.userLogin("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E")
        expect(result).toBe(undefined)
    })

    test("1", async () => {
        let result = await userApi.userLogin("")
        expect(result).toBe(undefined)
    })

    test("2", async () => {
        let result = await userApi.userLogin(undefined)
        expect(result).toBe(undefined)
    })
})


describe("userApi.fetchUser", () => {
    test("0", async () => {
        try {
            await userApi.fetchUser()
        } catch (e) {
            expect(e.message).toBe("Network Error")
        }
    })
})

