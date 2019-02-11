import * as React from "react";
import { materials } from "../Materials";
import { Clicker } from "./Clicker";

type allMaterials = { [K in keyof typeof materials]: number }

interface stateType {
    money: number,
    materials: allMaterials
}

export class Home extends React.Component<{}, stateType> {

    constructor(props) {
        super(props);
        this.state = {
            money: 10,
            materials: (Object.getOwnPropertyNames(materials)
                .reduce((acc, c) => ({ ...acc, [c]: 0 }), {})) as allMaterials
        }
        console.log(this.state);
    }

    increment = (toIncrement: keyof allMaterials) => () => {
        if (this.state.money < materials[toIncrement].miningCost) return;
        this.setState((prevState) => ({ 
            ...prevState,
            money: prevState.money - materials[toIncrement].miningCost,
            materials: {
                ...prevState.materials,
                [toIncrement]: prevState.materials[toIncrement] + 1
            }
        }))
    }

    sell = (toSell: keyof allMaterials) => () => {
        if (this.state.materials[toSell] == 0) return;
        this.setState((prevState) => ({
            ...prevState,
            money: prevState.money + materials[toSell].marketCost,
            materials: {
                ...prevState.materials,
                [toSell]: prevState.materials[toSell] - 1
            }
        }))
    }

    render = () => (
        <div>
            <h1>Welcome to the Intergalactic Superstore!</h1>
            <p>Money: ${this.state.money}</p>
            <p>Material A: {this.state.materials.materialA}</p>
            <p>Material B: {this.state.materials.materialB}</p>
            <Clicker
                onClick={this.increment("materialA")}
                text="Click me for material A" />
            <Clicker
                onClick={this.sell("materialA")}
                text="Sell material A" />
            <br />
            <Clicker
                onClick={this.increment("materialB")}
                text="Click me for material B" />
            <Clicker
                onClick={this.sell("materialB")}
                text="Sell material B" />
        </div>
    )
}