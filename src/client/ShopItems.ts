import { materials } from "./Materials"

export interface ShopItem {
    cost: number,
    shopText: string
}

export interface Buyer extends ShopItem {
    buyPerTick: number,
    buys: keyof typeof materials
    type: "buyer"
}

export interface Other extends ShopItem {
    type: "other"
}

export type allBuyers = { [K in keyof typeof buyers]: number }

const materialABuyer: Buyer = {
    buyPerTick: 0.5,
    cost: 10,
    shopText: "Automated material A buyer",
    buys: "materialA",
    type: "buyer"
}

const materialBBuyer: Buyer = {
    buyPerTick: 0.5,
    cost: 10,
    shopText: "Automated material B buyer",
    buys: "materialB",
    type: "buyer"
}

const other: Other = {
    cost: 100,
    shopText: "huh",
    type: "other"
}

export const buyers = {
    materialABuyer, materialBBuyer
}

export const shopItems = {
    ...buyers,
    other
}