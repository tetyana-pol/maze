import { List } from 'src/entities/list.entity';

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'matedata',
  entities: [List],
  synchronize: true,
};

export default config;
