const assert = require("assert");
const User = require("../src/user");

describe("Subdocuments", () => {
  it("can create a subdocument", done => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "PostTitle" }]
    });

    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user.posts[0].title === "PostTitle");
        done();
      });
  });

  it("Can add subdocuments to an existing record", done => {
    const joe = new User({
      // 1. create joe
      name: "Joe",
      posts: []
    });

    joe
      .save() // 2. save joe
      .then(() => User.findOne({ name: "Joe" })) // 3. fetch joe
      .then(user => {
        user.posts.push({ title: "New Post" }); // 4. Add a post to joe
        return user.save(); // 5. save joe
      })
      .then(() => User.findOne({ name: "Joe" })) // 6. fetch joe
      .then(user => {
        assert(user.posts[0].title === "New Post"); // 7. make assertion
        done();
      });
  });
});
