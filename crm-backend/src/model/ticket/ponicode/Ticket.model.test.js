const Ticket_model = require("../Ticket.model")
// @ponicode
describe("Ticket_model.followTicket", () => {
    test("0", async () => {
        await Ticket_model.followTicket("7289708e-b17a-477c-8a77-9ab575c4b4d8", "Jean-Philippe")
    })

    test("1", async () => {
        await Ticket_model.followTicket("7289708e-b17a-477c-8a77-9ab575c4b4d8", "Anas")
    })

    test("2", async () => {
        await Ticket_model.followTicket("a85a8e6b-348b-4011-a1ec-1e78e9620782", "Jean-Philippe")
    })

    test("3", async () => {
        await Ticket_model.followTicket("03ea49f8-1d96-4cd0-b279-0684e3eec3a9", "Michael")
    })

    test("4", async () => {
        await Ticket_model.followTicket("a85a8e6b-348b-4011-a1ec-1e78e9620782", "Pierre Edouard")
    })

    test("5", async () => {
        await Ticket_model.followTicket("", "")
    })
})
