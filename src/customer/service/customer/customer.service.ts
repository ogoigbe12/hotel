import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerDto } from 'src/customer/Dto/customer.dto';
import { Customer } from 'src/typeorm/customer.entities';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) { }
  async createCustomer(customerDetails: CustomerDto) {
    const newCustomer = await this.customerRepository.findOneBy({
      customerName: customerDetails.customerName,
    });
    if (!newCustomer) {
      const customerToSave = await this.customerRepository.save(
        customerDetails,
      );
      return customerToSave;
    }
  }
  async updateCustomer(id: number, customerDTO: CustomerDto) {
    const newUpdate = await this.customerRepository.update(
      {
        id: id,
      },
      customerDTO,
    );
    return newUpdate;
  }
  async getCustomer() {
    return this.customerRepository.find({});
  }
  async getCustomerById(id: number): Promise<Customer> {
    return await this.customerRepository.findOneBy({ id: id });
  }
  async deleteCustomer(id: number) {
    const deleteOne = await this.customerRepository.findOneBy({ id: id });
    if (!deleteOne)
      return new HttpException(
        'Customer with id does not exit',
        HttpStatus.NOT_FOUND,
      );
    return this.customerRepository.delete({ id: id });
  }
}
