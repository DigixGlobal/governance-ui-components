import { fetchFromDijix } from '@digix/gov-ui/utils/dijix';

export const fetchImages = proofs => {
  if (!proofs) return;
  const thumbnailSize = 512;
  return Promise.all(
    proofs.map(hash => {
      if (hash === null || !hash) return undefined;
      return fetchFromDijix(0, undefined, hash).then(data => data);
    })
  ).then(images => {
    if (!images[0]) return undefined;
    const files = images.map(image => {
      if (image && image.type === 'pdf') {
        return {
          src: image.data.src,
          type: image.type,
        };
      }
      return {
        thumbnail: image ? image.data.thumbnails[thumbnailSize] : undefined,
        src: image ? image.data.src : undefined,
        type: image ? image.type : undefined,
      };
    });
    return files;
  });
};
