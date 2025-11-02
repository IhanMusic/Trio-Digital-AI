declare namespace NodeJS {
  interface Global {
    __dirname: string;
    __filename: string;
    require: NodeRequire;
    module: NodeModule;
    process: Process;
  }
}
