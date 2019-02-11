import * as React from "react"
import { shopItems, ShopItem, buyers } from "../ShopItems"

interface props {
    onPurchase: (item: keyof typeof shopItems) => void,
    money: number
}

export class Shop extends React.Component<props> {
    render() {
        return (
            <div className="shop">
                {this.shopButton("materialABuyer")}
                {this.shopButton("materialBBuyer")}
            </div>
        )
    }

    shopButton = (item: keyof typeof shopItems) =>
        <button
            onClick={this.purchase(item)}
            disabled={this.props.money < shopItems[item].cost}>
            {shopItems[item].shopText}<br />${shopItems[item].cost}
        </button>

    purchase = (item: keyof typeof shopItems) => () => {
        if (this.props.money < shopItems[item].cost) return
        this.props.onPurchase(item)
    }
}