import React from 'react'

export default function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#6DC8C9" : "white"
    }


    return (
    <div 
        className="die--front" 
        style={styles}
        onClick={props.holdDice}
    >
        <h2 className="die--num">{props.value}</h2>
    </div>
    )
}