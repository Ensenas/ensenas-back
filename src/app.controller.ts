import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { Public } from './modules/auth/decorators/public.decorator'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * @dev Endpoint for health check purposes
   * @returns hello world!
   */
  @Public()
  @Get('/health')
  getHello(): string {
    return this.appService.getHello()
  }
}
