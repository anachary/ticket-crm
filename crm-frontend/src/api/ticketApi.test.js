const ticketApi = require("./ticketApi")

describe("ticketApi.getAllTickets", () => {
    test("0", async () => {
        expect.assertions(1)
        try {
            await ticketApi.getAllTickets()
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })
})


describe("ticketApi.getSingleTicket", () => {
    test("0", async () => {
        expect.assertions(1)
        try {
            await ticketApi.getSingleTicket("7289708e-b17a-477c-8a77-9ab575c4b4d8")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("1", async () => {
        expect.assertions(1)
        try {
            await ticketApi.getSingleTicket("03ea49f8-1d96-4cd0-b279-0684e3eec3a9")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("2", async () => {
        expect.assertions(1)
        try {
            await ticketApi.getSingleTicket("")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("3", async () => {
        expect.assertions(1)
        try {
            await ticketApi.getSingleTicket(undefined)
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })
})


describe("ticketApi.updateReplyTicket", () => {
    test("0", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("7289708e-b17a-477c-8a77-9ab575c4b4d8", "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("1", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("7289708e-b17a-477c-8a77-9ab575c4b4d8", "https://api.telegram.org/bot")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("2", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("a85a8e6b-348b-4011-a1ec-1e78e9620782", "https://croplands.org/app/a/reset?token=")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("3", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("7289708e-b17a-477c-8a77-9ab575c4b4d8", "https://api.telegram.org/")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("4", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("03ea49f8-1d96-4cd0-b279-0684e3eec3a9", "www.google.com")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("5", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("a85a8e6b-348b-4011-a1ec-1e78e9620782", "https://api.telegram.org/")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("6", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("a85a8e6b-348b-4011-a1ec-1e78e9620782", "http://www.croplands.org/account/confirm?t=")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("7", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("7289708e-b17a-477c-8a77-9ab575c4b4d8", "http://www.example.com/route/123?foo=bar")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("8", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("03ea49f8-1d96-4cd0-b279-0684e3eec3a9", "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("9", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("03ea49f8-1d96-4cd0-b279-0684e3eec3a9", "https://croplands.org/app/a/reset?token=")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("10", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("7289708e-b17a-477c-8a77-9ab575c4b4d8", "www.google.com")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("11", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("a85a8e6b-348b-4011-a1ec-1e78e9620782", "https://api.telegram.org/bot")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("12", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("03ea49f8-1d96-4cd0-b279-0684e3eec3a9", "https://croplands.org/app/a/confirm?t=")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("13", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("03ea49f8-1d96-4cd0-b279-0684e3eec3a9", "http://www.croplands.org/account/confirm?t=")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("14", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("a85a8e6b-348b-4011-a1ec-1e78e9620782", "https://twitter.com/path?abc")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("15", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("a85a8e6b-348b-4011-a1ec-1e78e9620782", "http://www.example.com/route/123?foo=bar")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("16", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("03ea49f8-1d96-4cd0-b279-0684e3eec3a9", "ponicode.com")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("17", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("7289708e-b17a-477c-8a77-9ab575c4b4d8", "ponicode.com")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("18", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("03ea49f8-1d96-4cd0-b279-0684e3eec3a9", "https://")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("19", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("03ea49f8-1d96-4cd0-b279-0684e3eec3a9", "https://api.telegram.org/bot")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("20", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("a85a8e6b-348b-4011-a1ec-1e78e9620782", "ponicode.com")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("21", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("a85a8e6b-348b-4011-a1ec-1e78e9620782", "www.google.com")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("22", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("7289708e-b17a-477c-8a77-9ab575c4b4d8", "https://accounts.google.com/o/oauth2/revoke?token=%s")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("23", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("7289708e-b17a-477c-8a77-9ab575c4b4d8", "http://base.com")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("24", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("7289708e-b17a-477c-8a77-9ab575c4b4d8", "http://www.croplands.org/account/confirm?t=")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("25", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("7289708e-b17a-477c-8a77-9ab575c4b4d8", "https://croplands.org/app/a/confirm?t=")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("26", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("03ea49f8-1d96-4cd0-b279-0684e3eec3a9", "Www.GooGle.com")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("27", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("a85a8e6b-348b-4011-a1ec-1e78e9620782", "https://croplands.org/app/a/confirm?t=")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("28", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("7289708e-b17a-477c-8a77-9ab575c4b4d8", "Www.GooGle.com")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("29", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("a85a8e6b-348b-4011-a1ec-1e78e9620782", "Www.GooGle.com")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("30", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("7289708e-b17a-477c-8a77-9ab575c4b4d8", "https://croplands.org/app/a/reset?token=")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("31", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("03ea49f8-1d96-4cd0-b279-0684e3eec3a9", "https://api.telegram.org/")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("32", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("7289708e-b17a-477c-8a77-9ab575c4b4d8", "https://twitter.com/path?abc")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("33", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("a85a8e6b-348b-4011-a1ec-1e78e9620782", "http://base.com")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("34", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("a85a8e6b-348b-4011-a1ec-1e78e9620782", "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("35", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("03ea49f8-1d96-4cd0-b279-0684e3eec3a9", "https://accounts.google.com/o/oauth2/revoke?token=%s")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("36", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("7289708e-b17a-477c-8a77-9ab575c4b4d8", "https://")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("37", async () => {
        expect.assertions(1)
        try {
            await ticketApi.updateReplyTicket("", "")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 404")
        }
    })

    test("38", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket("03ea49f8-1d96-4cd0-b279-0684e3eec3a9", "http://base.com")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("39", async () => {
        expect.assertions(0)
        try {
            await ticketApi.updateReplyTicket(undefined, undefined)
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })
})


describe("ticketApi.createNewTicket", () => {
    test("0", async () => {
        expect.assertions(0)
        try {
            await ticketApi.createNewTicket("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("1", async () => {
        expect.assertions(0)
        try {
            await ticketApi.createNewTicket("")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("2", async () => {
        expect.assertions(0)
        try {
            await ticketApi.createNewTicket(undefined)
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })
})


describe("ticketApi.updateTicket", () => {
    test("0", async () => {
        expect.assertions(1)
        try {
            await ticketApi.updateTicket("03ea49f8-1d96-4cd0-b279-0684e3eec3a9", "http://www.croplands.org/account/confirm?t=")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("1", async () => {
        expect.assertions(1)
        try {
            await ticketApi.updateTicket("a85a8e6b-348b-4011-a1ec-1e78e9620782", "http://www.croplands.org/account/confirm?t=")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("2", async () => {
        expect.assertions(1)
        try {
            await ticketApi.updateTicket("7289708e-b17a-477c-8a77-9ab575c4b4d8", "http://www.example.com/route/123?foo=bar")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("3", async () => {
        expect.assertions(1)
        try {
            await ticketApi.updateTicket("7289708e-b17a-477c-8a77-9ab575c4b4d8", "https://api.telegram.org/bot")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("4", async () => {
        expect.assertions(1)
        try {
            await ticketApi.updateTicket("03ea49f8-1d96-4cd0-b279-0684e3eec3a9", "ponicode.com")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("5", async () => {
        expect.assertions(1)
        try {
            await ticketApi.updateTicket("03ea49f8-1d96-4cd0-b279-0684e3eec3a9", "https://api.telegram.org/bot")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("6", async () => {
        expect.assertions(1)
        try {
            await ticketApi.updateTicket("a85a8e6b-348b-4011-a1ec-1e78e9620782", "http://www.example.com/route/123?foo=bar")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("7", async () => {
        expect.assertions(1)
        try {
            await ticketApi.updateTicket("7289708e-b17a-477c-8a77-9ab575c4b4d8", "ponicode.com")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("8", async () => {
        expect.assertions(1)
        try {
            await ticketApi.updateTicket("a85a8e6b-348b-4011-a1ec-1e78e9620782", "https://twitter.com/path?abc")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("9", async () => {
        expect.assertions(1)
        try {
            await ticketApi.updateTicket("7289708e-b17a-477c-8a77-9ab575c4b4d8", "www.google.com")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("10", async () => {
        expect.assertions(1)
        try {
            await ticketApi.updateTicket("a85a8e6b-348b-4011-a1ec-1e78e9620782", "https://croplands.org/app/a/confirm?t=")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("11", async () => {
        expect.assertions(1)
        try {
            await ticketApi.updateTicket("7289708e-b17a-477c-8a77-9ab575c4b4d8", "https://")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("12", async () => {
        expect.assertions(1)
        try {
            await ticketApi.updateTicket("03ea49f8-1d96-4cd0-b279-0684e3eec3a9", "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("13", async () => {
        expect.assertions(1)
        try {
            await ticketApi.updateTicket("a85a8e6b-348b-4011-a1ec-1e78e9620782", "https://api.telegram.org/bot")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("14", async () => {
        expect.assertions(1)
        try {
            await ticketApi.updateTicket("a85a8e6b-348b-4011-a1ec-1e78e9620782", "https://accounts.google.com/o/oauth2/revoke?token=%s")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("15", async () => {
        expect.assertions(1)
        try {
            await ticketApi.updateTicket("a85a8e6b-348b-4011-a1ec-1e78e9620782", "www.google.com")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })

    test("16", async () => {
        expect.assertions(1)
        try {
            await ticketApi.updateTicket("", "")
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 404")
        }
    })

    test("17", async () => {
        expect.assertions(1)
        try {
            await ticketApi.updateTicket(undefined, undefined)
        } catch (e) {
            expect(e.message).toBe("Request failed with status code 403")
        }
    })
})


describe("ticketApi.followTicket", () => {
  test("0", async () => {
      expect.assertions(1)
      try {
          await ticketApi.followTicket("a85a8e6b-348b-4011-a1ec-1e78e9620782", "bc23a9d531064583ace8f67dad60f6bb")
      } catch (e) {
          expect(e.message).toBe("Request failed with status code 403")
      }
  })

  test("1", async () => {
      expect.assertions(1)
      try {
          await ticketApi.followTicket("03ea49f8-1d96-4cd0-b279-0684e3eec3a9", "12345")
      } catch (e) {
          expect(e.message).toBe("Request failed with status code 403")
      }
  })

  test("2", async () => {
      expect.assertions(1)
      try {
          await ticketApi.followTicket("7289708e-b17a-477c-8a77-9ab575c4b4d8", "da7588892")
      } catch (e) {
          expect(e.message).toBe("Request failed with status code 403")
      }
  })

  test("3", async () => {
      expect.assertions(1)
      try {
          await ticketApi.followTicket("a85a8e6b-348b-4011-a1ec-1e78e9620782", "9876")
      } catch (e) {
          expect(e.message).toBe("Request failed with status code 403")}
  })

  test("4", async () => {
      expect.assertions(1)
      try {
          await ticketApi.followTicket("7289708e-b17a-477c-8a77-9ab575c4b4d8", "12345")
      } catch (e) {
          expect(e.message).toBe("Request failed with status code 403")
      }
  })

  test("5", async () => {
      expect.assertions(1)
      try {
          await ticketApi.followTicket("03ea49f8-1d96-4cd0-b279-0684e3eec3a9", "bc23a9d531064583ace8f67dad60f6bb")
      } catch (e) {
          expect(e.message).toBe("Request failed with status code 403")
      }
  })
})
