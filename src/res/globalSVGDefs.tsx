import { MASK_STRIPE_ID, SVG_SHAPE_ID_MAP } from '../components/partRenderer';
import { CardShape } from '../types/types';

export function GlobalSVGDefs() {
    return (
        <svg width="200" height="400" css={{ position: 'fixed', zIndex: -1 }}>
            <defs>
                <path
                    id={SVG_SHAPE_ID_MAP[CardShape.Squiggle]}
                    d="m67.892902,12.746785c43.231313,-6.717223 107.352741,6.609823 121.028973,58.746408c13.676233,52.136585 -44.848649,161.467192 -45.07116,204.650732c4.566246,56.959708 83.805481,87.929227 22.329944,105.806022c-61.475536,17.876795 -126.122496,-1.855045 -143.73294,-41.933823c-17.610444,-40.07878 49.274638,-120.109409 46.14822,-188.091997c-3.126418,-67.982588 -21.873669,-70.257464 -49.613153,-80.177084c-27.739485,-9.919618 5.678801,-52.283035 48.910115,-59.000258z"
                ></path>
                <path
                    id={SVG_SHAPE_ID_MAP[CardShape.Oval]}
                    d="m11.49999,95.866646c0,-44.557076 37.442923,-81.999998 82.000002,-81.999998l12.000015,0c44.557076,0 81.999992,37.442923 81.999992,81.999998l0,206.133354c0,44.557098 -37.442917,82 -81.999992,82l-12.000015,0c-44.557079,0 -82.000002,-37.442902 -82.000002,-82l0,-206.133354z"
                ></path>
                <path
                    id={SVG_SHAPE_ID_MAP[CardShape.Diamond]}
                    d="m98.544521,10.311863l-87.830189,189.330815l88.201143,189.644391l88.942329,-190.362741l-89.313283,-188.612465z"
                ></path>
                <pattern
                    id="pattern-stripe"
                    width="2"
                    height="20"
                    patternUnits="userSpaceOnUse"
                >
                    <rect width="2" height="8" fill="#fff"></rect>
                </pattern>
                <mask id={MASK_STRIPE_ID}>
                    <rect
                        x="0"
                        y="0"
                        width="200"
                        height="400"
                        fill="url(#pattern-stripe)"
                    ></rect>
                </mask>
            </defs>
        </svg>
    );
}
