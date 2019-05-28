import { GraphQLServer } from 'graphql-yoga';

// Demo user data
const users = [
  {
    id: '1',
    name: 'Ron',
    email: 'ron@email.com',
    age: 29,
  },
  {
    id: '2',
    name: 'Evan',
    email: 'evan@email.com',
  },
  {
    id: '3',
    name: 'Rita',
    email: 'rita@email.com',
    age: 32,
  },
];

const posts = [
  {
    id: '1',
    title: 'My amazing post',
    body:
      'Et temporibus ut labore. In exercitationem et repellendus dignissimos consequatur soluta. Et ut excepturi vel aperiam animi omnis autem. Nobis molestias ea cupiditate omnis enim qui. Vel provident aspernatur quia delectus ipsam et dolores.',
    published: true,
  },
  {
    id: '2',
    title: 'Some great shit here',
    body: '',
    published: false,
  },
  {
    id: '3',
    title: `I'm so tired`,
    body:
      'Quam eligendi sed ea velit pariatur non cum. Qui fugiat repellat earum ea omnis et pariatur praesentium vero. Sunt hic id qui sit ut recusandae voluptatem debitis. Et tempore unde et eveniet aspernatur molestiae expedita est consequatur. Aliquam sit est rerum dolores quia perspiciatis.',
    published: true,
  },
];
// type definitions (schema)
const typeDefs = `
  type Query {
   posts(query: String): [Post!]!
   users(query: String): [User!]!
   me: User!
   post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

// resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: '1',
        name: 'Rita Bradley',
        email: 'contact@ritabradley.com',
      };
    },
    post() {
      return {
        id: '12',
        title: 'My new post',
        text:
          'Maxime dolores laudantium tempora ipsum. In maiores voluptatem hic provident ut est quaerat ab. Deserunt quae natus.',
        published: false,
      };
    },
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter(post => {
        return (
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
        );
      });
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('server is running!'));
