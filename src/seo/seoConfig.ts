export const SITE_URL = 'https://matteoderinaldis.com';
export const SITE_NAME = 'Matteo De Rinaldis';
export const SOCIAL_IMAGE = `${SITE_URL}/og-image.jpg`;
export const SOCIAL_IMAGE_WIDTH = '1200';
export const SOCIAL_IMAGE_HEIGHT = '630';
export const SOCIAL_IMAGE_ALT = 'Matteo De Rinaldis — Senior Frontend Engineer';

export interface RouteSeo {
  title: string;
  description: string;
}

export const SITE_TITLE = 'Matteo De Rinaldis | Senior Frontend Engineer';

export const ROUTE_SEO: Record<string, RouteSeo> = {
  '/': {
    title: SITE_TITLE,
    description:
      'Matteo De Rinaldis — Senior Frontend Engineer specialized in React, TypeScript and modern web applications.',
  },
  '/about': {
    title: SITE_TITLE,
    description:
      'About Matteo De Rinaldis, Senior Frontend Engineer focused on React, TypeScript and maintainable web applications.',
  },
  '/skills': {
    title: SITE_TITLE,
    description:
      'Technical skills of Matteo De Rinaldis across React, TypeScript, frontend engineering, testing and modern web development.',
  },
  '/projects': {
    title: SITE_TITLE,
    description:
      'Projects and professional experience of Matteo De Rinaldis as a Senior Frontend Engineer.',
  },
  '/contact': {
    title: SITE_TITLE,
    description:
      'Contact Matteo De Rinaldis, Senior Frontend Engineer.',
  },
  '/privacy-policy': {
    title: SITE_TITLE,
    description:
      'Privacy policy of the Matteo De Rinaldis portfolio website.',
  },
};

export const NOT_FOUND_SEO: RouteSeo = ROUTE_SEO['/'];

export const normalizePath = (pathname: string): string => {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
};

export const getCanonicalUrl = (path: string): string => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);
