import {
  gray100,
  gray200,
  gray400,
  gray800,
  smallText,
  h5Heading,
} from "@atrilabs/design-system";
import React, { useState, useCallback } from "react";
import { ReactComponent as BC } from "../../assets/border/border-color-icon.svg";
import { ReactComponent as BR } from "../../assets/border/border-radius-icon.svg";
import { ReactComponent as BS } from "../../assets/border/border-style-icon.svg";
import { ReactComponent as BW } from "../../assets/border/border-width-icon.svg";
import { ReactComponent as DropDownArrow } from "../../assets/layout-parent/dropdown-icon.svg";
import { CssProprtyComponentType } from "../../types";
import { Input } from "../commons/Input";
import { SizeInputWithUnits } from "../commons/SizeInputWithUnits";

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "0.5rem",
    borderBottom: "1px solid #111827",
  },
  header: {
    ...h5Heading,
    color: gray200,
    display: "flex",
    marginTop: "10px",
    paddingBottom: "0.5rem",
    height: "25px",
    paddingLeft: "0.5rem",
    userSelect: "none",
  },
  inputBox: {
    ...smallText,
    outline: "none",
    color: gray100,
    backgroundColor: gray800,
    width: "57px",
    height: "25px",
    border: "none",
    borderRadius: "2px",
  },
  drop: {
    display: "flex",
    alignItems: "baseline",
  },
  optionName: {
    ...smallText,
    width: "1.5rem",
    color: "white",
    lineHeight: "25px",
  },
  select: {
    textAlign: "left",
  },
  gridContainer: {
    ...smallText,
    color: gray400,
    display: "grid",
    gridTemplateColumns: "15px 60px 15px 60px",
    rowGap: "20px",
    textAlign: "center",
    columnGap: "15px",
    marginBottom: "25px",
  },
  gridInputContainer: {
    ...smallText,
    color: gray400,
    display: "grid",
    gridTemplateColumns: "15px 60px 40px",
    rowGap: "20px",
    textAlign: "center",
    columnGap: "15px",
    marginBottom: "25px",
  },
  inputContainer: {
    display: "flex",
  },
  inputContainerBox: {
    ...smallText,
    outline: "none",
    color: gray100,
    padding: "3px",
    backgroundColor: gray800,
    width: "30px",
    border: "none",
    borderRadius: "2px 0 0 2px",
    lineHeight: "20px",
  },
  inputSpan: {
    ...smallText,
    color: gray400,
    backgroundColor: gray800,
    borderRadius: "0 2px 2px 0",
    display: "flex",
    alignItems: "center",
    paddingRight: "4px",
  },
};
export type Color = {
  hex: string;
  rgb: ColorRGB;
  hsv: ColorHSV;
};

export type ColorRGB = {
  r: number;
  g: number;
  b: number;
  a?: number;
};

export type ColorHSV = {
  h: number;
  s: number;
  v: number;
  a?: number;
};

export const hex2rgb = (hex: Color["hex"]) => {
  hex = hex.slice(1);
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  let a = parseInt(hex.slice(6, 8), 16) || undefined;
  if (a) {
    a = a / 255;
  }
  return { r, g, b, a };
};

export const rgb2hex = ({ r, g, b, a }: Color["rgb"]) => {
  const hex = [r, g, b, a]
    .map((v, i) =>
      v !== undefined
        ? (i < 3 ? v : Math.round(v * 255)).toString(16).padStart(2, "0")
        : ""
    )
    .join("");
  return `#${hex}`;
};

export const Border: React.FC<CssProprtyComponentType> = (props) => {
  const getOpacityValue = (hex: Color["hex"]) => {
    let convertedRgbValue = hex2rgb(hex);
    if (convertedRgbValue.a) {
      return String(convertedRgbValue.a * 100);
    } else {
      return "100";
    }
  };

  const [showProperties, setShowProperties] = useState(true);
  const [opacityValue, setOpacityValue] = useState<string>(
    props.styles.borderColor ? getOpacityValue(props.styles.borderColor) : "100"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    parseInt(e.target.value) > 100
      ? setOpacityValue("100")
      : setOpacityValue(e.target.value);

    props.patchCb({
      property: {
        styles: {
          borderColor: handleOpacityChange(
            String(Number(e.target.value) / 100),
            String(props.styles.borderColor)
          ),
        },
      },
    });
  };

  const opacityHelper = (opacityValue: string) => {
    let opacityHelperValue;
    opacityValue === ""
      ? (opacityHelperValue = 100)
      : (opacityHelperValue = Number(opacityValue));
    return opacityHelperValue;
  };

  const handleOpacityChange = useCallback(
    (opacityValue: string, hex: Color["hex"]) => {
      let convertedRgbValue = hex2rgb(hex);
      if (opacityHelper(opacityValue) > 0) {
        convertedRgbValue.a = opacityHelper(opacityValue);
      } else if (opacityHelper(opacityValue) < 0) {
        convertedRgbValue.a = 0;
      } else {
        convertedRgbValue.a = 1;
      }
      return rgb2hex(convertedRgbValue);
    },
    []
  );

  const handleBorderChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    styleItem: keyof React.CSSProperties
  ) => {
    props.patchCb({
      property: {
        styles: {
          [styleItem]: e.target.value,
        },
      },
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.drop}>
        <DropDownArrow
          onClick={() => setShowProperties(!showProperties)}
          style={
            !showProperties
              ? { transform: "rotate(-90deg)" }
              : { transform: "rotate(0deg)" }
          }
        />
        <div style={styles.header}>Border</div>
      </div>
      <div style={showProperties ? { display: "block" } : { display: "none" }}>
        <div style={styles.gridContainer}>
          <div style={styles.optionName}>
            <BR />
          </div>
          <div>
            <SizeInputWithUnits
              styleItem="borderRadius"
              styles={props.styles}
              patchCb={props.patchCb}
              defaultValue="0"
            />
          </div>
          <div style={styles.optionName}>
            <BW />
          </div>
          <div>
            <SizeInputWithUnits
              styleItem="borderWidth"
              styles={props.styles}
              patchCb={props.patchCb}
              defaultValue=""
            />
          </div>

          <div style={styles.optionName}>
            <BS />
          </div>
          <div>
            <select
              name="borderStyle"
              onChange={(e) => handleBorderChange(e, "borderStyle")}
              style={styles.inputBox}
              value={props.styles.borderStyle || "none"}
            >
              <option style={styles.select} value="none">
                none
              </option>
              <option style={styles.select} value="solid">
                solid
              </option>
              <option style={styles.select} value="dashed">
                dashed
              </option>
              <option style={styles.select} value="dotted">
                dotted
              </option>
            </select>
          </div>
        </div>
        <div style={styles.gridInputContainer}>
          <div style={styles.optionName}>
            <BC />
          </div>
          <div
            onClick={() => {
              props.openPalette("borderColor", "Border Color");
            }}
          >
            <Input
              styleItem="borderColor"
              styles={props.styles}
              patchCb={props.patchCb}
              defaultValue=""
              parseToInt={false}
            />
          </div>
          <div style={{ width: "45px", marginRight: "10px" }}>
            <div style={styles.inputContainer}>
              <input
                type="text"
                value={opacityValue}
                onChange={handleChange}
                style={styles.inputContainerBox}
                placeholder="100"
              />
              <div style={styles.inputSpan}>%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
