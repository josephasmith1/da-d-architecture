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
  if (process.env.VERCEL_URL) {
    // Reference for vercel.com deployments
    return `https://${process.env.VERCEL_URL}`;
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