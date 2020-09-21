import React from "react";
import Test from "./test";

interface State {
    counter: number;
    childCounter: number;
}

class Demo extends React.Component<any, State>{

    constructor(state: State) {
        super(state)
        this.state = {
            counter: 0,
            childCounter: 1
        }

        this.onChildButtonClick = this.onChildButtonClick.bind(this);
    }
    render(): JSX.Element {

        // method using arrow functions
        const onButtonClick = () => {
            this.setState({
                counter: this.state.counter + 1
            })
        }

        return (
            <div>
                <h1>I'm a parent class component and my name is Demo</h1>
                <button className="button round primary"
                    title={"button"}
                    onClick={() => { onButtonClick() }}>
                    {"Click Me..!"}
                </button>
                <h2>parent component re-rendered {this.state.counter} times.. !</h2>

                <p>--------------------------------------------------------------------------------------</p>

                <h1>I'm a Child component and my name is Test</h1>
                <button className="button round primary"
                    title={"button"}
                    onClick={() => { this.onChildButtonClick() }}>
                    {"Click to rerender childComponent..!"}
                </button>
                <Test counter={this.state.childCounter} />
            </div>
        );
    }

    componentDidMount() {
        // hooked only after iniital render.
        // we can trigger api calls from here.
        console.log("Component DID Mount");
    }

    componentWillUnmount() {
        // hooks only when component is removed from UI
        console.log("Component will Unmount");
    }

    componentDidUpdate() {
        // hooked only after second render.
        console.log("component DidUpdate")
    }

    // this method can be written as like onButtonClick method.
    private onChildButtonClick() {
        /* while changing state demo component will get re-rendered 
         * but all states other than below mentioned state value remains the same.
         * this.state.childCounter value is passed to Test.tsx, a prop change happens and child will re-render.
         */
        this.setState({
            childCounter: this.state.childCounter + 1
        })
    }
}

export = Demo;