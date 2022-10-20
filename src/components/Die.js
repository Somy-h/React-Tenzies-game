import React from "react";

export default function Die(props) {

  const styles = {
    backgroundColor: props.isHeld ? "#59E391": "white"
  }
  
  const styles1  = {
    backgroundColor: (props.value === 2 || props.value === 3 || props.value === 4 || props.value === 5 || props.value === 6) ? "black" : "transparent"
  }

  const styles3  = {
    backgroundColor: (props.value === 4 || props.value === 5 || props.value === 6) ? "black" : "transparent"
  }

  const styles4  = {
    backgroundColor: (props.value === 6) ? "black" : "transparent"
  }

  const styles5  = {
    backgroundColor: (props.value === 1 || props.value === 3 || props.value === 5) ? "black" : "transparent"
  } 
  
  const styles6  = {
    backgroundColor: (props.value === 6) ? "black" : "transparent"
  }

  const styles7  = {
    backgroundColor: (props.value === 4 || props.value === 5 || props.value === 6) ? "black" : "transparent"
  }

  const styles9  = {
    backgroundColor: (props.value === 2 || props.value === 3 || props.value === 4 || props.value === 5 || props.value === 6) ? "black" : "transparent"
  }

  return (
      <div 
        className="die rounded-md shadow-lg cursor-pointer p-1"
        style = {styles}
        onClick={props.holdDice}
      >
        <div className="die-dot one" style={styles1}></div>
        <div className="die-dot three" style={styles3}></div>
        <div className="die-dot four" style={styles4}></div>
        <div className="die-dot five" style={styles5}></div>
        <div className="die-dot six" style={styles6}></div>
        <div className="die-dot seven" style={styles7}></div>
        <div className="die-dot nine" style={styles9}></div>    
      </div>

  )
}