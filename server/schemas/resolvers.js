const { userQuery, userMutation } = require("./api/User");
const { noteQuery, noteMutation } = require("./api/Note");

const resolvers = {
  Query: {
    // User
    users: userQuery.allUsers,
    userByEmailOrUserName: userQuery.getUser,
    // Note
    notes: noteQuery.allNotes
  },
  Mutation: {
    // User
    addUser: userMutation.addUser,
    updateUser: userMutation.updateUser,
    login: userMutation.login,
    // Note
    addNote: noteMutation.addNote
  },
};

module.exports = resolvers;
