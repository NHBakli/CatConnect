"use client";
import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen z-10 fixed top-0 left-0 bg-custom-gradient flex justify-center items-center">
      <div className="svg-wrapper">
        <svg
          height="80"
          viewBox="0 0 1280 1280"
          xmlns="http://www.w3.org/2000/svg"
          fill="#333"
        >
          <g
            transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
            stroke="none"
          >
            <path
              className="path2"
              d="M4615 12476 c-167 -39 -293 -112 -436 -255 -116 -115 -199 -232 -279
-391 -477 -954 -316 -2528 353 -3430 91 -123 249 -285 357 -366 354 -267 752
-281 1071 -38 327 250 551 732 636 1369 21 164 25 672 5 840 -82 702 -291
1283 -618 1722 -82 109 -243 273 -344 350 -94 71 -272 163 -365 188 -83 23
-302 29 -380 11z"
            />
            <path
              className="path3"
              d="M8546 12274 c-311 -61 -636 -299 -905 -661 -346 -465 -580 -1080
-668 -1758 -28 -216 -25 -698 5 -894 70 -447 219 -789 442 -1011 191 -192 431
-281 675 -252 581 72 1154 706 1460 1616 254 755 281 1550 73 2156 -203 591
-615 897 -1082 804z"
            />
            <path
              className="path1"
              d="M2095 9010 c-409 -65 -717 -395 -856 -919 -79 -301 -90 -716 -28
-1081 143 -850 635 -1631 1217 -1933 298 -154 595 -181 850 -75 376 156 623
560 704 1153 16 119 16 472 -1 610 -130 1102 -809 2069 -1564 2230 -89 19
-247 26 -322 15z"
            />
            <path
              className="path4"
              d="M10570 8200 c-360 -77 -713 -330 -1006 -722 -318 -426 -532 -982
-594 -1542 -16 -146 -13 -460 5 -601 122 -948 766 -1403 1495 -1059 391 185
745 566 998 1073 480 960 449 2085 -73 2606 -220 220 -523 310 -825 245z"
            />
            <path
              className="path5"
              d="M6225 6421 c-662 -118 -1497 -813 -2237 -1861 -579 -821 -987 -1705
-1109 -2405 -29 -168 -32 -468 -6 -583 41 -179 110 -297 244 -422 224 -207
493 -329 830 -376 175 -24 529 -15 754 19 301 47 555 108 1124 272 550 158
704 191 856 181 193 -13 338 -60 754 -243 298 -131 464 -193 606 -228 530
-128 976 39 1435 537 137 148 179 220 222 377 24 90 26 110 26 321 0 191 -3
245 -23 355 -118 667 -469 1473 -976 2240 -603 912 -1311 1569 -1902 1764
-215 71 -398 87 -598 52z"
            />
          </g>
        </svg>
        <div className="w-full font-bold text-white translate-x-1 mt-4">
          Loading...
        </div>
      </div>
      <style jsx>{`
        @keyframes colorChange {
          0%,
          100% {
            fill: #333;
          }
          50% {
            fill: #e0e0e0;
          }
        }
        .path1 {
          animation: colorChange 4s infinite;
        }
        .path2 {
          animation: colorChange 4s infinite 1s;
        }
        .path3 {
          animation: colorChange 4s infinite 2s;
        }
        .path4 {
          animation: colorChange 4s infinite 3s;
        }
        .path5 {
          animation: colorChange 4s infinite 4s;
        }
      `}</style>
    </div>
  );
};

export default Loader;
