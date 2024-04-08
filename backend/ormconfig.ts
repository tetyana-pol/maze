import { Message } from 'src/entities/message.entity';

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'matedata',
  entities: [Message],
  synchronize: true,
};

export default config;
