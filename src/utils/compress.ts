import { Group } from '@/types/types';

const compress = async function (
  string: string,
  encoding: CompressionFormat = 'gzip'
) {
  const byteArray = new TextEncoder().encode(string);
  const cs = new CompressionStream(encoding);
  const writer = cs.writable.getWriter();
  writer.write(byteArray);
  writer.close();
  const buffer = await new Response(cs.readable).arrayBuffer();
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
};

const decompress = async function (
  data: string,
  encoding: CompressionFormat = 'gzip'
) {
  const cs = new DecompressionStream(encoding);
  const writer = cs.writable.getWriter();
  const byteArray = new Uint8Array(
    [...atob(data)].map((char) => char.charCodeAt(0))
  );
  writer.write(byteArray);
  writer.close();
  const arrayBuffer = await new Response(cs.readable).arrayBuffer();
  return new TextDecoder().decode(arrayBuffer);
};

export const compressToURI = async function (
  string: string,
  encoding: CompressionFormat = 'gzip'
) {
  const data = await compress(string, encoding);
  return encodeURIComponent(data);
};

export const decompressFromURI = async function (
  string: string,
  encoding: CompressionFormat = 'gzip'
) {
  const data = decodeURIComponent(string);
  return await decompress(data, encoding);
};

function download(filename: string, text: string) {
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  );
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export const createCompressedURL = async (group: Group) => {
  const cardsJson = JSON.stringify(group.cards);
  const compressed = await compressToURI(cardsJson);
  const url = new URL(window.location.origin);
  const name = group.name;
  url.searchParams.append(name, compressed);
  const a = document.createElement('a');
  a.href = url.toString();
  a.innerHTML = name;
  const fileName = `Cards-pwa.vercel.app - ${name}.html`;

  download(
    fileName,
    `<html><h1>To add group of cards ${name} to Cards-pwa.vercel.app click the link below</h1><br><h1>${a.outerHTML}</h1></html>`
  );

  alert(
    `Send the file “${fileName}” from the “Downloads” to the person you want to share with.`
  );
};
