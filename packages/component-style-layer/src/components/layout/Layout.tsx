import {
  gray100,
  gray800,
  gray200,
  gray400,
  smallText,
  h5Heading,
} from "@atrilabs/design-system";
import React, { useState } from "react";
import { ReactComponent as DropDownArrow } from "../../assets/layout-parent/dropdown-icon.svg";
import { ReactComponent as RightArrow } from "../../assets/layout-parent/right-arrow.svg";
import { ReactComponent as DownArrow } from "../../assets/layout-parent/down-arrow.svg";
import { ReactComponent as LeftArrow } from "../../assets/layout-parent//left-arrow.svg";
import { ReactComponent as UpArrow } from "../../assets/layout-parent/up-arrow.svg";
import { ReactComponent as FlexStart } from "../../assets/layout-parent/flex-start.svg";
import { ReactComponent as FlexEnd } from "../../assets/layout-parent/flex-end.svg";
import { ReactComponent as FlexCenter } from "../../assets/layout-parent/flex-center.svg";
import { ReactComponent as FlexStretch } from "../../assets/layout-parent/stretch-vertical.svg";
import { ReactComponent as FlexBaseline } from "../../assets/layout-parent/baseline-vertical.svg";
import { ReactComponent as JCStart } from "../../assets/layout-parent/jc-flex-start-icon.svg";
import { ReactComponent as JCEnd } from "../../assets/layout-parent/jc-flex-end-icon.svg";
import { ReactComponent as JCCenter } from "../../assets/layout-parent/jc-flex-center-icon.svg";
import { ReactComponent as JCSpaceAround } from "../../assets/layout-parent/jc-space-around-icon.svg";
import { ReactComponent as JCSpaceBetween } from "../../assets/layout-parent/jc-space-between-icon.svg";
import { ReactComponent as NoWrap } from "../../assets/layout-parent/no-wrap-icon.svg";
import { ReactComponent as Wrap } from "../../assets/layout-parent/wrap-icon.svg";
import { ReactComponent as WrapRev } from "../../assets/layout-parent/wrap-rev-icon.svg";
import { ReactComponent as ACFlexStart } from "../../assets/layout-parent/ac-start-icon.svg";
import { ReactComponent as ACFlexEnd } from "../../assets/layout-parent/ac-end-icon.svg";
import { ReactComponent as ACFlexCenter } from "../../assets/layout-parent/ac-center-icon.svg";
import { ReactComponent as ACFlexStretch } from "../../assets/layout-parent/ac-stretch-icon.svg";
import { ReactComponent as ACFlexSpaceBetween } from "../../assets/layout-parent/ac-space-between-icon.svg";
import { ReactComponent as ACFlexSpaceAround } from "../../assets/layout-parent/ac-space-around-icon.svg";

import { CssProprtyComponentType } from "../../types";
import PropertyRender from "../commons/PropertyRender";

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
    marginTop: "5px",
    paddingBottom: "0.5rem",
    height: "25px",
    paddingLeft: "0.5rem",
    userSelect: "none",
  },
  inputBox: {
    ...smallText,
    textAlign: "right",
    color: gray100,
    padding: "3px",
    backgroundColor: gray800,
    width: "50px",
    height: "20px",
    border: "0px",
    borderRadius: "2px",
    display:"flex"
  },
  rectLabel: {
    ...smallText,
    color: gray400,
    display: "flex",
    textAlign: "center",
    lineHeight: "0px",
  },
  inputLabel: {
    position: "relative",
    textAlign: "center",
    top: "-10px",
  },
  drop: {
    display: "flex",
    alignItems: "baseline",
  },
  option: {
    display: "flex",
    height: "25px",
    marginBottom: "25px",
    marginTop: "30px",
  },
  optionName: {
    ...smallText,
    width: "4rem",
    color: "white",
    display: "flex",
    alignItems: "center",
  },
  optionsIcons: {
    flexGrow: 1,
  },
};

// CSS Values for different CSS property (The default value must be at position 0)
// CSS values for flex-direction CSS property (The default value row is at position 0)

// This serves as a Semi-Smart component, i.e. it uses useMemo but not useState or useRef.
export const Layout: React.FC<CssProprtyComponentType> = (props) => {
  const [showProperties, setshowProperties] = useState(true);

  return (
    <>
      <div style={styles.container}>
        <div style={styles.drop}>
          <DropDownArrow
            onClick={() => setshowProperties(!showProperties)}
            style={
              !showProperties
                ? { transform: "rotate(-90deg)" }
                : { transform: "rotate(0deg)" }
            }
          />
          <div style={styles.header}>Layout - Flex Parent</div>
        </div>
        <div
          style={showProperties ? { display: "block" } : { display: "none" }}
        >
          <PropertyRender
            {...{
              styleItem: "flexDirection",
              styleText: "Direction",
              styleArray: ["row", "column", "row-reverse", "column-reverse"],
              patchCb: props.patchCb,
              styles: props.styles,
            }}
          >
            <RightArrow />
            <DownArrow />
            <LeftArrow />
            <UpArrow />
          </PropertyRender>
          <PropertyRender
            {...{
              styleItem: "alignItems",
              styleText: "Align- items",
              styleArray: [
                "stretch",
                "flex-start",
                "center",
                "flex-end",
                "baseline",
              ],
              patchCb: props.patchCb,
              styles: props.styles,
            }}
          >
            <FlexStretch />
            <FlexStart />
            <FlexCenter />
            <FlexEnd />
            <FlexBaseline />
          </PropertyRender>

          <PropertyRender
            {...{
              styleItem: "justifyContent",
              styleText: "Justify-Content",
              styleArray: [
                "flex-start",
                "center",
                "flex-end",
                "space-between",
                "space-around",
              ],
              patchCb: props.patchCb,
              styles: props.styles,
            }}
          >
            <JCStart />
            <JCCenter />
            <JCEnd />
            <JCSpaceBetween />
            <JCSpaceAround />
          </PropertyRender>

          <PropertyRender
            {...{
              styleItem: "flexWrap",
              styleText: "Wrap",
              styleArray: ["nowrap", "wrap", "wrap-reverse"],
              patchCb: props.patchCb,
              styles: props.styles,
            }}
          >
            <NoWrap />
            <Wrap />
            <WrapRev />
          </PropertyRender>

          <PropertyRender
            {...{
              styleItem: "alignContent",
              styleText: "Align-Content",
              styleArray: [
                "stretch",
                "flex-start",
                "center",
                "flex-end",
                "space-between",
                "space-around",
              ],
              patchCb: props.patchCb,
              styles: props.styles,
            }}
          >
            <ACFlexStretch />
            <ACFlexStart />
            <ACFlexCenter />
            <ACFlexEnd />
            <ACFlexSpaceBetween />
            <ACFlexSpaceAround />
          </PropertyRender>

          <div style={styles.option}>
            <div style={styles.optionName}>Gap</div>
            <div style={styles.rectLabel}>
              <div style={{ marginRight: "18px" }}>
                <label style={styles.inputLabel}>Row</label>
                <input type="text" style={styles.inputBox} placeholder="PX" />
              </div>
              <div>
                <label style={styles.inputLabel}>Col</label>
                <input type="text" style={styles.inputBox} placeholder="PX" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
