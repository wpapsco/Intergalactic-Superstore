export interface Material {
    miningCost: number,
    marketCost: number,
    name: string
}

export type allMaterials = { [K in keyof typeof materials]: number }

const materialA: Material = {
    miningCost: 1,
    marketCost: 2,
    name: "Material A"
}

const materialB: Material = {
    miningCost: 1,
    marketCost: 2,
    name: "Material B"
}

export const materials = {
    materialA, materialB
}