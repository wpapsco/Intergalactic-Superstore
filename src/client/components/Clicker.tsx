import * as React from "react";

interface props {
    onClick(e: React.MouseEvent<HTMLButtonElement>): void,
    text: string
}

export class Clicker extends React.Component<props> {
    render = () => (
        <>
            <button onClick={this.props.onClick}>{this.props.text}</button>
        </>
    )
}