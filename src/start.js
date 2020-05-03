import { MongoClient, ObjectId } from "mongodb";
import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import { makeExecutableSchema } from "graphql-tools";
import cors from "cors";
import { prepare } from "../util/index";
import typeDefs from "./typeDefs.js";

const app = express();

app.use(cors());

const homePath = "/graphiql";
const URL = "http://localhost";
const PORT = 3001;

export const start = async () => {
  try {
    const db = await MongoClient.connect(process.env.MONGO_URL);

    const Links = db.collection("links");

    const resolvers = {
      Query: {
        randomLink: () => this.randomLink(),
        searchId: (_, { id }) => {
          const a = this.links.find((link) => link.id === id);
          return a;
        },
        links: () => this.links,
      },
      Mutation: {
        addLink: (parent, args) => {
          const link = {
            id: `${generateId()}`,
            title: args.title | "",
            takeaways: args.takeaways || "",
            url: args.url || "",
            categories: args.categories || [],
            datesAccessed: args.datesAccessed || [],
          };

          // TODO: look for duplicates
          this.links.push(link);
          return link;
        },

        updateLink: (_, params) => {
          const updatedLink = JSON.parse(params.stringifiedLink);
          const index = this.links.findIndex(
            (link) => link.id == updatedLink.id
          );
          if (index === -1) {
            this.links.push(updatedLink);
          } else {
            this.links[index] = updatedLink;
          }
          return updatedLink;
        },

        updateLinkFields: (_, l) => {
          const index = this.links.findIndex((link) => link.id == l.id);
          if (index === -1) {
            this.links.push(l);
          } else {
            this.links[index] = l;
          }
          return l;
        },
        deleteLink: (_, { id }) => {
          let deletedLink;

          this.links = this.links.filter((link) => {
            if (link.id === id) {
              deletedLink = link;
              return false;
            }
            return true;
          });
          return deletedLink;
        },
        searchAll: (_, { query }) => {
          let results = [];
          for (let i = 0; i < this.links.length; i++) {
            for (key in this.links[i]) {
              if (this.links[i][key].indexOf(query) !== -1) {
                results.push(this.links[i]);
              }
            }
          }
          return results;
        },
      },
    };

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });

    app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

    app.use(
      homePath,
      graphiqlExpress({
        endpointURL: "/graphql",
      })
    );

    app.listen(PORT, () => {
      console.log(`Visit ${URL}:${PORT}${homePath}`);
    });
  } catch (e) {
    console.log(e);
  }
};
