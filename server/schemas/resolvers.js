const { userQuery, userMutation } = require("./api/User");

const resolvers = {
  Query: {
    users: userQuery.allUsers,
    userByEmailOrUserName: userQuery.getUser,
  },
  Mutation: {
    addUser: userMutation.addUser,
    updateUser: userMutation.updateUser,
    login: userMutation.login,
  },
};

module.exports = resolvers;
