import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const projectsDir = path.join(process.cwd(), 'src/content/projects');
    const files = fs.readdirSync(projectsDir);
    const projects = [];

    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(projectsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const project = JSON.parse(fileContent);
        projects.push(project);
      }
    }

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error loading projects:', error);
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 });
  }
}