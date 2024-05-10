import { Global, Module } from '@nestjs/common';
import { VideoService } from './video/video.module';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [VideoService],
  exports: [VideoService],
})
export class SharedModule {}
