const RestPin_model = require("./RestPin.model")

describe("RestPin_model.getPinByEmailPin", () => {
    test("0", () => {
        let callFunction = () => {
            RestPin_model.getPinByEmailPin("TestUpperCase@Example.com", false)
        }
        expect(callFunction).toBe(callFunction)
    })

    test("1", () => {
        let callFunction = () => {
            RestPin_model.getPinByEmailPin("something.example.com", false)
        }
         expect(callFunction).toBe(callFunction)
    })

    test("2", () => {
        let callFunction = () => {
            RestPin_model.getPinByEmailPin("user1+user2@mycompany.com", false)
        }
         expect(callFunction).toBe(callFunction)
    })

    test("3", () => {
        let callFunction = () => {
            RestPin_model.getPinByEmailPin("user@host:300", false)
        }
         expect(callFunction).toBe(callFunction)
    })

    test("4", () => {
        let callFunction = () => {
            RestPin_model.getPinByEmailPin("ponicode.com", true)
        }
    
         expect(callFunction).toBe(callFunction)
    })

    test("5", () => {
        let callFunction = () => {
            RestPin_model.getPinByEmailPin("something.example.com", true)
        }
    
         expect(callFunction).toBe(callFunction)
    })

    test("6", () => {
        let callFunction = () => {
            RestPin_model.getPinByEmailPin("bed-free@tutanota.de", true)
        }
    
         expect(callFunction).toBe(callFunction)
    })

    test("7", () => {
        let callFunction = () => {
            RestPin_model.getPinByEmailPin("email@Google.com", false)
        }
    
         expect(callFunction).toBe(callFunction)
    })

    test("8", () => {
        let callFunction = () => {
            RestPin_model.getPinByEmailPin("", false)
        }
         expect(callFunction).toBe(callFunction)
    })

    test("9", () => {
        let callFunction = () => {
            RestPin_model.getPinByEmailPin("", true)
        }
    
         expect(callFunction).toBe(callFunction)
    })

    test("10", () => {
        let callFunction = () => {
            RestPin_model.getPinByEmailPin(undefined, undefined)
        }
    
         expect(callFunction).toBe(callFunction)
    })

    test("11", () => {
        let callFunction = () => {
            RestPin_model.getPinByEmailPin("something@example.com", false)
        }
        expect(callFunction).toBe(callFunction)
    })

    test("12", () => {
        let callFunction = () => {
            RestPin_model.getPinByEmailPin("TestUpperCase@Example.com", true)
        }
    
         expect(callFunction).toBe(callFunction)
    })

    test("13", () => {
        let callFunction = () => {
            RestPin_model.getPinByEmailPin("user@host:300", true)
        }
         expect(callFunction).toBe(callFunction)
    })

    test("14", () => {
        let callFunction = () => {
            RestPin_model.getPinByEmailPin("ponicode.com", false)
        }
    
         expect(callFunction).toBe(callFunction)
    })

    test("15", () => {
        let callFunction = () => {
            RestPin_model.getPinByEmailPin("something@example.com", true)
        }
    
         expect(callFunction).toBe(callFunction)
    })

    test("16", () => {
        let callFunction = () => {
            RestPin_model.getPinByEmailPin("bed-free@tutanota.de", false)
        }
    
         expect(callFunction).toBe(callFunction)
    })

    test("17", () => {
        let callFunction = () => {
            RestPin_model.getPinByEmailPin("email@Google.com", true)
        }
    
         expect(callFunction).toBe(callFunction)
    })

    test("18", () => {
        let callFunction = () => {
            RestPin_model.getPinByEmailPin("user1+user2@mycompany.com", true)
        }
    
         expect(callFunction).toBe(callFunction)
    })
})

