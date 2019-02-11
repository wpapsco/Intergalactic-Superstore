export interface Material {
    miningCost: number,
    marketCost: number
}

export const materials = {
    materialA: <Material> {
        miningCost: 1,
        marketCost: 2
    },
    materialB: <Material> {
        miningCost: 1,
        marketCost: 2
    }
}