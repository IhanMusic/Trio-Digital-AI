/// <reference types="node" />

declare module 'node:fs' {
  export * from 'fs';
}

declare module 'node:path' {
  export * from 'path';
}

declare namespace NodeJS {
  interface Process {
    cwd(): string;
    exit(code?: number): never;
  }

  interface Global {
    process: Process;
  }
}

declare const process: NodeJS.Process;
