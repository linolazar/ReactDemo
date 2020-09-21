import React from "react";

interface Props {
    counter: number;
}

//stateless/functional component
const Test: any = React.memo((props: Props) => {
    return (
        <div>
            <h1>"I'm a stateless / functional component"</h1>
            <h2>child component re-rendered {props.counter} times</h2>
        </div>
    );
}
);

export = Test;