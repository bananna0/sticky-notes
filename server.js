import { createServer } from "miragejs";

export function makeServer() {
  return createServer({
    environment: 'test',
    routes() {
      this.namespace = "api"
      this.mockNotes = {
        "-zPSTvQ8RQnavMflK5m-P":{"offset":{"top":213,"left":102},"height":200,"width":300,"text":"Sample note 1","id":"-zPSTvQ8RQnavMflK5m-P","color":2},
        "8JQHVcBJgSJSrWMJbXuAf":{"offset":{"top":215,"left":457},"height":200,"width":300,"text":"Sample note 2","id":"8JQHVcBJgSJSrWMJbXuAf","color":3},
        "ONns_N1LBOZgfleS193TC":{"offset":{"top":219,"left":809},"height":200,"width":300,"text":"Sample note 3","id":"ONns_N1LBOZgfleS193TC","color":0}
      };

      this.post("/notes", (schema, request) => {
        let notes = JSON.parse(request.requestBody);
        this.mockNotes = {
          ...this.mockNotes,
          ...notes
        }
      });

      this.get("/notes",
        () => {
          return {
            notes: this.mockNotes,
          }
        },
        { timing: 2000 }
      )
    },
  })
}