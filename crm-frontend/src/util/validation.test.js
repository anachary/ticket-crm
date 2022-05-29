const validation = require("./validation")

describe("validation.shortText", () => {
    test("0", () => {
        let result = validation.shortText({ length: 2.0 })
        expect(result).toBe(false)
    })

    test("1", () => {
        let result = validation.shortText({ length: 100 })
        expect(result).toBe(true)
    })

    test("2", () => {
        let result = validation.shortText({ length: 51.5 })
        expect(result).toBe(true)
    })

    test("3", () => {
        let result = validation.shortText({ length: 3 })
        expect(result).toBe(true)
    })

    test("4", () => {
        let result = validation.shortText({ length: 100.0 })
        expect(result).toBe(true)
    })

    test("5", () => {
        let result = validation.shortText({ length: 32 })
        expect(result).toBe(true)
    })

    test("6", () => {
        let result = validation.shortText({ length: 16 })
        expect(result).toBe(true)
    })

    test("7", () => {
        let result = validation.shortText({ length: 101.0 })
        expect(result).toBe(false)
    })

    test("8", () => {
        let result = validation.shortText({ length: 3.0 })
        expect(result).toBe(true)
    })

    test("9", () => {
        let result = validation.shortText({ length: 101 })
        expect(result).toBe(false)
    })

    test("10", () => {
        let result = validation.shortText({ length: 0 })
        expect(result).toBe(false)
    })

    test("11", () => {
        let result = validation.shortText({ length: 2 })
        expect(result).toBe(false)
    })

    test("12", () => {
        let result = validation.shortText({ length: 51 })
        expect(result).toBe(true)
    })

    test("13", () => {
        let result = validation.shortText({ length: 10 })
        expect(result).toBe(true)
    })

    test("14", () => {
        let result = validation.shortText({ length: 64 })
        expect(result).toBe(true)
    })

    test("15", () => {
        let result = validation.shortText({ length: Infinity })
        expect(result).toBe(false)
    })

    test("16", () => {
        let result = validation.shortText({ length: NaN })
        expect(result).toBe(false)
    })

    test("17", () => {
        let result = validation.shortText(undefined)
        expect(result).toBe(undefined)
    })

    test("18", () => {
        let result = validation.shortText({ length: -Infinity })
        expect(result).toBe(false)
    })
})
