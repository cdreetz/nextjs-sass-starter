// rate-limiter.ts
export class RateLimiter {
    private state: DurableObjectState;
    private tokens: number;
    private maxTokens: number;
    private waitingClients: Function[];
    
    constructor(state: DurableObjectState, env: unknown) {
      this.state = state;
      this.tokens = 10; // Max concurrent requests
      this.maxTokens = 10;
      this.waitingClients = [];
      
      // You could load the token count from storage for persistence
      this.state.blockConcurrencyWhile(async () => {
        const storedTokens = await this.state.storage.get("tokens");
        if (storedTokens !== undefined) {
          this.tokens = storedTokens;
        }
      });
    }
    
    async fetch(request: Request): Promise<Response> {
      const url = new URL(request.url);
      
      if (url.pathname === "/acquire") {
        return await this.acquireToken();
      } else if (url.pathname === "/release") {
        return this.releaseToken();
      } else if (url.pathname === "/config") {
        return this.handleConfig(request);
      }
      
      return new Response("Not found", { status: 404 });
    }
    
    private async acquireToken(): Promise<Response> {
      // Use a storage transaction for persistence
      return await this.state.storage.transaction(async (txn) => {
        if (this.tokens > 0) {
          this.tokens--;
          await txn.put("tokens", this.tokens);
          return new Response("Token acquired", { status: 200 });
        } else {
          // Queue this request
          const promise = new Promise<Response>((resolve) => {
            this.waitingClients.push(() => {
              resolve(new Response("Token acquired after waiting", { status: 200 }));
            });
          });
          return promise;
        }
      });
    }
    
    private releaseToken(): Response {
      this.state.storage.transaction(async (txn) => {
        this.tokens = Math.min(this.maxTokens, this.tokens + 1);
        await txn.put("tokens", this.tokens);
        
        // Check if anyone is waiting
        if (this.waitingClients.length > 0 && this.tokens > 0) {
          const resolve = this.waitingClients.shift();
          this.tokens--;
          await txn.put("tokens", this.tokens);
          resolve?.();
        }
      });
      
      return new Response("Token released", { status: 200 });
    }
    
    private async handleConfig(request: Request): Promise<Response> {
      // Allow configuring the rate limiter (e.g., changing max tokens)
      if (request.method === "POST") {
        const body = await request.json() as { maxTokens?: number };
        
        if (body.maxTokens && typeof body.maxTokens === 'number') {
          this.maxTokens = Math.max(1, body.maxTokens);
          this.tokens = Math.min(this.tokens, this.maxTokens);
          await this.state.storage.put("maxTokens", this.maxTokens);
          await this.state.storage.put("tokens", this.tokens);
        }
        
        return new Response(JSON.stringify({ maxTokens: this.maxTokens, currentTokens: this.tokens }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      return new Response(JSON.stringify({ maxTokens: this.maxTokens, currentTokens: this.tokens }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }