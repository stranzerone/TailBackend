import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

export const getPgVersion = async () => {
  const result = await sql`select version()`;
  if(result){
  console.log("databse connected");
  }else{
    console.log("Failed to connect to database")
  }
};

getPgVersion();


export default sql