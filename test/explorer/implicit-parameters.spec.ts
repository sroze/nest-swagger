import { Controller, Get } from '@nestjs/common';
import { expect } from 'chai';

import {
  ApiImplicitParam,
  ApiOkResponse,
  ApiOperation
} from '../../lib/decorators';
import { SwaggerExplorer } from '../../lib/swagger-explorer';
import { InstanceWrapper } from '@nestjs/core/injector/container';

describe('Explore controllers', () => {
  class Foo {}

  @Controller('')
  class FooController {
    @Get('foos/:objectId/something/:else')
    @ApiOperation({ title: 'List all Foos' })
    @ApiOkResponse({ type: Foo })
    @ApiImplicitParam({
      name: 'objectId'
    })
    @ApiImplicitParam({
      name: 'else'
    })
    find(): Promise<Foo> {
      return Promise.resolve({});
    }
  }

  it('works.', () => {
    const explorer = new SwaggerExplorer();
    const routes = explorer.exploreController(
      {
        instance: new FooController(),
        metatype: FooController
      } as InstanceWrapper<FooController>,
      'path'
    );

    expect(routes.length).to.be.eql(1);

    console.log(routes[0]);
  });
});
