const companyApi = require("./companyApi")

describe("companyApi.getSingleCompany", () => {
    test("0", async () => {
        expect.assertions(1)
        try {
            await companyApi.getSingleCompany("a85a8e6b-348b-4011-a1ec-1e78e9620782")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("1", async () => {
        expect.assertions(1)
        try {
            await companyApi.getSingleCompany("7289708e-b17a-477c-8a77-9ab575c4b4d8")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

})


describe("companyApi.updateCompany", () => {
    test("0", async () => {
        expect.assertions(1)
        try {
            await companyApi.updateCompany("03ea49f8-1d96-4cd0-b279-0684e3eec3a9", "Facebook, Inc.")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("1", async () => {
        expect.assertions(1)
        try {
            await companyApi.updateCompany("03ea49f8-1d96-4cd0-b279-0684e3eec3a9", "Maggio, Hermiston and Schowalter")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("2", async () => {
        expect.assertions(1)
        try {
            await companyApi.updateCompany("7289708e-b17a-477c-8a77-9ab575c4b4d8", "Microsoft Corporation")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("3", async () => {
        expect.assertions(1)
        try {
            await companyApi.updateCompany("7289708e-b17a-477c-8a77-9ab575c4b4d8", "Facebook, Inc.")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("4", async () => {
        expect.assertions(1)
        try {
            await companyApi.updateCompany("7289708e-b17a-477c-8a77-9ab575c4b4d8", "Apple Inc.")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("5", async () => {
        expect.assertions(1)
        try {
            await companyApi.updateCompany("a85a8e6b-348b-4011-a1ec-1e78e9620782", "Ponicode")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

  

    test("8", async () => {
        expect.assertions(1)
        try {
            await companyApi.updateCompany("7289708e-b17a-477c-8a77-9ab575c4b4d8", "Maggio, Hermiston and Schowalter")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("9", async () => {
        expect.assertions(1)
        try {
            await companyApi.updateCompany("a85a8e6b-348b-4011-a1ec-1e78e9620782", "Maggio, Hermiston and Schowalter")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("10", async () => {
        expect.assertions(1)
        try {
            await companyApi.updateCompany("03ea49f8-1d96-4cd0-b279-0684e3eec3a9", "Ponicode")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("11", async () => {
        expect.assertions(1)
        try {
            await companyApi.updateCompany("a85a8e6b-348b-4011-a1ec-1e78e9620782", "Apple Inc.")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

})


describe("companyApi.createNewCompany", () => {
    test("0", async () => {
        expect.assertions(0)
        try {
            await companyApi.createNewCompany("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E")
        } catch (e) {
            expect(e.message).toBe("Network Error")
        }
    })

})