import postgres from "postgres";

const sql = postgres('postgres://root:root@192.168.1.15:5432/pauloA')

export default sql;