import { palette } from "./palette";

type FixedLengthTuple<T, N> = [T, ...T[]] & { length: N };

export const pieGraphColourThemes = [
  "cool",
  "earthy",
  "multicolour",
  "warm",
] as const;

// If altering the max pie graph segments, be sure to alter TPieGraphColourTheme accordingly
export const MAX_PIE_GRAPH_SEGMENTS: number = 6;
type TPieGraphColourTheme = FixedLengthTuple<string, 6>;

interface ITheme {
  background: Record<"menu" | "page", string>;
  text: Record<"primary", string>;
  pieGraph: Record<
    (typeof pieGraphColourThemes)[number],
    TPieGraphColourTheme
  > & {
    shadowInner: string;
    shadowOuter: string;
    emptyStatePattern: string;
  };
}

export const lightTheme: ITheme = {
  background: {
    menu: palette.grey[10],
    page: palette.white,
  },
  text: {
    primary: palette.grey[100],
  },
  pieGraph: {
    shadowInner: palette.grey[30],
    shadowOuter: palette.grey[10],
    emptyStatePattern: palette.grey[20],
    cool: [
      palette.blueGreen[100],
      palette.blueGreen[80],
      palette.blueGreen[60],
      palette.blueGreen[40],
      palette.blueGreen[20],
      palette.blueGreen[10],
    ],
    earthy: [
      palette.brownGreen[50],
      palette.brownGreen[60],
      palette.brownGreen[70],
      palette.brownGreen[80],
      palette.brownGreen[90],
      palette.brownGreen[100],
    ],
    multicolour: [
      palette.mutedRainbow.red,
      palette.mutedRainbow.orange,
      palette.mutedRainbow.yellow,
      palette.mutedRainbow.green,
      palette.mutedRainbow.blue,
      palette.mutedRainbow.purple,
    ],
    warm: [
      palette.orange[50],
      palette.orange[60],
      palette.orange[70],
      palette.orange[80],
      palette.orange[90],
      palette.orange[100],
    ],
  },
};
