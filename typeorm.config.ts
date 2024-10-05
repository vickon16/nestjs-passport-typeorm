import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { entities } from 'src/entities';

const config = (configService: ConfigService) => {
  return {
    type: 'postgres',
    database: configService.getOrThrow('POSTGRES_DB'),
    host: configService.getOrThrow('POSTGRES_HOST'),
    port: configService.getOrThrow('POSTGRES_PORT'),
    username: configService.getOrThrow('POSTGRES_USER'),
    password: configService.getOrThrow('POSTGRES_PASSWORD'),
    synchronize: configService.getOrThrow('NODE_ENV') === 'development',
    entities,
    migrations: ['migrations/**'],
  } satisfies TypeOrmModuleOptions;
};

export default config;
