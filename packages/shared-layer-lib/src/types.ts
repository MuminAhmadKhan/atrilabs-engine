import { UploadMode } from "./components";

export type UseUploadAssetManagerOptions = {
  patchCb: (slice: any) => void;
  // useful for css property
  wrapInUrl: boolean;
};

export type OpenAssetManagerCallabck = (
  modes: UploadMode[],
  selector: string[],
  appendToArray?: {
    currentArray: string[];
    index: number;
  }
) => void;
