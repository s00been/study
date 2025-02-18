import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
// db에 대한 타입을 명시적으로 지정
const db = new Low(new JSONFile("db.json"), { products: [] });
// 데이터를 읽어오는 비동기 처리
try {
    await db.read();
    console.log("Database loaded:", db.data);
}
catch (error) {
    console.error("Error reading the database:", error);
}
// 기본값 설정
db.data || (db.data = { products: [] });
// GraphQL => DB에 값을 꺼낼 때 도움을 주는 도구
const typeDefs = `
  type Product {
    id: ID!
    name: String!
    price: String!
    imgUrl: String!
  }

  type Query {
    products: [Product!]!
  }

  type Mutation {
    addProduct(name: String!, price: String!, imgUrl: String!): Product!
  }
`;
const resolvers = {
    Query: {
        products: () => db.data.products,
    },
    Mutation: {
        addProduct: (parent, args) => {
            const newProduct = {
                id: String(db.data.products.length + 1), // 간단히 ID 생성
                name: args.name,
                price: args.price,
                imgUrl: args.imgUrl,
            };
            db.data.products.push(newProduct); // 새 제품 추가
            db.write(); // DB에 변경사항 저장
            return newProduct; // 추가된 제품 반환
        },
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
