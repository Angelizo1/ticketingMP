import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {

  private _client?: Stan;

  get client(){
    if( !this._client){
      throw new Error('Cannot access NATs client before connecting')
    }

    return this._client;
  }

  // constructor(clusterId: string, clientId: string, url: string){
  connect(clusterId: string, clientId: string, url: string){
    this._client = nats.connect(clusterId, clientId, { url }); // This client refers to getter
    
    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Connected to NATS');
        resolve();
      });
      this.client.on('error', (err) => {
        reject(err);
      })
    })

  }

}

export const natsWrapper = new NatsWrapper();