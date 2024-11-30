import { Customer } from '../../entities/Customer';
import * as bcrypt from 'bcrypt';
import { AppDataSource } from '../data-source';

export const seedCustomers = async () => {
  const customerRepository = AppDataSource.getRepository(Customer);

  const customers = [
    {
      first_name: 'Juan',
      last_name: 'Pérez',
      email: 'juan.perez@email.com',
      password: await bcrypt.hash('password123', 10),
      role: 'user'
    },
    {
      first_name: 'María',
      last_name: 'García',
      email: 'maria.garcia@email.com',
      password: await bcrypt.hash('password123', 10),
      role: 'user'
    },
    {
      first_name: 'Admin',
      last_name: 'Sistema',
      email: 'admin@cinemax.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin'
    }
  ];

  for (const customerData of customers) {
    const existingCustomer = await customerRepository.findOne({
      where: { email: customerData.email }
    });

    if (!existingCustomer) {
      await customerRepository.save(customerRepository.create(customerData));
    }
  }
}; 