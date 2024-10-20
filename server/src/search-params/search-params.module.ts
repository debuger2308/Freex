import { Module, forwardRef, } from '@nestjs/common';
import { SearchParamsService } from './search-params.service';
import { SearchParamsController } from './search-params.controller';
import { SequelizeModule } from '@nestjs/sequelize';

import { SearchParams } from './search-params.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SearchParamsController],
  providers: [SearchParamsService],
  imports: [
    SequelizeModule.forFeature([SearchParams]),
    forwardRef(() => AuthModule)
  ],
  exports: [SearchParamsService]
})
export class SearchParamsModule { }
