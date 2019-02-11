import * as React from "react"

interface props {
    sellMax: number,
    toSell: string,
    onSell: (amount: number) => void
}

interface state {
    amount: number
}

export class Sell extends React.Component<props, state> {

    constructor(props) {
        super(props)
        this.state = {
            amount: 0
        }
    }

    render() {
        const { toSell } = this.props;
        const { amount } = this.state;
        return (
            <>
                <input type="number" onChange={this.onNumberChange} value={amount + ""} /> {/* number + "" is a dumb hack to get the leading 0 to disappear */}
                <button onClick={this.onSell}>Sell {toSell}</button>
            </>
        )
    }

    onNumberChange = (e) => {
        let amount = Math.floor(Number(e.target.value))
        if (amount > this.props.sellMax) {
            amount = Math.floor(this.props.sellMax)
        }
        this.setState({ amount })
    }

    onSell = () => {
        this.props.onSell(this.state.amount);
        this.setState({ amount: 0 })
    }
}