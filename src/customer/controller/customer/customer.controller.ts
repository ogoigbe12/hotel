import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerDto } from 'src/customer/Dto/customer.dto';
import { CustomerService } from 'src/customer/service/customer/customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}
  @Post('create')
  @UsePipes(new ValidationPipe())
  async newCustomer(@Body() customerData: CustomerDto) {
    const customer = await this.customerService.createCustomer(customerData);
    if (customer) return { msg: 'customer created' };
    return new HttpException('customer already exits', HttpStatus.BAD_REQUEST);
  }
  @Patch(':id')
  async customerUpdate(
    @Param('id') id: number,
    @Body() CustomerDTO: CustomerDto,
  ) {
    const updated = await this.customerService.updateCustomer(id, CustomerDTO);
    if (!updated)
      throw new HttpException(
        'customer does not exits',
        HttpStatus.BAD_REQUEST,
      );
    return updated;
  }
  @Get()
  async getAllCustomer() {
    const allCustomer = this.customerService.getCustomer();
    if (allCustomer) return allCustomer;
    throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
  }
  @Get(':id')
  async getCustomerById(@Param('id') id: number) {
    const getCustomer = await this.customerService.getCustomerById(id);
    if (!getCustomer)
      throw new HttpException('Customer has checked out', HttpStatus.NOT_FOUND);
    return getCustomer;
  }
  @Delete(':id')
  async deleteCustomer(@Param('id') id: number) {
    const deleted = await this.customerService.deleteCustomer(id);
    return deleted;
  }
}
