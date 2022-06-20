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

describe("Ticket_model.getTickets", () => {
    test("0", () => {
        let result = Ticket_model.getTickets("c466a48309794261b64a4f02cfcc3d64")
        expect(result).toMatchSnapshot()
    })

    test("1", () => {
        let result = Ticket_model.getTickets("bc23a9d531064583ace8f67dad60f6bb")
        expect(result).toMatchSnapshot()
    })

    test("2", () => {
        let result = Ticket_model.getTickets("9876")
        expect(result).toMatchSnapshot()
    })

    test("3", () => {
        let result = Ticket_model.getTickets("da7588892")
        expect(result).toMatchSnapshot()
    })

    test("4", () => {
        let result = Ticket_model.getTickets("")
        expect(result).toMatchSnapshot()
    })
})


describe("Ticket_model.getTicketUsers", () => {
    test("0", async () => {
        await Ticket_model.getTicketUsers("7289708e-b17a-477c-8a77-9ab575c4b4d8", "https://")
    })

    test("1", async () => {
        await Ticket_model.getTicketUsers("7289708e-b17a-477c-8a77-9ab575c4b4d8", "http://www.croplands.org/account/confirm?t=")
    })

    test("2", async () => {
        await Ticket_model.getTicketUsers("7289708e-b17a-477c-8a77-9ab575c4b4d8", "https://croplands.org/app/a/reset?token=")
    })

    test("3", async () => {
        await Ticket_model.getTicketUsers("7289708e-b17a-477c-8a77-9ab575c4b4d8", "https://api.telegram.org/bot")
    })

    test("4", async () => {
        await Ticket_model.getTicketUsers("03ea49f8-1d96-4cd0-b279-0684e3eec3a9", "http://www.example.com/route/123?foo=bar")
    })

    test("5", async () => {
        await Ticket_model.getTicketUsers("", "")
    })
})

describe("Ticket_model.updateClientReply", () => {
    test("0", () => {
        let result = Ticket_model.updateClientReply({ _id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9", message: "Counterparty sent error: %s", sender: false })
        expect(result).toMatchSnapshot()
    })

    test("1", () => {
        let result = Ticket_model.updateClientReply({ _id: "a85a8e6b-348b-4011-a1ec-1e78e9620782", message: "Unable to allocate address", sender: true })
        expect(result).toMatchSnapshot()
    })

    test("2", () => {
        let result = Ticket_model.updateClientReply({ _id: "7289708e-b17a-477c-8a77-9ab575c4b4d8", message: "TypeError exception should be raised", sender: true })
        expect(result).toMatchSnapshot()
    })

    test("3", () => {
        let result = Ticket_model.updateClientReply({ _id: "a85a8e6b-348b-4011-a1ec-1e78e9620782", message: "The app does not exist", sender: true })
        expect(result).toMatchSnapshot()
    })

    test("4", () => {
        let result = Ticket_model.updateClientReply({ _id: "a85a8e6b-348b-4011-a1ec-1e78e9620782", message: "No error", sender: true })
        expect(result).toMatchSnapshot()
    })

    test("5", () => {
        let result = Ticket_model.updateClientReply({ _id: "", message: "", sender: false })
        expect(result).toMatchSnapshot()
    })
})

describe("Ticket_model.updateTicket", () => {
    test("0", () => {
        let result = Ticket_model.updateTicket({ _id: "7289708e-b17a-477c-8a77-9ab575c4b4d8", ticketObj: "https://api.telegram.org/" })
        expect(result).toMatchSnapshot()
    })

    test("1", () => {
        let result = Ticket_model.updateTicket({ _id: "a85a8e6b-348b-4011-a1ec-1e78e9620782", ticketObj: "https://" })
        expect(result).toMatchSnapshot()
    })

    test("2", () => {
        let result = Ticket_model.updateTicket({ _id: "7289708e-b17a-477c-8a77-9ab575c4b4d8", ticketObj: "https://accounts.google.com/o/oauth2/revoke?token=%s" })
        expect(result).toMatchSnapshot()
    })

    test("3", () => {
        let result = Ticket_model.updateTicket({ _id: "7289708e-b17a-477c-8a77-9ab575c4b4d8", ticketObj: "Www.GooGle.com" })
        expect(result).toMatchSnapshot()
    })

    test("4", () => {
        let result = Ticket_model.updateTicket({ _id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9", ticketObj: "https://api.telegram.org/bot" })
        expect(result).toMatchSnapshot()
    })

    test("5", () => {
        let result = Ticket_model.updateTicket({ _id: "", ticketObj: "" })
        expect(result).toMatchSnapshot()
    })
})
