import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerDto } from 'src/customer/Dto/customer.dto';
import { Booking } from 'src/typeorm/booking.entities';
import { Customer } from 'src/typeorm/customer.entities';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
  ) {}
  async createCustomer(id: number, customerDetails: CustomerDto) {
    const booking = await this.bookingRepository.findOneBy({ id });
    if (booking) customerDetails.booking = booking;
    const customerSave = await this.customerRepository.save(customerDetails);
    return customerSave;
  }
  async updateCustomer(id: number, customerDTO: CustomerDto) {
    const newUpdate = await this.customerRepository.findOne({
      where: { id: id },
      relations: { booking: true },
    });
    if (newUpdate) {
      return this.customerRepository.update(
        { id: id },
        {
          customerName: customerDTO.customerName,
          address: customerDTO.address,
          contactNo: customerDTO.contactNo,
          gender: customerDTO.gender,
        },
      );
    }
  }
  async getCustomer() {
    return this.customerRepository.find({ relations: ['booking'] });
  }
  async getCustomerById(id: number): Promise<Customer> {
    return await this.customerRepository.findOne({
      where: { id: id },
      relations: { booking: true },
    });
  }
  async deleteCustomer(id: number) {
    const deleteOne = await this.customerRepository.findOne({
      where: { id: id },
      relations: { booking: true },
    });
    if (!deleteOne)
      return new HttpException(
        'Customer with id does not exit',
        HttpStatus.NOT_FOUND,
      );
    return this.customerRepository.delete({ id: id });
  }
}
