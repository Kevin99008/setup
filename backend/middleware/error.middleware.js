

// Middleware function to log requests
export const logger = async (ctx, next) => {
    console.log(`${ctx.method} ${ctx.url} - ${new Date()}`);
    await next();
    };
  
  // Middleware function to handle errors
export const errorHandler = async (ctx, next) => {
        try {
            await next();
        }   
        catch (err) {
            console.error(err.stack);
            ctx.status = 500;
            ctx.body = 'Something broke!';
        }
    };

  