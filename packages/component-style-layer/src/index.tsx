import { Tab, Container } from "@atrilabs/core";
import { TabBody } from "./TabBody";
import { TabHeader } from "./TabHeader";
import { useShowTab } from "./hooks/useShowTab";
import { useManageCSS } from "./hooks/useManageCSS";
import { UploadContainer } from "@atrilabs/shared-layer-lib";
import { useUploadAssetManager } from "./hooks/useUploadAssetManager";
import { useShowColorPalette } from "./hooks/useShowColorPalette";
import { ColorPickerAsset } from "./components/commons/ColorPickerAsset";
import { gray700 } from "@atrilabs/design-system";

/*
This serves as the Data Manager component for this layer.
*/
export default function () {
  // show tab and set alias
  const { showTab, alias, setAliasCb, id } = useShowTab();
  const { patchCb, styles, treeOptions, breakpoint } = useManageCSS(id);
  const {
    openAssetManager,
    modes,
    onCrossClicked,
    onSelect,
    onUploadSuccess,
    showAssetPanel,
  } = useUploadAssetManager(patchCb);
  const {
    showColorPalette,
    linkColorPaletteToStyleItem,
    title,
    openPalette,
    closePalette,
  } = useShowColorPalette();
  return (
    <>
      {showTab && id ? (
        <Tab
          name="PropertiesTab"
          body={
            <>
              <TabBody
                alias={alias}
                setAliasCb={setAliasCb}
                patchCb={patchCb}
                styles={styles}
                treeOptions={treeOptions}
                openAssetManager={openAssetManager}
                openPalette={openPalette}
                compId={id}
                breakpoint={breakpoint}
              />
              {showColorPalette && linkColorPaletteToStyleItem ? (
                <div
                  style={{
                    position: "absolute",
                    bottom: "0.2rem",
                    left: "-17rem",
                  }}
                >
                  <ColorPickerAsset
                    styleItem={linkColorPaletteToStyleItem}
                    closePalette={closePalette}
                    styles={styles}
                    patchCb={patchCb}
                    title={title}
                  />
                </div>
              ) : null}
            </>
          }
          header={<TabHeader />}
          itemName={"styles"}
        />
      ) : null}
      {showAssetPanel ? (
        <Container name="Drop" onClose={onCrossClicked}>
          <div
            style={{
              width: "15rem",
              height: `100%`,
              backgroundColor: gray700,
              boxSizing: "border-box",
              userSelect: "none",
              overflow: "auto",
            }}
          >
            <UploadContainer
              modes={modes}
              onCrossClicked={onCrossClicked}
              onUploadSuccess={onUploadSuccess}
              onSelect={onSelect}
            />
          </div>
        </Container>
      ) : null}
    </>
  );
}
