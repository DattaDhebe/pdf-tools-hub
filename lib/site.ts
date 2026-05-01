export const SITE_URL = 'https://www.dhebe.com';
export const SITE_HOSTNAME = 'www.dhebe.com';
export const SITE_NAME = 'DHEBE Studios';
export const SUPPORT_EMAIL = 'support@dhebe.com';

function normalizePath(path: string) {
  if (!path) {
    return '/';
  }

  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return path.startsWith('/') ? path : `/${path}`;
}

function normalizeRoutePath(path: string) {
  if (path === '/') {
    return '/';
  }

  const [beforeHash, hashFragment] = path.split('#', 2);
  const [pathname, search] = beforeHash.split('?', 2);
  const pathnameWithSlash = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const route = `${pathnameWithSlash}${search ? `?${search}` : ''}`;

  return hashFragment ? `${route}#${hashFragment}` : route;
}

export function siteRoute(path = '/') {
  const normalizedPath = normalizePath(path);

  if (/^https?:\/\//.test(normalizedPath)) {
    return normalizedPath;
  }

  return new URL(normalizeRoutePath(normalizedPath), `${SITE_URL}/`).toString();
}

export function siteAsset(path: string) {
  const normalizedPath = normalizePath(path);

  if (/^https?:\/\//.test(normalizedPath)) {
    return normalizedPath;
  }

  return new URL(normalizedPath, `${SITE_URL}/`).toString();
}
