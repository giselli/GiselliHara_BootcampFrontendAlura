import { css } from 'styled-components';
import { breakpoints } from '../index';

export function breakpointsMedia(cssByBreakpoits) {
  const breakpointsName = Object.keys(cssByBreakpoits);
  return breakpointsName.map((breakpointName) => css`
            @media screen and (min-width: ${breakpoints[breakpointName]}px){
                ${cssByBreakpoits[breakpointName]}
            }
        `);
}
