export const dbServerCode = `
docker pull yugabytedb/yugabyte:latest
docker run -d --name yugabyte  -p7000:7000 -p9000:9000 -p5433:5433 -p9042:9042\
 yugabytedb/yugabyte:latest bin/yugabyted start\
 --daemon=false --ui=false
`

export const sqlShellCode = `
docker exec -it yugabyte /home/yugabyte/bin/ysqlsh
`

export const ysqlCode = `
`

export const pgCommands = `
CREATE DATABASE yb_demo;
\\c yb_demo;
`

export const ybDemoCommands = `
\\i share/schema.sql
\\i share/products.sql
\\i share/users.sql
\\i share/orders.sql
\\i share/reviews.sql
`
