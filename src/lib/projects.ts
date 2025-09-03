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

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const response = await fetch(`/api/projects/${slug}`);
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
    const response = await fetch('/api/projects');
    if (!response.ok) {
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}