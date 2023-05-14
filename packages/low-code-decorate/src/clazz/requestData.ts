export interface RequestData{
  getData: (option?: any)=> Promise<any>
}

export class ExampleData implements RequestData{
  data: any
  constructor(data: any) {
    this.data = data
  }

  async getData() {
    return {
      data: this.data
    }
  }
}