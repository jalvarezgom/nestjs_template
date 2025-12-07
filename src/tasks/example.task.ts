import { Command, CommandRunner } from 'nest-commander';
import { Logger } from '@nestjs/common';

@Command({
  name: 'example-cmd',
  description: 'Example command',
  // arguments: '<task>',
  options: { isDefault: false },
})
export class ExampleCommand extends CommandRunner {
  constructor(private readonly logger: Logger) {
    super();
  }

  async run(inputs: string[], options: Record<string, string>): Promise<void> {
    this.logger.log(
      'Example command executed with inputs: ' +
        inputs.join(', ') +
        ' and options: ' +
        JSON.stringify(options),
    );
  }
}
