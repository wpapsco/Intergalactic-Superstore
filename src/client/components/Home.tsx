import * as React from "react"
import { materials } from "../Materials"
import { Clicker } from "./Clicker"
import { Shop } from "./Shop"
import { Sell } from "./Sell"
import { ShopItem, buyers, shopItems } from "../ShopItems";

type reassigned<T, U> = { [K in keyof T]: U }

interface stateType {
    money: number,
    materials: reassigned<typeof materials, number>,
    buyers: reassigned<typeof buyers, number>
}

const assignAll = <U, _>(to: U) => <T, _>(o: T): reassigned<T, U> =>
    Object.getOwnPropertyNames(o)
        .reduce((acc, c) => ({ ...acc, [c]: to }), {}) as reassigned<T, U>

const zeroOut = assignAll(0);

export class Home extends React.Component<{}, stateType> {
    constructor(props) {
        super(props);
        this.state = {
            money: 10,
            materials: zeroOut(materials),
            buyers: zeroOut(buyers)
        }
    }

    componentDidMount() {
        const ticktime = .2 //seconds
        setInterval(this.onTick(ticktime), ticktime * 1000)
    }

    onTick = (timepassed: number) => () => {
        if (this.state.money != 0) {
            const mats = Object.getOwnPropertyNames(buyers).reduce((acc, c) =>
                ({
                    ...acc,
                    [buyers[c].buys]: (this.state.materials[buyers[c].buys] + (buyers[c].buyPerTick * this.state.buyers[c]) * timepassed)
                }), {}) as reassigned<typeof materials, number>
            this.setState({
                materials: mats
            })
        }
    }

    increment = (toIncrement: keyof typeof materials) => () => {
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

    sell = (toSell: keyof typeof materials) => (amount: number) => {
        if (this.state.materials[toSell] == 0) return;
        this.setState((prevState) => ({
            ...prevState,
            money: prevState.money + materials[toSell].marketCost * amount,
            materials: {
                ...prevState.materials,
                [toSell]: prevState.materials[toSell] - amount
            }
        }))
    }

    onPurchase = (itemKey: keyof typeof shopItems) => {
        const item = shopItems[itemKey];
        this.setState({ money: this.state.money - item.cost })
        switch (item.type) {
            case "buyer":
                this.setState((prevState) => ({
                    ...prevState,
                    buyers: {
                        ...prevState.buyers,
                        [itemKey]: prevState.buyers[itemKey] + 1
                    }
                }))
                break
            case "other":
                break
        }
    }

    render() {
        const mats = this.state.materials
        return (
            <>
                <h1>Welcome to the Intergalactic Superstore!</h1>
                <div className="topinfo">
                    <p>Money: ${this.state.money}</p>
                    <p>Material A: {Math.floor(mats.materialA)}</p>
                    <p>Material B: {Math.floor(mats.materialB)}</p>
                </div>
                <div className="body">
                    <div className="materials">
                        <Clicker
                            onClick={this.increment("materialA")}
                            text="Click me for material A"
                            rate={shopItems.materialABuyer.buyPerTick * this.state.buyers.materialABuyer} />
                        <br />
                        <Clicker
                            onClick={this.increment("materialB")}
                            text="Click me for material B"
                            rate={shopItems.materialBBuyer.buyPerTick * this.state.buyers.materialBBuyer} />
                        <br />
                        <Sell
                            sellMax={mats.materialA}
                            onSell={this.sell("materialA")}
                            toSell={materials.materialA.name} />
                        <br />
                        <Sell
                            sellMax={mats.materialB}
                            onSell={this.sell("materialB")}
                            toSell={materials.materialB.name} />
                    </div>
                    <Shop
                        onPurchase={this.onPurchase}
                        money={this.state.money} />
                </div>
            </>
        )
    }
}