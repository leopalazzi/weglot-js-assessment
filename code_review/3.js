//Use destructuration

let state;
const user = getUser();
if (user) {
	const {id} = user;
   const project = getProject(id);
   state = {
      user,
      project
   };
} else {
   state = {
      user: null,
      project: null
   };
}
ctx.body = state;