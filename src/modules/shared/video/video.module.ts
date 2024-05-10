import * as path from 'path';
import * as fs from 'fs';
import { spawn } from 'child_process';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VideoService {
  concatVideo() {
    console.log(
      'video path: ',
      path.join(process.cwd(), '/public/video/Vmake-home-intro.mp4'),
    );
    const fileList = fs
      .readdirSync(path.join(process.cwd(), '/public/video/split'))
      .map((file) => `file '${file}'`)
      .join('\n');

    const filePath = path.join(process.cwd(), '/public/video/split/concat.txt');
    const concatPath = path.join(
      process.cwd(),
      '/public/video/split/merged.mp4',
    );

    // 创建 concat 文件
    fs.writeFileSync(filePath, fileList);

    // 使用 ffmpeg 合并文件
    const ffmpegProcess = spawn('ffmpeg', [
      '-f',
      'concat',
      '-safe',
      '0',
      '-i',
      filePath,
      '-c',
      'copy',
      concatPath,
    ]);

    ffmpegProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    ffmpegProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    ffmpegProcess.on('close', (code) => {
      fs.unlinkSync(filePath);
      console.log(`exit: ${code}; deleted;`);
    });
  }

  splitVideo() {
    console.log(
      'video path: ',
      path.join(process.cwd(), '/public/video/Vmake-home-intro.mp4'),
    );
    const fileStream = fs.createReadStream(
      path.join(process.cwd(), '/public/video/Vmake-home-intro.mp4'),
    );
    const filePath = path.join(
      process.cwd(),
      '/public/video/split/prefix_%03d.mp4',
    );

    const ffmpegProcess = spawn('ffmpeg', [
      '-i',
      'pipe:0',
      '-c',
      'copy',
      '-f',
      'segment',
      '-reset_timestamps',
      '1',
      '-segment_time',
      '30',
      filePath,
    ]);

    fileStream.pipe(ffmpegProcess.stdin);

    ffmpegProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    ffmpegProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    ffmpegProcess.on('close', (code) => {
      console.log(`exit: ${code}`);
    });
  }
}
