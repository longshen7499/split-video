import { Injectable } from '@nestjs/common';
import { VideoService } from './modules/shared/video/video.module';

@Injectable()
export class AppService {
  constructor(private readonly videoService: VideoService) {}

  getHello(): string {
    return 'Hello World!';
  }

  concatVideo() {
    this.videoService.concatVideo();
  }

  splitVideo() {
    for (let i = 0; i < 1000; i++) {
      this.videoService.splitVideo();
    }
  }
}
