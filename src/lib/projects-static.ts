import fs from 'fs';
import path from 'path';

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

export function getProjectSlugs(): string[] {
  const projectsDir = path.join(process.cwd(), 'src/content/projects');
  const files = fs.readdirSync(projectsDir);
  
  return files
    .filter(file => file.endsWith('.json'))
    .map(file => {
      const content = fs.readFileSync(path.join(projectsDir, file), 'utf-8');
      const project = JSON.parse(content);
      return project.slug;
    });
}

export function getProjectBySlug(slug: string): Project | null {
  try {
    const projectsDir = path.join(process.cwd(), 'src/content/projects');
    const files = fs.readdirSync(projectsDir);
    
    // First try to find exact match
    const filename = `${slug}.json`;
    let filePath = path.join(projectsDir, filename);
    
    if (!fs.existsSync(filePath)) {
      // If no exact match, try to find a file that matches the project
      for (const file of files) {
        if (file.endsWith('.json')) {
          const fileContent = fs.readFileSync(path.join(projectsDir, file), 'utf-8');
          const project = JSON.parse(fileContent);
          if (project.slug === slug) {
            filePath = path.join(projectsDir, file);
            break;
          }
        }
      }
    }

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error loading project:', error);
    return null;
  }
}

export function getAllProjectsStatic(): Project[] {
  try {
    const projectsDir = path.join(process.cwd(), 'src/content/projects');
    const files = fs.readdirSync(projectsDir);
    
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const content = fs.readFileSync(path.join(projectsDir, file), 'utf-8');
        return JSON.parse(content);
      });
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}