const sharp = require("sharp");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#101312"/>
<g font-family="Arial, sans-serif"><text x="75" y="95" font-size="17" letter-spacing="3" fill="#b4d49a">SOFTWARE · BACKEND · AI ENGINEERING</text>
<text x="68" y="278" font-size="106" letter-spacing="-6" fill="#eeefeb">Asfand Yar<tspan fill="#b4d49a">.</tspan></text>
<text x="75" y="348" font-size="34" fill="#eeefeb">Engineering the systems</text><text x="75" y="397" font-size="34" fill="#b4d49a">behind intelligent software.</text>
<path d="M75 515H1125" stroke="#303a33"/><text x="75" y="561" font-size="19" fill="#a3aca5">asfandyar.tech</text><text x="760" y="561" font-size="17" fill="#a3aca5">Python / APIs / LLMs / RAG / Agents</text></g>
<g stroke="#62705e" stroke-width="1.5" fill="none"><path d="m930 149 132 76v152l-132 76-132-76V225Zm0 0v152m-132-76 132 76 132-76m-132 76v152M864 187v152l132 76M996 187v152l-132 76M798 301l132 76 132-76M864 187l132 76v152m0-228-132 76v152"/></g><g fill="#b4d49a"><circle cx="930" cy="301" r="10"/><circle cx="930" cy="149" r="4"/><circle cx="1062" cy="225" r="4"/><circle cx="798" cy="377" r="4"/></g></svg>`;
sharp(Buffer.from(svg))
  .png()
  .toFile("public/social-preview.png")
  .then((info) => console.log(info));
