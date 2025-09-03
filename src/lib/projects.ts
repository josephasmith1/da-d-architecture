type ProjectImage = {
  image: string;
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  size: string;
  status: string;
  services: string[];
  coverImage: string;
  description: string[];
  additionalInfo: {
    Client: string;
    Contractor: string;
    Photographer: string;
  };
  floorPlans: ProjectImage[];
  gallery: ProjectImage[];
};

// Helper to get the base URL
function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // Browser should use current origin
    return '';
  }
  // Prefer a fully qualified public site URL if provided
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    const url = process.env.NEXT_PUBLIC_SITE_URL;
    return url.startsWith('http') ? url : `https://${url}`;
  }
  // Vercel deployments expose VERCEL_URL without protocol
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // Netlify provides URL (full URL) or SITE_URL
  if (process.env.URL) {
    return process.env.URL;
  }
  if (process.env.SITE_URL) {
    const url = process.env.SITE_URL as string;
    return url.startsWith('http') ? url : `https://${url}`;
  }
  // Assume localhost
  return 'http://localhost:3000';
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/projects/${slug}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading project:', error);
    return null;
  }
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/projects`);
    if (!response.ok) {
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}