import React from "react";

import classnames from "classnames";

export enum InputStyle {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

export interface InputProps {
  id: string;
  value: string;
  label: string;
  disabled?: boolean;
  errorMessage?: string;
  onTextChange: (text: string) => void;
  theme?: InputStyle;
  color?: string;
  password?: boolean;
}

const Input: React.FC<InputProps> = (props) => {
  const [focused, setFocused] = React.useState(false);

  const THEME_COLOR = props.theme == InputStyle.DARK ? "#1c1c1c" : "#fff";
  const REVERSE_THEME_COLOR =
    props.theme == InputStyle.DARK ? "#fff" : "#1c1c1c";
  return (
    <div
      className={classnames("input", {
        error: !!props.errorMessage,
        focused,
        empty: props.value.length == 0,
        disabled: props.disabled,
      })}
    >
      <div className="label">{props.label}</div>
      <label
        htmlFor={props.id}
        className={classnames("label-field", {
          error: !!props.errorMessage,
          focused,
        })}
      >
        <input
          className={classnames("input-field", {
            error: !!props.errorMessage,
            focused,
          })}
          name={props.label}
          id={props.id}
          type={props.password ? "password" : "text"}
          value={props.value}
          placeholder={props.label}
          onChange={(e) =>
            !props.disabled && props.onTextChange(e.target.value)
          }
          onFocus={(e) => !props.disabled && setFocused(true)}
          onBlur={() => !props.disabled && setFocused(false)}
          disabled={props.disabled}
        />
      </label>
      <style jsx>{`
        .input {
          display: inline-block;
          position: relative;
          width: 100%;
        }
        .input.disabled {
          opacity: 0.8;
        }
        .input .label {
          opacity: 1;
          color: ${props.color || REVERSE_THEME_COLOR};
          padding-left: 18px;
          font-size: small;
          padding-bottom: 2px;
        }
        .input.empty .label {
          visibility: hidden;
          opacity: 0;
          transition-property: opacity;
          transition-duration: 0.8s;
          transition-timing-function: easeInSine;
        }
        .input-field {
          border-radius: 25px;
          padding: 10px 15px;
          border: 2px solid ${props.color || REVERSE_THEME_COLOR};
          color: ${props.color || REVERSE_THEME_COLOR};
          background-color: ${THEME_COLOR};
          width: 100%;
          box-sizing: border-box;
        }
        .input-field:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default Input;
