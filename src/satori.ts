import fs from 'fs';
// @ts-ignore
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js';

// failed
import { html } from "./satori-html.cjs";

// failed 
// const html = async (...args: string[]) => {
//   const { html } = await import('satori-html');
//   // @ts-ignore
//   return html(...args);
// }

export default async function satoriFunc() {
  const template = await html(`
    <div style="font-family: Roboto; font-size: 24px; color: #000000; display: flex">
      <p>Hello World!</p>
    </div>
  `)
  // const template = StringToReact("")
  
  let robotoArrayBuffer = fs.readFileSync('public/Roboto-Regular.ttf');
  const svg = await satori(template , {
      width: 600,
      height: 400,
      fonts: [
        {
          name: 'Roboto',
          // Use `fs` (Node.js only) or `fetch` to read the font as Buffer/ArrayBuffer and provide `data` here.
          data: robotoArrayBuffer,
          weight: 400,
          style: 'normal',
        },
      ],
    },
  )

  const resvg = new Resvg(svg, {
    background: "rgba(238, 235, 230, .9)",
  });

  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  console.info('Original SVG Size:', `${resvg.width} x ${resvg.height}`)
  console.info('Output PNG Size  :', `${pngData.width} x ${pngData.height}`)
  
  return pngBuffer
}