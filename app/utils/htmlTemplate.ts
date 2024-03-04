import { Metadata } from '@/interfaces';
import { getImageExtension } from './htmlParser';

export const indexHtmlMarkup = (metadata: Metadata): string => {
  const contenMarkup = bodyHtmlMarkup(metadata);
  const markup = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Display Ad</title>
</head>
<style>
${cssStyles()}
</style>
<body>
    ${contenMarkup}
</body>
</html>
    `;

  return markup.trim();
};

export const bodyHtmlMarkup = (metadata: Metadata): string => {
  const bodyMarkup = `  
<div class="ad-card">
    <div class="image-container">
        <span class="ad-label">Anzeige</span>
        <img src="ad-image.${getImageExtension(metadata.image)}" alt="ad image" />
    </div>
    <h2 class="ad-title">${metadata.title || ''}</h2>
    <p class="ad-description">${metadata.description || ''}</p>
    <p className="ad-tag">${metadata.siteName || ''}</p>
</div>
    `;

  return bodyMarkup.trim();
};

export const cssStyles = (): string => {
  const css = `
    .ad-card {
      padding: 1rem;
      margin-top: 1rem;
      border-radius: 0.5rem;
      width: 20rem;
      background-color: #ffffff;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .image-container {
      position: relative;
    }

    .image-container img {
      object-fit: cover;
      width: 20rem;
      height: 18rem;
      transform-origin: center;
    }

    .ad-label {
      position: absolute;
      top: 0;
      right: 0;
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      font-size: 0.75rem;
      line-height: 1rem;
      color: #ffffff;
      background-color: #000000;
    }

    .ad-title {
      margin-bottom: 0.25rem;
      margin-top: 0.5rem;
      font-size: 1.125rem;
      line-height: 1.75rem;
      font-weight: 700;
    }

    .ad-description {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      white-space: normal;
      overflow: hidden;
    }

    .ad-tag {
      margin-top: 1rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }

    .ad-title:empty,
    .ad-description:empty,
    .ad-tag {
      display: none;
    }
  `;

  return css.trim();
};
