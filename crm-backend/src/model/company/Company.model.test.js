const Company_model = require("./Company.model")

describe("Company_model.insertCompany", () => {
    test("0", async () => {
        expect.assertions(1)
        try {
            await Company_model.insertCompany("Apple Inc.")
        } catch (e) {
            expect(e.message).toBe("Parameter \"obj\" to Document() must be an object, got Apple Inc.")
        }
    })

    test("1", async () => {
        expect.assertions(1)
        try {
            await Company_model.insertCompany("Microsoft Corporation")
        } catch (e) {
            expect(e.message).toBe("Parameter \"obj\" to Document() must be an object, got Microsoft Corporation")
        }
    })

    test("2", async () => {
        expect.assertions(1)
        try {
            await Company_model.insertCompany("Maggio, Hermiston and Schowalter")
        } catch (e) {
            expect(e.message).toBe("Parameter \"obj\" to Document() must be an object, got Maggio, Hermiston and Schowalter")
        }
    })

    test("3", async () => {
        expect.assertions(1)
        try {
            await Company_model.insertCompany("Facebook, Inc.")
        } catch (e) {
            expect(e.message).toBe("Parameter \"obj\" to Document() must be an object, got Facebook, Inc.")
        }
    })

    test("4", async () => {
        expect.assertions(1)
        try {
            await Company_model.insertCompany("Ponicode")
        } catch (e) {
            expect(e.message).toBe("Parameter \"obj\" to Document() must be an object, got Ponicode")
        }
    })

    test("5", async () => {
        expect.assertions(1)
        try {
            await Company_model.insertCompany("")
        } catch (e) {
            expect(e.message).toBe("Parameter \"obj\" to Document() must be an object, got ")
        }
    })

    test("6", async () => {
        expect.assertions(1)
        try {
            await Company_model.insertCompany(undefined)
        } catch (e) {
            expect(e.message).toBe("Company validation failed: status: Path `status` is required., name: Path `name` is required., updatedBy: Path `updatedBy` is required.")
        }
    })
})

describe("Company_model.updateCompany", () => {
    test("0", async () => {
        expect.assertions(1)
        try {
            await Company_model.updateCompany({ _id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9", companyObj: "Maggio, Hermiston and Schowalter" })
        } catch (e) {
            expect(e.message).toBe("Cast to Number failed for value \"03ea49f8-1d96-4cd0-b279-0684e3eec3a9\" (type string) at path \"_id\" for model \"Company\"")
        }
    })

    test("1", async () => {
        expect.assertions(1)
        try {
            await Company_model.updateCompany({ _id: "a85a8e6b-348b-4011-a1ec-1e78e9620782", companyObj: "Maggio, Hermiston and Schowalter" })
        } catch (e) {
            expect(e.message).toBe("Cast to Number failed for value \"a85a8e6b-348b-4011-a1ec-1e78e9620782\" (type string) at path \"_id\" for model \"Company\"")
        }
    })

    test("2", async () => {
        expect.assertions(1)
        try {
            await Company_model.updateCompany({ _id: "7289708e-b17a-477c-8a77-9ab575c4b4d8", companyObj: "Facebook, Inc." })
        } catch (e) {
            expect(e.message).toBe("Cast to Number failed for value \"7289708e-b17a-477c-8a77-9ab575c4b4d8\" (type string) at path \"_id\" for model \"Company\"")
        }
    })

    test("4", async () => {
        expect.assertions(1)
        try {
            await Company_model.updateCompany({ _id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9", companyObj: "Facebook, Inc." })
        } catch (e) {
            expect(e.message).toBe("Cast to Number failed for value \"03ea49f8-1d96-4cd0-b279-0684e3eec3a9\" (type string) at path \"_id\" for model \"Company\"")
        }
    })

    test("6", async () => {
        expect.assertions(1)
        try {
            await Company_model.updateCompany({ _id: "a85a8e6b-348b-4011-a1ec-1e78e9620782", companyObj: "Apple Inc." })
        } catch (e) {
            expect(e.message).toBe("Cast to Number failed for value \"a85a8e6b-348b-4011-a1ec-1e78e9620782\" (type string) at path \"_id\" for model \"Company\"")
        }
    })

    test("5", async () => {
        expect.assertions(1)
        try {
            await Company_model.updateCompany({ _id: "a85a8e6b-348b-4011-a1ec-1e78e9620782", companyObj: "Ponicode" })
        } catch (e) {
            expect(e.message).toBe("Cast to Number failed for value \"a85a8e6b-348b-4011-a1ec-1e78e9620782\" (type string) at path \"_id\" for model \"Company\"")
        }
    })
})

