import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { Multisent } from "../generated/schema"
import { Multisent as MultisentEvent } from "../generated/HMTMULTISENDER/HMTMULTISENDER"
import { handleMultisent } from "../src/hmtmultisender"
import { createMultisentEvent } from "./hmtmultisender-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let token = Address.fromString("0x0000000000000000000000000000000000000001")
    let total = BigInt.fromI32(234)
    let newMultisentEvent = createMultisentEvent(token, total)
    handleMultisent(newMultisentEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Multisent created and stored", () => {
    assert.entityCount("Multisent", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Multisent",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "token",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Multisent",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "total",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
