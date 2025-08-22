export function sanitizeFileName(filename: string): string {
  return filename
    .normalize("NFKD")                    
    .replace(/[^\w.-]/g, "_")              
    .replace(/_+/g, "_")                 
    .toLowerCase();                        
}