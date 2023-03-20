import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Multisent,
  OwnershipTransferred
} from "../generated/HMTMULTISENDER/HMTMULTISENDER"

export function createMultisentEvent(token: Address, total: BigInt): Multisent {
  let multisentEvent = changetype<Multisent>(newMockEvent())

  multisentEvent.parameters = new Array()

  multisentEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  multisentEvent.parameters.push(
    new ethereum.EventParam("total", ethereum.Value.fromUnsignedBigInt(total))
  )

  return multisentEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
