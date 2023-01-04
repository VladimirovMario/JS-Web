class Data {
  public response: string | undefined;
  public fulfilled: boolean;
  constructor(
    public method: string,
    public uri: string,
    public version: string,
    public message: string
  ) {
    this.response = undefined;
    this.fulfilled = false;
  }
}
let myData = new Data("GET", "http://google.com", "HTTP/1.1", "");
console.log(myData);
