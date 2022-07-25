const ticketApi = require("../ticketApi")
// @ponicode
describe("ticketApi.fetchReportTickets", () => {
    test("0", async () => {
        await ticketApi.fetchReportTickets("https://croplands.org/app/a/confirm?t=")
    })

    test("1", async () => {
        await ticketApi.fetchReportTickets("https://")
    })

    test("2", async () => {
        await ticketApi.fetchReportTickets("https://api.telegram.org/bot")
    })

    test("3", async () => {
        await ticketApi.fetchReportTickets("ponicode.com")
    })

    test("4", async () => {
        await ticketApi.fetchReportTickets("https://accounts.google.com/o/oauth2/revoke?token=%s")
    })

    test("5", async () => {
        await ticketApi.fetchReportTickets("")
    })
})
