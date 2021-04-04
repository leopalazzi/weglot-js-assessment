// Do not use multiple if it's not necessary and use try catch if anything went wrong

function getUserSettings(user) {
   try{
      const project = getProject(user.id);
      const settings = getSettings(project.id);
      if(user && project && settings){
         return settings;
      }
      return {};
   }
   catch(e){
      return {};
   }

}