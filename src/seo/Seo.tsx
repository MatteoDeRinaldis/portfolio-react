import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  NOT_FOUND_SEO,
  ROUTE_SEO,
  SITE_NAME,
  SOCIAL_IMAGE,
  SOCIAL_IMAGE_ALT,
  SOCIAL_IMAGE_HEIGHT,
  SOCIAL_IMAGE_WIDTH,
  getCanonicalUrl,
  normalizePath,
} from './seoConfig';

type MetaAttribute = 'name' | 'property';

const upsertMeta = (attribute: MetaAttribute, key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const upsertCanonical = (href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

export const Seo: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = normalizePath(pathname);
    const isKnownRoute = Object.prototype.hasOwnProperty.call(ROUTE_SEO, path);
    const { title, description } = isKnownRoute ? ROUTE_SEO[path] : NOT_FOUND_SEO;
    const url = getCanonicalUrl(isKnownRoute ? path : '/');

    document.title = title;
    upsertCanonical(url);
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', isKnownRoute ? 'index, follow' : 'noindex, follow');

    upsertMeta('property', 'og:type', path === '/' ? 'profile' : 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', SOCIAL_IMAGE);
    upsertMeta('property', 'og:image:width', SOCIAL_IMAGE_WIDTH);
    upsertMeta('property', 'og:image:height', SOCIAL_IMAGE_HEIGHT);
    upsertMeta('property', 'og:image:alt', SOCIAL_IMAGE_ALT);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', SOCIAL_IMAGE);
    upsertMeta('name', 'twitter:image:alt', SOCIAL_IMAGE_ALT);
  }, [pathname]);

  return null;
};
