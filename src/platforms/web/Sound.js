class Sound {
  constructor(localPath) {
    this.id = localPath;
    this.localPath = localPath;
    return this;
  }
  async load(remotePath) {
    const note = await fetch(remotePath);
    return { note, localPath: this.localPath };
  }
}
export default Sound;
