const Ticket_model = require("./Ticket.model")


describe("Ticket_model.getTicketById", () => {
    test("0", async () => {
        expect.assertions(1)
        try {
            await Ticket_model.getTicketById("03ea49f8-1d96-4cd0-b279-0684e3eec3a9")
        } catch (e) {
            expect(e.message).toBe("Cast to Number failed for value \"03ea49f8-1d96-4cd0-b279-0684e3eec3a9\" (type string) at path \"_id\" for model \"Ticket\"")
        }
    })

    test("1", async () => {
        expect.assertions(1)
        try {
            await Ticket_model.getTicketById("a85a8e6b-348b-4011-a1ec-1e78e9620782")
        } catch (e) {
            expect(e.message).toBe("Cast to Number failed for value \"a85a8e6b-348b-4011-a1ec-1e78e9620782\" (type string) at path \"_id\" for model \"Ticket\"")
        }
    })

    test("2", async () => {
        expect.assertions(1)
        try {
            await Ticket_model.getTicketById("7289708e-b17a-477c-8a77-9ab575c4b4d8")
        } catch (e) {
            expect(e.message).toBe("Cast to Number failed for value \"7289708e-b17a-477c-8a77-9ab575c4b4d8\" (type string) at path \"_id\" for model \"Ticket\"")
        }
    })
})


describe("Ticket_model.insertTicket", () => {
    test("0", () => {
        Ticket_model.insertTicket("www.google.com")
    })

    test("1", () => {
        Ticket_model.insertTicket("https://croplands.org/app/a/confirm?t=")
    })

    test("2", async () => {
        expect.assertions(1)
        try {
            await Ticket_model.insertTicket("https://twitter.com/path?abc")
        } catch (e) {
            expect(e.message).toBe("Parameter \"obj\" to Document() must be an object, got https://twitter.com/path?abc")
        }
    })
})
