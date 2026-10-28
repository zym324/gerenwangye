declare module 'gray-matter' {
  export interface MatterResult {
    data: Record<string, unknown>;
    content: string;
  }
  function matter(input: string, options?: unknown): MatterResult;
  export default matter;
}
