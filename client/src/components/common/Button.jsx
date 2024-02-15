import React from "react";

const Button = ({ text, onClick, style, type, props }) => {
  console.log(props);
  return (
    <button className={style} type={type} {...props}>
      {text}
    </button>
  )
}

export default Button;
