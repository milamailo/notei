const { userQuery, userMutation } = require("./api/User");
const { noteQuery, noteMutation } = require("./api/Note");

const resolvers = {
  Query: {
    // User
    users: userQuery.allUsers,
    userByEmailOrUserName: userQuery.getUser,
    authUser: userQuery.authUser,
    // Note
    notes: noteQuery.allNotes,
    note: noteQuery.getNote,
  },
  Mutation: {
    // User
    addUser: userMutation.addUser,
    updateUser: userMutation.updateUser,
    login: userMutation.login,
    // Note
    addNote: noteMutation.addNote,
  },
};

module.exports = resolvers;
