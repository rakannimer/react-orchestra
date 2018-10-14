class Sound {
  id: string;
  localPath: string;
  constructor(localPath: string) {
    this.id = localPath;
    this.localPath = localPath;
    return this;
  }
  async load(remotePath: string) {
    const note = await fetch(remotePath);
    return { note, localPath: this.localPath };
  }
}
export default Sound;
