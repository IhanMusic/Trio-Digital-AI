export const logger = {
  info: (message: string, ...args: any[]) => {
    console.log('\n[INFO]', message, ...args);
  },
  error: (message: string, error?: any) => {
    console.error('\n[ERROR]', message);
    if (error) {
      if (error instanceof Error) {
        console.error('Details:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
      } else {
        console.error('Details:', error);
      }
    }
  },
  debug: (message: string, ...args: any[]) => {
    console.log('\n[DEBUG]', message, ...args);
  }
};
