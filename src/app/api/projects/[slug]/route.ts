import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
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
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const project = JSON.parse(fileContent);
    
    return NextResponse.json(project);
  } catch (error) {
    console.error('Error loading project:', error);
    return NextResponse.json({ error: 'Failed to load project' }, { status: 500 });
  }
}