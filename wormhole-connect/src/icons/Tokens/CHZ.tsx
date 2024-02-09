import React from 'react';

function CHZ() {
  const svgStyles = {
    st0: {
      fillRule: 'evenodd' as const,
      clipRule: 'evenodd' as const,
      fill: '#FF1256',
    },
    st1: {
      fill: '#FFFFFF',
    },
  };

  return (
    <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 2500 2500">
      <circle cx="1250" cy="1250" r="1250" style={svgStyles.st0} />
      <g id="Layer_x0020_1">
        <g id="_1996065010912">
          <g>
            <path
              style={svgStyles.st1}
              d="M942,745l272-168c24-14,24-42,7-59L994,298c-4-4-12-4-16,0l-22,22c-28,28-27,72,0,100l89,82 c15,15,12,40-6,51l-106,65c-33,20-43,64-23,97l16,26C929,746,936,748,942,745z"
            />
            <path
              style={svgStyles.st1}
              d="M1204,1645c22-97-4-198-71-272l-172-195c-96-108-72-277,50-354l281-180c18-12,42-9,58,5 c103,95,461,436,445,789c0,0,0,548-539,753c-79,30-160-42-139-125c75-295,88-423,88-423l0,0L1204,1645z M1274,801 c-43,27-126,80-197,125c-48,30-57,95-20,138l180,208c103,113,144,270,109,419l-30,132c-13,57,55,97,99,59 c189-163,455-556-99-1077C1305,794,1288,793,1274,801L1274,801z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

export default CHZ;
