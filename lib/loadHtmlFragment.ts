import { readFile } from 'fs/promises';
import path from 'path';

export async function getHtmlFragment(filename: string): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), 'data', filename);
    const content = await readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return '';
  }
}