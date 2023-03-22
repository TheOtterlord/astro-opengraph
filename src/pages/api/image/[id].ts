import satori from 'satori';
import { html } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';
import OpenSans from '../../../lib/OpenSans-Regular.ttf'

export async function get() {
  const out = html`<div tw="flex flex-col w-full h-full bg-white">
    <h1 tw="text-6xl text-center">Hello World</h1>
  </div>`

  let svg = await satori(out, {
    fonts: [
      {
        name: 'Open Sans',
        data: Buffer.from(OpenSans),
        style: 'normal'
      }
    ],
    height: 630,
    width: 1200
  });

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200
    }
  });

  const image = resvg.render();

  return new Response(image.asPng(), {
    headers: {
      'Content-Type': 'image/png',
      // optional
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  })
}
