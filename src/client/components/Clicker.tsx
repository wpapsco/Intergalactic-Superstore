import * as React from "react";

interface props {
    onClick(e: React.MouseEvent<HTMLButtonElement>): void,
    text: string,
    rate: number
}

export class Clicker extends React.Component<props> {
    render() {
        return (
            <>
                <button onClick={this.props.onClick}>{this.props.text}</button>
                Currently generating {this.props.rate} per second
            </>
        )
    }
}