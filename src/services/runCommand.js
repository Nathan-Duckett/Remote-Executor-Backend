import node_ssh from 'node-ssh';

export default class RunCommand {
  constructor(hostname, username, privateKeyLocation) {
    this.ssh = new node_ssh();
    this.connection = this.ssh.connect({
      host: hostname,
      user: username,
      privateKey: privateKeyLocation
    });
  }

  run(command) {
    return new Promise(resolve => {
      this.connection.then(() => {
        this.ssh.execCommand(command, { cwd: '/home/nathan' }).then((result) => {
          console.log(result);
          resolve(result.stdout);
        });
      });
    })
  }
}